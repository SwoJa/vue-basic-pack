import R from 'ramda'
import { getUserInfo, getUserMenu } from 'store'
import Top from 'containers/layout/Top'
import Menu from 'containers/layout/Menu'
import { queryParams } from 'utils/common'

import Test01Page from 'containers/func/Test01'
import BlankReportPage from 'components/BlankReport'
import ChargeFeeConfigPage from 'containers/func/SS/ChargeFeeConfig'
import DiscountTypeConfigPage from 'containers/func/SS/DiscountTypeConfig'
import ConfigPage from 'containers/func/SS/Config'
import OrderAmountLimitPage from 'containers/func/SS/OrderAmountLimit'
import BankPage from 'containers/func/CS/Bank'
import BillboardTypePage from 'containers/func/CS/BillboardType'
import CountryPage from 'containers/func/CS/Country'
import CurrencyPage from 'containers/func/CS/Currency'
import NationPage from 'containers/func/CS/Nation'
import PreferCurrencyPage from 'containers/func/CS/PreferCurrency'
import PreferTransCountryPage from 'containers/func/CS/PreferTransCountry'
import ProductionPage from 'containers/func/PM/Production'
import BillboardPage from 'containers/func/MC/Billboard'
import NoticePage from 'containers/func/MC/Notice'
import MenuPage from 'containers/func/BM/Menu'
import RolePage from 'containers/func/BM/Role'
import UserPage from 'containers/func/BM/User'
import MemberPage from 'containers/func/MB/Member'
import MemberAssetPage from 'containers/func/MB/MemberAsset'
import MemberBankAccountPage from 'containers/func/MB/MemberBankAccount'

var routeTree = {
  // 'D001': { title: 'restingOrderManage', children: {
  //   'F001001': { title: 'rateSourceManage', func: Test01Page },
  // //   'F001002': { title: 'defaultExchangeHistoryList', func: Test01 },
  // //   'F001003': { title: 'pendingOrderManage', func: Test01 },
  // //   'F001004/:id': { title: 'pendingOrderDetail', func: Test01 },
  // //   'F001005': { title: 'pendingOrderCancel', func: Test01 },
  // }},
  'D002': { title: 'reportManage', children: {
    'F002001': { title: 'orderReport', func: BlankReportPage, args: { reportName: 'OrderReport' } },
    'F002002': { title: 'depositReport', func: BlankReportPage, args: { reportName: 'DepositReport' } },
    'F002003': { title: 'withdrawalReport', func: BlankReportPage, args: { reportName: 'WithdrawalReport' } },
    'F002004': { title: 'withdrawalApplyCheckList', func: BlankReportPage, args: { reportName: 'WithdrawalApplyCheckList' } },
    'F002005': { title: 'withdrawalApplyCheckDetail', func: BlankReportPage, args: { reportName: 'WithdrawalApplyCheckDetail' } },
    'F002006': { title: 'memberAssetReport', func: BlankReportPage, args: { reportName: 'MemberAsset' } },
    'F002007': { title: 'memberAssetDetailReport', func: BlankReportPage, args: { reportName: 'MemberAssetDetail' } },
  }},
  'D003': { title: 'systemSetting', children: {
    'F003001': { title: 'chargeFeeConfigManage', func: ChargeFeeConfigPage },
    'F003002': { title: 'discountTypeConfigManage', func: DiscountTypeConfigPage },
    'F003003': { title: 'orderAmountLimitManage', func: OrderAmountLimitPage },
    'F003004': { title: 'currencyManage', func: CurrencyPage },
    'F003005': { title: 'configManage', func: ConfigPage },
    'F003006': { title: 'countryManage', func: CountryPage },
    'F003007': { title: 'bankManage', func: BankPage },
    'F003008': { title: 'nationManage', func: NationPage },
    'F003009': { title: 'preferCurrencyManage', func: PreferCurrencyPage },
    'F003010': { title: 'preferTransCountryManage', func: PreferTransCountryPage },
    'F003011': { title: 'productManage', func: ProductionPage },
  }},
  'D004': { title: 'informationCenter', children: {
    'F004001': { title: 'billboardManage', func: BillboardPage },
    'F004002': { title: 'noticeManage', func: NoticePage },
  }},
  'D005': { title: 'backendManage', children: {
    'F005001': { title: 'memberManage', func: MemberPage },
    'F005002': { title: 'memberAssetManage', func: MemberAssetPage },
    'F005003': { title: 'memberBankAccountManage', func: MemberBankAccountPage },
    'F005004': { title: 'roleManage', func: RolePage },
    'F005005': { title: 'userManage', func: UserPage },
    'F005006': { title: 'menuManage', func: MenuPage },
  }},
  'D006': { title: 'commonSetting', children: {
    'F006001': { title: 'billboardTypeManage', func: BillboardTypePage },
  }},
}

var baseIndexMapper = {
  normal: ['D004', 'F004001'],
  admin: ['D003', 'F003001'],
  accountant: ['D002', 'F002001?reportName=OrderReport'],
}

var firstValue = R.compose(R.nth(1), R.head, R.toPairs)
var baseIndex = R.compose(R.head, R.split('?'))
var menuItem = R.compose(R.map((pair) => {
  return {
    index: pair[0] + (pair[1].args ? queryParams(pair[1].args) : ''),
    title: pair[1].title
  }
}), R.toPairs)

export function getBaseIndex() {
  var user = getUserInfo()

  return R.last(baseIndexMapper[user.roleID])
}

export function getBaseRoute() {
  var user = getUserInfo()
 
  return user.roleID && baseIndexMapper[user.roleID] && user.roleID && baseIndexMapper[user.roleID].join('/') || ''
}

export function getAdminMenu(index) {
  var menu = getUserMenu();

  if (index) {
    return R.filter(function(route) {
      return menu.childs[index].childs[baseIndex(route.index)]
    }, menuItem((routeTree[index]).children))
  } else {
    return R.filter(function(route) {
      return menu.childs[route.index]
    }, menuItem(routeTree))
  }
}

export function getAdminRoutes() {
  var result = [];

  R.forEach((pair) => {
    var path1 = pair[0], route1 = pair[1];

    result.push(routeWrapper(path1, route1.title, getBaseFunc(route1)));

    if (route1.children) R.forEach((pair) => {
      var path2 = pair[0], route2 = pair[1];

      result.push(routeWrapper(path1 + '/' + path2, route2.title, getBaseFunc(route2)));
    }, R.toPairs(route1.children));
  }, R.toPairs(routeTree));
  
  return result
}

function getBaseFunc(route) {
  if (route && route.children) {
    return getBaseFunc(firstValue(route.children))
  } 

  return route.func
}

function routeWrapper(path, name, component) {
  return {
    path: path,
    name: name,
    components: {
      top: Top,
      menu: Menu,
      func: component,
    },
  }
}
import R from 'ramda'
import { getUserInfo, getUserMenu } from 'store'
import Top from 'containers/layout/Top'
import Menu from 'containers/layout/Menu'
import Test01 from 'containers/func/Test01'
import BlankReport from 'components/BlankReport'
import { queryParams } from 'utils/common'

var routeTree = {
  // 'D001': { title: 'restingOrderManage', children: {
  //   'F001001': { title: 'rateSourceManage', func: Test01 },
  //   'F001002': { title: 'defaultExchangeHistoryList', func: Test01 },
  //   'F001003': { title: 'pendingOrderManage', func: Test01 },
  //   'F001004/:id': { title: 'pendingOrderDetail', func: Test01 },
  //   'F001005': { title: 'pendingOrderCancel', func: Test01 },
  // }},
  'D002': { title: 'reportManage', children: {
    'F002001': { title: 'orderReport', func: BlankReport, args: { reportName: 'OrderReport' } },
    'F002002': { title: 'depositReport', func: BlankReport, args: { reportName: 'DepositReport' } },
    'F002003': { title: 'withdrawalReport', func: BlankReport, args: { reportName: 'WithdrawalReport' } },
    'F002004': { title: 'withdrawalApplyCheckList', func: BlankReport, args: { reportName: 'WithdrawalApplyCheckList' } },
    'F002005': { title: 'withdrawalApplyCheckDetail', func: BlankReport, args: { reportName: 'WithdrawalApplyCheckDetail' } },
  }},
  'D003': { title: 'systemSetting', children: {
    'F003001': { title: 'chargeFeeConfigManage', func: Test01 },
    'F003002': { title: 'discountTypeConfigManage', func: Test01 },
    'F003003': { title: 'orderAmountLimitManage', func: Test01 },
    'F003004': { title: 'currencyManage', func: Test01 },
    'F003005': { title: 'configManage', func: Test01 },
    'F003006': { title: 'countryManage', func: Test01 },
    'F003007': { title: 'bankManage', func: Test01 },
    'F003008': { title: 'nationManage', func: Test01 },
    'F003009': { title: 'preferCurrencyManage', func: Test01 },
    'F003010': { title: 'preferTransCountryManage', func: Test01 },
    'F003011': { title: 'productManage', func: Test01 },
  }},
  'D004': { title: 'informationCenter', children: {
    'F004001': { title: 'billboardManage', func: Test01 },
    'F004002': { title: 'noticeManage', func: Test01 },
  }},
  'D005': { title: 'backendManage', children: {
    'F005001': { title: 'memberManage', func: Test01 },
    'F005002': { title: 'memberAssetManage', func: Test01 },
    'F005003': { title: 'memberBankAccountManage', func: Test01 },
    'F005004': { title: 'roleManage', func: Test01 },
    'F005005': { title: 'userManage', func: Test01 },
    'F005006': { title: 'menuManage', func: Test01 },
  }},
  'D006': { title: 'commonSetting', children: {
    'F006001': { title: 'billboardTypeManage', func: Test01 },
  }},
};

var baseIndexMapper = {
  normal: ['D004', 'F004001'],
  admin: ['D003', 'F003001'],
  accountant: ['D002', 'F002001?reportName=OrderReport'],
};

var firstValue = R.compose(R.nth(1), R.head, R.toPairs);
var baseIndex = R.compose(R.head, R.split('?'));
var menuItem = R.compose(R.map((pair) => {
  return {
    index: pair[0] + (pair[1].args ? queryParams(pair[1].args) : ''),
    title: pair[1].title
  }
}), R.toPairs);

export function getBaseIndex() {
  var user = getUserInfo()

  return R.last(baseIndexMapper[user.roleID])
}

export function getBaseRoute() {
  var user = getUserInfo()
 
  return baseIndexMapper[user.roleID].join('/')
}

export function getBackendMenu(index) {
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

export function getBackendRoutes() {
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
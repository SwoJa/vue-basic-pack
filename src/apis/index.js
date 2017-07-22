import R from 'ramda'
import { getJSON, postJSON, putJSON, removeJSON } from 'apis/common'
import { t } from 'utils/translater'
import { get, optionMap } from 'utils/common'
import { getUserInfo } from 'store'

export var resources = {
  bank: {
    resourceName: 'CS/Bank', idName: 'id', descName: 'bankName',
  },
  billboard: {
    resourceName: 'MC/BillBoard', idName: 'id', descName: 'subject',
  },
  billboardType: {
    resourceName: 'CS/BillBoardType', idName: 'id', descName: 'description',
  },
  chargeFeeConfig: {
    resourceName: 'SS/ChargeFeeConfig', idName: 'id', descName: 'id',
  },
  config: {
    resourceName: 'SS/Config', idName: 'id', descName: 'description',
  },
  country: {
    resourceName: 'CS/Country', idName: 'id', descName: 'id',
  },
  currency: {
    resourceName: 'CS/Currency', idName: 'id', descName: 'id',
  },
  discountType: {
    resourceName: 'CS/DiscountType', idName: 'id', descName: 'description',
  },
  discountTypeConfig: {
    resourceName: 'SS/DiscountTypeConfig', idName: 'id', descName: 'id',
  },
  grade: {
    resourceName: 'CS/Grade', idName: 'id', descName: 'description',
  },
  member: {
    resourceName: 'MB/Member', idName: 'sysID', descName: 'userName',
  },
  memberAsset: {
    resourceName: 'MB/MemberAsset', idName: 'id', descName: 'address',
  },
  memberBankAccount: {
    resourceName: 'MB/MemberBankAccount', idName: 'id', descName: 'accountNo',
  },
  menu: {
    resourceName: 'BM/menu', idName: 'id', descName: 'description',
  },
  nation: {
    resourceName: 'CS/Nation', idName: 'id', descName: 'description',
  },
  notice: {
    resourceName: 'MC/Notice', idName: 'id', descName: 'subject',
  },
  noticeType: {
    resourceName: 'CS/NoticeType', idName: 'id', descName: 'description',
  },
  orderAmountLimit: {
    resourceName: 'SS/OrderAmountLimit', idName: '', descName: '',
    pk: [ 'countryID', 'currencyID' ],
  },
  orderType: {
    resourceName: 'CS/OrderType', idName: 'id', descName: 'description',
  },
  preferCurrency: {
    resourceName: 'CS/PreferCurrency', idName: 'id', descName: 'currencyID',
  },
  preferTransCountry: {
    resourceName: 'CS/PreferTransCountry', idName: 'id', descName: 'countryID',
  },
  product: {
    resourceName: 'PM/Product', idName: 'id', descName: 'description',
  },
  role: {
    resourceName: 'BM/role', idName: 'id', descName: 'roleName',
  },
  roleMenu: {
    resourceName: 'BM/roleMenu', idName: 'id', descName: 'menuID',
  },
  user: {
    resourceName: 'BM/User', idName: 'userID', descName: 'userName',
  },
};

var fakedGradeList = [
  { id: 'Crown', description: 'Crown' },
  { id: 'Diamond', description: 'Diamond' },
  { id: 'Gold', description: 'Gold' },
  { id: 'Silver', description: 'Silver' },
  { id: 'Copper', description: 'Copper' },
];

var fakedOrderTypeList = [
  { id: 'deposit', description: 'orderType_deposit' },
  { id: 'withdrawal', description: 'orderType_withdrawal' },
  { id: 'csadjust', description: 'orderType_csadjust' },
  { id: 'sellout', description: 'orderType_sellout' },
  { id: 'buyin', description: 'orderType_buyin' },
];

var fakedDiscountTypeList = [
  { id: 'Birthday', description: 'discountType_Birthday' },
];

var fakedNoticeTypeList = [
  { id: 'message', description: 'noticeType_message' },
  { id: 'bulletin', description: 'noticeType_bulletin' },
];

export function create(url, data) {
  var user = getUserInfo(), options = {
    headers: {
      Authorization: 'Bearer ' + user.token
    }
  }

  return postJSON(url, data, options)
}

export function update(url, data) {
  var user = getUserInfo(), options = {
    headers: {
      Authorization: 'Bearer ' + user.token
    }
  }

  return putJSON(url, data, options)
}

export function remove(url) {
  var user = getUserInfo(), options = {
    headers: {
      Authorization: 'Bearer ' + user.token
    }
  }

  return removeJSON(url, options)
}

export function getList(resource, pageNow = 1, pageSize = 10) {
  var url = API_HOST + '/' + resource.resourceName, user = getUserInfo(), options = {
    headers: {
      Authorization: 'Bearer ' + user.token
    }
  }

  return getJSON(url + '?pageNow=' + pageNow + '&pageSize=' + pageSize, options)
}

export function getAll(resource, id) {
  if (resource === resources.grade) {
    return Promise.resolve(fakedGradeList)
  } else if (resource === resources.orderType) {
    return Promise.resolve(fakedOrderTypeList)
  } else if (resource === resources.discountType) {
    return Promise.resolve(fakedDiscountTypeList)
  } else if (resource === resources.noticeType) {
    return Promise.resolve(fakedNoticeTypeList)
  }

  var url = API_HOST + '/' + resource.resourceName, user = getUserInfo(), options = {
    headers: {
      Authorization: 'Bearer ' + user.token
    }
  }

  if (id) {
    url += '/' + id
  }

  return getJSON(url + '?pageNow=1&pageSize=99999999', options)
}

export function getAllOptions(resource, hasPromptOption, needTranslation) {
  var getDesc = get(resource.descName), getId = get(resource.idName),
    rows2options = optionMap((row, index) => {
      var text = getDesc(row)

      return {
        id: hasPromptOption ? index + 1 : index,
        text: needTranslation ? t(text) : text,
        value: '' + getId(row)
      };
    })

  return getAll(resource).then(function(rows) {
    var options = rows2options(R.filter(getId, rows))

    if (hasPromptOption) options.unshift({ id: 0, text: t('pleaseSelect'), value: '' })

    return options
  })
}

export function getOptionDesc(options, value) {
  if (!options || options.length <=0 || !value) return '';

  var selectedOption = R.find((c) => { return c.value === value }, options)

  return selectedOption ? selectedOption.text : value
}
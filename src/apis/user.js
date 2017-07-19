import R from 'ramda'
import { getJSON } from 'apis/common'

export function queryUserInfo(user) {
  return getJSON(API_HOST + '/BM/User/' + user.userName, {
    headers: {
      Authorization: 'Bearer ' + user.token
    }
  })
}

export function queryUserMenu(user) {
  var options = {
    headers: {
      Authorization: 'Bearer ' + user.token
    }
  };

  return Promise.all([
    getJSON(API_HOST + '/BM/menu?pageNow=1&pageSize=99999999', options),
    getJSON(API_HOST + '/BM/roleMenu/' + user.roleID, options)
  ]).then(function(result) {
    return genMenuTree(result[0], result[1]);
  })
}

function genMenuTree(menu, roleMenu) {
  var sections = {
    childs: {}
  }, possibleMenuList = {};

  if ((!menu)||(!roleMenu)) return sections;

  R.forEach(function(row) {
    possibleMenuList[row.menuID] = true;
  }, roleMenu);

  R.forEach(function(section) {
    section.childs = {};

    R.forEach(function(subSection) {
      subSection.childs = {};

      R.forEach(function(func) {
        subSection.childs[func.url] = func;
      }, R.filter(function(row) {
        return (row.parentID === subSection.id) && possibleMenuList[row.id];
      }, menu));

      section.childs[subSection.url] = subSection;
    }, R.filter(function(row) {
      return (row.parentID === section.id) && possibleMenuList[row.id];
    }, menu));

    sections.childs[section.url] = section;
  }, R.filter(function(row) {
    return (row.parentID === 0 || R.equals(undefined, row.parentID) || R.equals(null, row.parentID)) && possibleMenuList[row.id];
  }, menu));

  return sections;
}
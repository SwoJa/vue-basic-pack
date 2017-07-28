import R from 'ramda'

export function t(index) {
  return index ? (mapper[index.toString()] || index ) : ''
}

var mapper = {
  btnConfirm: '确认',
  btnCancel: '取消',
  btnEdit: '修改',
  btnSubmit: '提交',
  btnRemark: '备注',
  btnBackStep: '返回',
  btnCreate: '创建',
  btnSave: '储存',
  btnOk: '确认',
  btnSearch: '搜索',
  btnBack: '返回',
  btnNextStep: '继续',
  btnSetting: '设置',
  btnVerificationCode: '获取验证码',
  btnChangeQuestions: '修改安全问题',
  btnReset: '重置',
  l2Password: 'L2密码',
  userId: '会员帐号',
  userID: '使用者帐号',
  userStatus: '帐号状态',
  userStatus_Active: '启用',
  userStatus_Invalid: '停用',
  password: '密码',
  verificationCode: '验证码',
  logIn: '登入',
  register: '注册',
  forgotPassword: '忘记密码',
  firstName: '名字',
  lastName: '姓氏',
  fullName: '身份证名字',
  idNumber: '身份证/护照',
  mobilePhoneNumber: '手机号码',
  restPassword: '重置密码',
  system: '系统',
  newPassword: '新密码',
  confirmPassword: '确认新密码',
  myMembers: '我的会员',
  myInfo: '个人信息',
  userName: '用户名',
  registerDateTime: '注册日期和时间',
  package: '配套',
  ranking: '级别',
  eCommerceAccount: 'Pefa 商城帐号',
  registrationWallet: '报单钱包',
  directSponsorPoint: '直推报单积分',
  reoWallet: 'Reo+钱包 (RM)',
  marketingWallet: '市场钱包',
  reoVoucher: 'Reo+券',
  promotionCountdown: '有效促销期',
  idVerification: '身份验证',
  verify: '验证',
  verified: '验证成功',
  bankAccount: '银行帐号',
  bank: '银行',
  bankId: '銀行編號',
  branch: '银行分行',
  accountName: '银行用户名',
  accountNumber: '银行户口号码',
  sponsorTree: '推荐网',
  placementTree: '安置网',
  silver: '银',
  gold: '金',
  crown: '冠',
  active: '已激活',
  inactive: '未激活',
  available: '空缺',
  placementId: '安置人帐号',
  dailySales: '每日销售业绩',
  accumulateSales: '累计业绩',
  carriedForwardSales: '剩余保留业绩',
  left: '左',
  right: '右',
  contributionRecord: '奖金贡献记录',
  section: '选项',
  day: '天',
  bonusType: '奖金类型',
  totalBonus: '奖金总数',
  exchangePoint: '兑换积分',
  capbackBonus: '回本奖',
  sponsorBonus: '介绍奖',
  teamBonus: '团队奖',
  leadershipBonus: '领导奖',
  maintainBonus: '重消奖',
  editAddress: '修改地址',
  deliveryAddress: '收货地址',
  country: '区域',
  address: '地址',
  state: '州属',
  city: '城市',
  MY_city: '马来西亚公民',
  zipCode: '邮政编号',
  mailingAddress: '邮寄地址',
  birthday: '出生日期',
  sponsorId: '推荐人帐号',
  verifyStatus: '验证状态',
  associatedAccount: '关联账号',
  No: '编号',
  eCommerceAccountStatus: 'Pefa 商城帐号状态',
  accountManagement: '帐号管理',
  changePassword: '修改密码',
  oldPassword: '原密码',
  changeL2Password: '修改L2密码',
  oldL2Password: '原L2密码',
  enterNewL2Password: '输入新L2密码',
  reEnterNewL2Password: '重新输入L2密码',
  setL2Password: '设置L2密码',
  resetL2Password: '重置L2密码',
  enterL2Password: '输入新L2密码',
  reEnterL2Password: '重新输入L2密码',
  loginRecord: '登入记录',
  deviceName: '设备名称',
  deviceType: '设备类型',
  ipAddress: 'IP地址',
  loginTime: '登入日期和时间',
  myOrder: '我的订单',
  viewPrint: '查看/打印',
  buyProduct: '申购配套',
  price: '价格',
  quantity: '数量',
  GST: '消费税',
  shippingFee: '运输费',
  subtotal: '总额（包含消费税）',
  receiver: '收件人',
  paymentPlatform: '付款方式',
  online: '线上',
  paymentMethod: '付款方式',
  availableBalance: '可用余额',
  total: '总额',
  amountPayable: '应付金额',
  billTo: '发送人',
  shippingTo: '收件人',
  issuedBy: '负责人',
  productCode: '产品编号',
  description: '描述',
  QTY: '数量',
  PV: '积分',
  totalGST: '消费税总额',
  amount: '总数（零吉）',
  grandTotal: '总额',
  GSTAmount: '消费税总额',
  NETPaid: '净支付',
  myTreasureBox: '我的宝箱',
  bonusRecord: '奖金记录',
  contributorId: '贡献账号',
  bonusDetail: '奖金收支明细',
  reoWalletWithdrawals: 'Reo+钱包提现',
  nextQuestions: '下一题',
  reoWalletWithdrawalsRecords: 'Reo+钱包提现记录',
  dateOfApplication: '申请日期',
  transactionType: '交易类型',
  transferAmount: '转账金额',
  status: '状态',
  transactionFee: '手续费',
  transferRegWallet: '传送报单钱包',
  regWalletBalance: '报单钱包余额',
  regWalletPoints: '报单钱包积分',
  downlineUserId: '下线帐号',
  transferRegWalletRecord: '转送报单钱包记录',
  availableAmount: '可用余额',
  balanceAmount: '余额',
  recipientId: '接收人帐号',
  transferDate: '转送日期',
  securityCenter: '安全中心',
  verifySecurityQuestions: '验证安全问题',
  securityQuestion1: '问题一',
  securityAnswer1: '答案',
  securityQuestion2: '问题二',
  securityAnswer2: '答案',
  securityQuestion3: '问题三',
  securityAnswer3: '答案',
  announcement: '公告',
  announcementTitle: '公告',
  subject: '标题',
  publishTime: '发布日期',
  announcementDetail: '公告内容',
  content: '内容',
  informationList: '资讯列表',
  userGuide: '用户指南',
  message: '讯息',
  messageDetail: '讯息内容',
  msgRegisterSuccess: '注册成功， 请查询手机以便获取会员账号和登入密码',
  msgSetAccountName: '请确保与身份证姓名一致',
  msgSetSelect: '请选择',
  msgNoDataStatus: '无资料显示',
  msgSetInformation: '填写资料',
  msgCheckInfo: '检查资料',
  msgSuccess: '成功',
  msgSetVerifySuccess: '验证成功',
  msgWrongL2Password: 'L2密码错误',
  msgLoginAgain: '请重新登入',
  msgSetPackage: '选择配套',
  msgSetShipmentDetail: '物流信息',
  msgSetPaymentMethod: '付款方式',
  msgConfirmInfo: '确认资料',
  msgReoWalletNotTransferStatus: '系统结算中，暂时无法进行转出奖金',
  msgDateFrom: '从',
  msgDateTo: '至',
  msgSearchByDate: '按日期搜索',
  msgSetSecurityQuestion: '安全问题设置',
  msgLogoutNotice: '是否确认退出帐号',
  msgPurchasePackageNotice: '必须先申购配套',
  msgErrorRequestStatus: '出现错误，请稍后再试',
  msgAnswer: '答案',
  msgFailed: '失败',
  msgWrongAnswer: '答案错误',
  msgOverLimit: '超过三次',
  msgReSetSecurityQuestion: '填写安全问题',
  msgVerifySecurityQuestion: '确认安全问题',
  msgSettingSuccess: '设置成功',
  msgAgreeTo: '我同意',
  msgAgreement: '用户协议',
  msgSetPlacementIdNotice: '',
  msgSetIdNumberNotice: '',
  msgSubAccountOverLimit: '子账号超出限额',
  msgSetInput: '请输入',
  title: '标题',
  registerAccount: '注册',
  memberLogin: '登录',
  pleaseEnterAccount: '请输入账号',
  pleaseEnterPassword: '请输入密码',
  login: '登录',
  emailVerifyFailed: '电子邮件验证失败',
  emailVerifySuccess: '电子邮件验证成功',
  emailVerifying: '电子邮件验证中',
  required: '必填项目',
  select: '请选择',
  selectNothing: '尚未选择任何资料',
  selectTooMany: '不可选择多笔资料',
  Compare: '团队奖',
  Direct: '介绍奖',
  Leader: '领导奖',
  Return: '回本奖',
  Maintain: '重消奖',
  All: '全部',
  passwordConfirmErr: '密码不一致',
  remark: '备注',

  //
  search: '搜索',

  onlineCard: '线上刷卡',
  cash: '现金',
  creditCard: '信用卡',
  MPOS: 'MPOS',

  noItemFound: '未找到项目',
  reqErrTryAgain: '获取失败,请稍后再试',
  loading: '读取中',

  btnModify: '修改',
  btnRemove: '删除',
  btnView: '检视',
  btnDelete: '刪除',

  date: '日期',

  createDate: '建立时间',
  modifyDate: '修改时间',
  modifyID: '修改ID',
  clearDate: '清除日期',
  paymentDate: '付款日期',

  exchangeRate: '汇率',
  defaultPendingLP: '预设挂卖LP数量',
  transactionTotal: '大盘可交易总额',
  isSeparatePoint: '是否为拆分点',
  stopPendingDay: '停止挂卖日',
  priceStatus: '价格状态',

  manageReport: '管理报表',
  kSummaryView: 'K值汇总报表检视',
  kPersonalView: 'K值个人报表检视',
  modifyLoginPwd: '修改登入密码',
  modifyOperatePwd: '修改操作密码',
  modifyMenu: '修改选单',
  logout: '退出',
  welcomeManage: '欢迎, ',

  backEndSystem: '后台管理系统',
  memberInfo: '会员信息',
  clientInformationManage: '会员信息管理',
  clientLevelManage: '会员等级管理',
  identifyReview: '实名认证审核',
  userInfo: '会员实名资料',
  memberBankAccount: '会员银行帐户',
  userShippingAddress: '会员收件地址',
  userResideAddress: '会员居住地址',
  buyManage: '采购管理',
  payReview: '上门付款审核',
  buyReoWallet: '购买报单钱包',
  suitManage: '套餐管理',
  packageProductRelationApply: '套餐产品关联设定',
  securityManage: '安全管理',
  secretProblemManage: '保密问题管理',
  secretProblemAnswerManage: '保密问题答案管理',
  loginPwdReset: '登入密码重置',
  secondLevelReset: '二级密码重置',
  informationCenter: '讯息中心',
  messageArg: '讯息参数设定',
  messageTemplate: '讯息样本',
  messageSend: '讯息发送',
  messageSendRecord: '讯息发送记录',
  systemMaintain: '公告系统管理',
  systemManage: '系统管理',
  areaManage: '州属管理',
  townManage: '城市管理',
  zipCodeManage: '郵遞區碼管理',
  currencyManage: '币别管理',
  bankManage: '银行管理',
  gradeManage: '等级管理',
  langManage: '语系管理',
  langPkgManage: '语言包管理',
  systemArgConfig: '系统参数设定',
  sponsorArgConfig: '组织图参数设定',
  roleManage: '角色管理',
  menuManage: '选单管理',
  url: '链结',
  parent: '上层',
  parentID: '上层编号',
  menuType: '选单类别',
  menuType_1: '根目錄',
  menuType_2: '子目錄',
  menuType_3: '功能',
  orderSerial: '显示顺序',
  menuStatus: '选单状态',
  menuStatus_Active: '启用',
  menuStatus_Invalid: '停用',
  userManage: '使用者管理',
  rolePermissionManage: '权限管理',
  accountPermissionManage: '帐号权限管理',
  userContract: '用户协议',
  salePlan: '营销计划',
  infoManage: '资讯管理',
  featureManage: '功能清单管理',
  accountManage: '帐户管理',
  bonusConfig: '奖金参数设定',
  userChangeDetail: '用户兑现明细',
  accountBonusDetail: '帐户奖金明细',
  accountBonusSummary: '帐户奖金汇总',
  crmAccountIncomeDetail: 'CRM帐户收支明细',
  userPointRemain: '用户点数余额',
  userChangeApplyReviewList: '兑现申请审核清单（银行）',
  orgManage: '组织管理',
  groupManage: '集团管理',
  companyMange: '公司管理',
  backEndAccountManage: '后台帐号管理',
  market: '大盘',
  marketPriceConfig: '大盘价格设定（拆分盘）',
  fullSystemAnnounce: '全系统公告',
  messageSelectConfig: '发送讯息选取设定',
  push: '推播',
  inSiteLetter: '站内信 (WEB, APP)',
  email: '电子邮件',
  smsMessage: '简讯(非紧急通知，请勿使用)',
  category: '类别(勾选站内信或Email)',
  startDate: '起始时间',
  beginDate: '起始时间',
  endDate: '结束时间',
  editSMSContent: '编辑简讯内容',
  smsTitle: '讯息主旨',
  smsContent: '讯息内容',
  refMultiLang: '参照多语系名称',
  cancel: '取消',
  next: '下一步',
  pleaseSelect: '请选择',
  pleaseInput: '请输入',
  view: '检视',
  sentDate: '发送日期',
  no: '编号',
  kind: '类型',
  username: '姓名',
  clientNotify: '用户通知',
  receiverHint: '请直接将收讯人的帐号输入于下方，最多支持50个人多笔请以半形,分隔，如Jane,Francis',
  add: '新增',
  remove: '删除',
  modify: '修改',
  areaList: '州属清单',
  areaId: '州属简称',
  areaName: '州属',
  area: '州属',
  beginAmount: 'BeginAmount',
  endAmount: 'EndAmount',
  haveMember: 'HaveMember',
  memberGrade: 'MemberGrade',
  clientName: '用户名',
  registerStartDate: '注册起',
  registerEndDate: '至',
  advanceSearch: '进阶搜索',
  grade: '等级',
  buyAmount: '配套',
  recommend: '推荐人',
  placement: '安置人',
  setupLevel: '设置等级',
  operateRecord: '操作记录',
  level: '等级',
  from: 'From',
  to: 'To',
  verifyReview: '实名认证审核',
  review: '审核',
  applyDate: 'ApplyDate',
  countryID: '编码',
  reviewStatus: '审核状态',
  registerDate: '注册日期',
  idStatus: 'ID状态',
  citizen: '城市',
  validateStatus: '审核状态',
  memberBank: '会员银行',
  shipAddress: '会员收件地址',
  resideAddress: '会员居住地址',
  orderId: '订单编号',
  paymentTime: '付款时间',
  modifyToPay: '修改已付款',
  return: '退货',
  receipt: '收据',
  declarationWallet: '报单钱包',
  declarationCoin: '报单币',
  production: '套餐',
  orderPrice: '价格',
  payType: '付款方式',
  payPoint: 'Wallet',
  payCash: '金额',
  specStatus: '状态',
  ecProductID: '商城产品编号',
  name: 'name',
  specID: '配套编号',
  packageProductRelation: '套餐商城产品关联',
  specName: '套餐',
  productAmt: '价格',
  pdNo: '产品编号',
  problem: '问题列表',
  reset: '重置',
  choiceLang: '选择语系',
  langId: '語言编号',
  langName: '语言名称',
  version: '版本',
  lineNumber: 'LineNumber',
  openChildNumber: 'OpenChildNumber',
  openTogether: 'OpenTogether',
  systemSet: 'SystemSet',
  identifyIdNum: '身份证号码',
  configPermission: '设定权限',
  group: '集团',
  company: '公司',
  roleID: '角色编号',
  roleName: '角色名称',
  roleStatus: '状态',
  roleStatus_Active: '启用',
  roleStatus_Invalid: '停用',
  menuName: 'MenuName',
  confirm: '确认',
  menuID: '选单编号',
  mType: 'MType',
  pType: 'PType',
  choicePointType: '选择Point类型',
  pointType: 'Point类型',
  substrateTime: '商城扣点时间',
  importAlreadyTransfer: '汇入已汇款清单',
  transPoint: 'TransPoint',
  pointToCashFee: 'PointToCashFee',
  totalPoint: 'TotalPoint',
  transDate: 'TransDate',
  stateRange: '统计区间',
  outwardQty: 'outwardQty',
  beforeOutwardQty: 'BeforeOutwardQty',
  afterOutwardQty: 'AfterOutwardQty',
  inwardQty: 'InwardQty',
  beforeInwardQty: 'BeforeInwardQty',
  afterInwardQty: 'AfterInwardQty',
  balancesRegWallet: 'BalancesRegWallet',
  balancesReoWallet: 'BalancesReoWallet',
  balRegWalletDate: 'BalRegWalletDate',
  balReoWalletDate: 'BalReoWalletDate',
  directSponsorPointDate: 'DirectSponsorPointDate',
  groupCode: 'GroupCode',
  groupParent: 'GroupParent',
  groupName: 'GroupName',
  companyCode: 'CompanyCode',
  companyParent: 'CompanyParent',
  companyName: 'CompanyName',
  modifyLoginPWd: '修改登录密码',

  currentDate: '当前日期',
  offerCompareBonus: 'offerCompareBonus',
  compareBonus1: 'compareBonus1',
  leaderBonus1: 'leaderBonus1',
  compareBonus2: 'compareBonus2',
  leaderBonus2: 'leaderBonus2',

  province: 'Province Name',
  buyer: '购买人',
  question: '问题',
  questionId: '问题编号',
  parameterId: '参数编号',
  parameterName: '参数名称',
  parameterValue: '参数值',
  billboard: '公告',
  notice: '讯息',
  enabled: '启用',
  privatePolicy: '隐私权政策',
  upload: '上傳',
  fileUpload: '檔案上傳',
  accountActive: '活跃',
  terminated: '终止',
  freeze: '冻结',
  resign: '辞职',
  activeStatus: '活躍狀態',
  accountStatus: '賬號狀態',
  currentPackage: '现有配套',
  upgradePackage: '升级配套',
  upgrade: '升级',
  upgradeDate: '升级日期',
  modifyBy: '申购帐号',
  levelGrid: '等级',
  searchHistory: '搜索历史记录',
  currentLevel: '现有等級',
  upgradeLevel: '等級升级',
  currentTitle: '目前等级為',
  accountInfo: '帐号资料',
  memberAmount: '購買數量',
  reviewSuccess: '審核通過',
  reviewFailed: '驳回',
  productType: '产品种类',
  productListHeader: '产品列表',
  statusActive: '是',
  statusDeactivate: '否',
  Quiz1: '问题1',
  Quiz1Answer: '答案',
  Quiz2: '问题2',
  Quiz2Answer: '答案',
  Quiz3: '问题3',
  Quiz3Answer: '答案',
  provinceId: 'Province ID',
  provinceName: '城市',
  currencyID: '币别编号',
  currencyName: '币别名称',
  countryCode: '区码',
  isActive: '启用',
  isDisable: '停用',
  productName: '产品名称',
  slpmNo: '挂单编号',
  citizenMY: '马来西亚公民',
  restingOrderManage: '挂单管理',
  restingOrderList: '挂单清单',
  rateSourceManage: '汇率来源管理',
  currency: '货币',
  priority: '优先权',
  rateSourceName: '来源名称',
  source: '来源URL',
  responseFailureTimesIn24Hrs: '24小时内回应失败次数',
  pendingOrderManage: '交易挂单管理',
  pendingTypeCode: '类别',
  pendingTypeCode_1: '挂买',
  pendingTypeCode_2: '挂卖',
  orderNo: '交易单号',
  pendingStatusCode: '交易状态',
  pendingStatusCode_1: '进行中',
  pendingStatusCode_2: '已结束',
  pendingStatusCode_3: '未知',
  pendingSubStatusCode: '目前状态',
  pendingSubStatusCode_1: '通知卖方已转帐',
  pendingSubStatusCode_2: '通知买方已转帐',
  detail: '详情',
  info: '交易资讯',
  customerService: '客服处理',
  pendingOrderNoHint: '请填入交易子单单号',
  pendingOrderDetail: '挂单明细',
  pendingOrderInfo: '挂单资讯',
  pendingOrderCustomerService: '客服处理',
  dealPrice: '成交价格',
  areaCode: '交易地区',
  areaCode_1: '台湾',
  areaCode_2: '香港',
  areaCode_3: '马来西亚',
  dealTarget: '交易商品',
  transitTimeLimit: '汇款等候时间',
  dealAmount: '交易总额',
  seller: '卖家',
  sellerReceivingMethodCode: '卖家收款方式',
  sellerBankAccount: '收款银行/帐号',
  buyerTransitTime: '买家汇款通知时间',
  buyerTransitTimePrompt: '交易成立后',
  sellerConfirmTime: '卖家确认时间',
  sellerConfirmTimePrompt: '买家通知后',
  serialNo: '流程序号',
  lastPendingStatusCode: '前状态名称',
  nextPendingStatusCode: '后状态名称',
  processor: '处理人员',
  possibleAction: '可处理状况',
  possibleConditionNo: '状况号码',
  possibleConditionDescription: '状况描述',
  possibleSituation: '可使用情境',
  possibleSuggection: '建议处理流程',

  possibleCondition_1: '买家已汇款，但来不及上传交易明细，结果交易显示已逾期',
  possibleCondition_2: '买家已汇款超过1小时，还没收到卖家的商品',
  possibleCondition_3: '卖家查帐后并未收到买家汇款',
  possibleCondition_4: '买家汇款金额不足',
  possibleCondition_5: '买家汇款金额过多',
  possibleActionCondition_1: '[ 买家 ] 我已汇款，但来不及上传交易明细，结果交易显示已逾期',
  possibleActionCondition_2: '[ 买家 ] 我已汇款超过1小时，还没收到卖家的商品',
  possibleActionCondition_3: '[ 卖家 ] 查帐后并未收到买家汇款',
  possibleActionCondition_4: '[ 卖家 ] 买家汇款金额不足',
  possibleActionCondition_5: '[ 卖家 ] 买家汇款金额过多',
  possibleActionSituation_1: '交易逾期后的30分钟内，可使用此功能让买卖双方能继续交易',
  possibleActionSituation_2: '客服接获买家申诉后，若持续联系不到卖家，在买家汇款后超过48小时，卖家都没有确认入帐、申诉或任何动作与回应，在客服检查买家交易凭证后没有问题，可使用此功能将商品强制转给买家',
  possibleActionSituation_3: '买家已上传汇款凭证，但卖家坚持说未收到款项，若再协调联系后，发现买家其实最终没有付款（包含假的交易凭证、转错帐或其他可能情形），客服可使用此功能撤销此交易。 ',
  possibleActionSituation_4: '买家已上传汇款凭证，但金额过少，然后买家不补差额超过48小时，可接受卖家意愿将此单撤销。 ',
  possibleActionSituation_5: '买家已上传汇款凭证，但金额过多。 ',
  possibleActionSuggestion_1: '请先检查买家有无上传交易凭证，若还没有，请在交易逾期的30分钟内，利用原上传功能上传交易凭证，客服检查交易凭证后没问题，使用此功能让此交易继续进行，让卖家进行入帐确认。 ',
  possibleActionSuggestion_2: '客服接获买家申诉后，先试着联络卖家请他做入帐确认，并告知卖家若持续不处理超过48小时，交易商品将强制转给买家。若联系不到卖家或卖家始终无回应，客服可在48小时后使用此功能。 ',
  possibleActionSuggestion_3: '尽管买家已上传交易凭证，但卖家坚持没有收到款项，先请卖家提供收款帐户明细图档，若客服查看确实也无此笔收款纪录，客服将提供双方仲裁流程的申请及流程说明。若买家承认其实汇款凭证是假造或其他情形，最终并未汇款，客服可使用此功能将此交易撤销。让冻结的交易商品恢复到原来挂单。 ',
  possibleActionSuggestion_4: '通知买家重新汇款不足的差额，并补上差额汇款的交易凭证，同时告知买家，若迟迟不补足差额超过48小时，卖家有权取消此交易并不转让商品。 ',
  possibleActionSuggestion_5: '1.请卖家提供买家实际汇款金额和入帐时间，并征求卖家同意，将多余帐款转回给买家 2.通知买家 卖家的回应为何，并持续做协调。 ',
  possibleActionWarning_1: '',
  possibleActionWarning_2: '',
  possibleActionWarning_3: '',
  possibleActionWarning_4: '',
  possibleActionWarning_5: '',
  possibleActionDesc_1: 'Possible Action 1 Desc',
  possibleActionDesc_2: 'Possible Action 2 Desc',
  possibleActionDesc_3: 'Possible Action 3 Desc',
  possibleActionDesc_4: 'Possible Action 4 Desc',
  possibleActionDesc_5: 'Possible Action 5 Desc',
  doAction: '执行功能',
  pendingOrderRemarkHint: '限30字内',
  payMethod_1: '银行汇款',
  payMethod_2: '现金',
  payMethod_3: '信用卡',
  timeUnit_minutes: '分钟',
  pendingOrderCancel: '挂单交易取消',
  reportManage: '报表管理',
  depositReport: '入金报表',
  withdrawalReport: '出金报表',
  withdrawalApplyCheckList: '申请出金系统对帐清单',
  withdrawalApplyCheckDetail: '申请出金系统对帐明细',
  orderReport: '交易买卖报表',

  defaultExchangeHistoryList: '預設匯率歷史紀錄',
  sellExchangeRate: '賣出匯率',
  buyExchangeRate: '買進匯率',
  updateTime: '更新時間',

  id: '编号',
  actionSuccess: '执行成功',
  actionFail: '执行失败',

  currencySymbo: '币别符号',

  time: '时间',

  configManage: '参数管理',
  configName: '参数名称',
  configValue: '数值',
  configStatus: '状态',

  countryManage: '区域管理',

  countryStatus: '状态',

  bankStatus: '状态',

  bankName: '银行名称',

  menuDuplicatedError: '选单重复',

  nationManage: '介接系统代码管理',
  nationStatus: '状态',

  preferCurrencyManage: '会员喜好币别管理',
  preferTransCountryManage: '会员喜好区域管理',

  productManage: '产品管理',
  photoURL: '图片链结',

  mainStatus_Active: '启用',
  mainStatus_Invalid: '停用',

  billboardManage: '公布栏管理',
  billBoardType: '类型',
  isWEB: '网页讯息',
  isAPP: '推播',
  isEmail: '电子邮件',
  isTextMessage: '简讯',
  dateRange: '日期起讫',

  none: '无',

  memberManage: '会员管理',
  sysID: '系统编号',
  loginAccount: '登入帐号',
  memberIsLock: '帐号锁定',
  nation: '介接系统',
  mobile: '手机',
  media: '其他媒体',
  idVerifyStatus: '验证状态',
  idVerifyStatus_0: '0',
  idVerifyStatus_10: '10',
  idVerifyStatus_20: '20',
  idVerifyStatus_21: '21',
  idVerifyStatus_30: '30',
  validateType: '验证类别',
  validateType_1: '手机',
  validateType_2: '电子邮件',
  validateType_3: '其他媒体',

  memberAssetManage: '会员资产管理',
  amountWaiting: '未入帐资产',
  amountUseful: '可用资产',
  amountShelved: '冻结资产',
  product: '产品',
  memberBankAccountManage: '会员银行帐户管理',
  swiftCode: '国际银行码',

  noticeManage: '讯息管理',
  noticeType: '讯息类别',
  noticeType_message: '讯息',
  noticeType_bulletin: '公告',
  receiveList: '收件者清单',

  confirmPasswordError: '新密码与确认密码不相符',

  loginFail: '登入失败',
  userNameEmptyError: '用户名不可为空值',
  passwordEmptyError: '密码不可为空值',
  verifyCodeDismatchError: '验证码不符',

  commonSetting: '一般设定',
  billboardTypeManage: '公告类别设定',

  backendManage: '后台管理',
  systemSetting: '系统设定',

  chargeFeeConfigManage: '各类手续费设定',
  orderType: '订单类别',
  orderType_deposit: '充值',
  orderType_withdrawal: '出金',
  orderType_csadjust: '调帐',
  orderType_sellout: '卖出',
  orderType_buyin: '买入',
  manageFee: '手续费',
  chainFee: '区块练手续费',
  minManageFee: '最低手续费',
  maxManageFee: '最高手续费',

  discountTypeConfigManage: '各类折扣设定',
  discountType: '折扣类别',
  discountType_Birthday: '生日',
  discountRate: '折扣率',

  orderAmountLimitManage: '订单成交限额设定',
  lowestBid: '最低成交价',
  highestBid: '最高成交价',
  lowestUnitBidPercentage: '最低单价百分比',
  highestUnitBidPercentage: '最高单价百分比',

  operation: '操作',
  modifyPassword: '修改密码',
  passwordType: '密码类别',
  passwordType_login: '登入密码',
  passwordType_operation: '操作密码',
  originPassword: '原密码',

  memberAssetReport: '会员资产查询',
  memberAssetDetailReport: '会员资产细项查询',

  existedFunction: '现有功能',
  givenFunction: '赋予功能',

  backendError: '系统异常',

  orderManage: '订单管理',
  queryOrder: '查询订单',
  queryOrderDetail: '查询子单',
  orderRecord: '订单记录',
  orderAmount: '申购金额',
  orderNumber: '订单编号',
  orderStatus: '订单状态',
  orderDateTime: '订单时间',

  purchaseDate: '申购日期',

  totalAmount: '总数量',
  limitTransAmount: '最低成交量',
  remainingAmount: '剩余可交易数量',
  unitPrice: '单价',
  front_End_Comm: '前台备注',
  isTradeTimeLimited: '交易时间是否限制',
  allowTransWaitingTime: '容许交易等待时间',
  allowGradeValue: '容许等级',

  orderDetailList: '所属子单清单',
  orderDetailDate: '成交时间',
  transAmount: '交易数量',
  totalPayment: '应付款总价',
  expiryDate: '付款期限',
  orderDetailStatus: '子订单状态',
};
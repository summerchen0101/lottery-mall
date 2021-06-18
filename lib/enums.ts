export enum DateRangeType {
  Today = 1,
  Yesterday = 2,
  ThisWeek = 3,
  LastWeek = 4,
  ThisMonth = 5,
  LastMonth = 6,
  Tomorrow = 7,
  inYear = 8,
}

export enum BankCardStatus {
  On = 1,
  Off = 2,
}

export enum InviteStatus {
  On = 1,
  Off = 2,
}

export enum RechargeStatus {
  Waiting = 0,
  Success = 1,
  Failed = 2,
  Expired = 3,
  OrderFailed = 4,
  WaitPay = 5,
  Processing = 6,
}

export enum WithdrawStatus {
  Waiting = 0,
  Pending = 1,
  Success = 2,
  ReviewFailed = 3,
  WithdrawFailed = 4,
}

export enum OfflinePayment {
  Bankcard = 1,
  USDT = 4,
}
export enum OnlinePayment {
  Alipay = 1,
  Cloud = 2,
  WeChat = 6,
  USDT = 7,
}

export enum DiscountLogType {
  Normal = 5,
  Agent = 6,
}
export enum PasswordType {
  Normal = 1,
  Trade = 2,
}

export enum NoticeType {
  News,
  Faq,
}
export enum MemberType {
  Agent = 0,
  Member = 1,
}
export enum BetRecStatus {
  Pending = 0,
  Finish = 1,
  Cancel = 2,
}

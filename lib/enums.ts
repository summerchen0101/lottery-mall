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

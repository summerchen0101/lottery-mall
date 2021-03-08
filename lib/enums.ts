export enum ProcessStatus {
  Pending = 1,
  Running = 2,
  Finish = 3,
  Cancel = 4,
}

export enum AccountingStatus {
  Pending = 1,
  Running = 2,
  Finish = 3,
  Cancel = 4,
}

export enum NewsType {
  System = 1,
  Game = 2,
  Activity = 3,
}

export enum Section {
  Full = 'F',
  FirstHalf = 'FH',
}

export enum GameStatus {
  Live = 1,
  Preparing = 2,
  Finished = 3,
  Determining = 4,
  Canceled = 5,
  Postpone = 6,
}

export enum WalletRecType {
  Deposit = 1,
  Manual = 2,
  Withdraw = 3,
  Bet = 4,
  BetCancel = 5,
  BetResult = 6,
  AccountingFix = 7,
  Rebate = 8,
  Transfer = 9,
  Activirty = 10,
}

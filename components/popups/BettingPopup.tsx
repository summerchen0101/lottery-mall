import { useGlobalProvider } from '@/context/GlobalProvider'
import { sectionOpts } from '@/lib/options'
import useTransfer from '@/utils/useTransfer'
import React, { useMemo, useState } from 'react'
import { HStack, Text, useToast } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import useRequest from '@/utils/useRequest'

type BettingForm = {
  amount: number
}

function BettingPopup() {
  const { bettingInfo, eventInfo, userBalance } = useGlobalProvider()
  const { toDateTime, toOptionName } = useTransfer()
  const [amount, setAmount] = useState<number>()

  const canWinAmount = useMemo(() => {
    if (!amount) return 0
    return (bettingInfo?.odds * 10000 * amount) / 10000
  }, [amount, bettingInfo])

  const API = useRequest()
  const toast = useToast()
  const onSubmit = async () => {
    try {
      await API.createBet({
        odds_id: bettingInfo.id,
        odds: bettingInfo.odds,
        amount: +amount,
      })
      toast({ status: 'success', title: '下注成功' })
    } catch (err) {}
  }
  return (
    <div
      className="modal fade"
      id="betlistModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-titlemodal-header" id="myModalLabel">
              下注資訊
            </h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-hidden="true"
            ></button>
          </div>
          <div className="modal-body">
            <div className="league-col text-center text-lighgray">
              {eventInfo?.league?.name}
            </div>
            <div className="text-center ft-15 my-2">
              {eventInfo?.team_home?.name}(主) VS {eventInfo?.team_away?.name}
            </div>
            <div className="time-col text-center ft-13 mb-2">
              {toDateTime(eventInfo?.play_at)}
            </div>
            {bettingInfo && (
              <div className="background-gray ft15 text-center py-3">
                您正在<span className="text-red">反对</span>这场赛事结果为
                <HStack justifyContent="center">
                  <Text>
                    {toOptionName(sectionOpts, bettingInfo.section_code)}
                  </Text>
                  <Text>
                    {bettingInfo.home_point}-{bettingInfo.away_point}
                  </Text>
                </HStack>
                <span className="text-blue">
                  @{(bettingInfo.odds * 100).toFixed(2)}
                </span>
              </div>
            )}

            <div className="d-flex justify-content-between py-3">
              <div className="user-wallet">余额 ¥ {userBalance}</div>
              {/* <div className="handling-charge">手续费5%</div> */}
            </div>
            <div className="method-btn-wrap">
              <input
                type="number"
                className="method-input w-50"
                placeholder="本金"
                value={amount}
                onChange={(e) => setAmount(+e.target.value)}
              />
              <input
                type="number"
                className="method-input w-50"
                placeholder={`可赢 $${canWinAmount}`}
                disabled
              />
            </div>
            {/* <div className="method-btn-wrap">
              <div className="outline_btn color-gray trans-input">+50</div>
              <div className="outline_btn color-gray trans-input">+100</div>
              <div className="outline_btn color-gray trans-input">+1000</div>
              <div className="outline_btn color-gray trans-input">+5000</div>
            </div> */}
            {/* <div className="method-btn-wrap">
              <div className="outline_btn color-gray">清除</div>
              <div className="outline_btn color-gray">修改</div>
              <div className="flex2 outline_btn color-gray">余额全投</div>
            </div> */}
            {/* <P class="w-100 text-yellow"><i class="iconremind iconfont mr-1"></i>盘口、赔率已产生变化</P> */}
          </div>

          <div className="modal-footer d-flex flex-row justify-content-between flex-nowrap">
            <button
              type="button"
              className="btnbase outline_btn color-blue"
              data-dismiss="modal"
            >
              关闭视窗
            </button>
            <button
              type="button"
              className="btnbase primary_btn"
              onClick={() => onSubmit()}
            >
              立即投注
            </button>
            {/* <button type="button" class="btnbase primary_btn color-yellow">接受变化</button> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BettingPopup

import { useGlobalProvider } from '@/context/GlobalProvider'
import { sectionOpts } from '@/lib/options'
import useTransfer from '@/utils/useTransfer'
import React, { useEffect, useMemo, useState } from 'react'
import { Box, Flex, HStack, Spacer, Text, useToast } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import useRequest from '@/utils/useRequest'
import { Modal } from 'react-bootstrap'
import { usePopupContext } from '@/context/PopupContext'
import numeral from 'numeral'
import useService from '@/utils/useService'

function BettingPopup() {
  const { bettingInfo, eventInfo, user, betSettings } = useGlobalProvider()
  const { fetchUserInfo } = useService()
  const { toDateTime, toOptionName, amountToCanWin, toCurrency } = useTransfer()
  const [amount, setAmount] = useState<number | ''>('')
  const [visible, setVisible] = usePopupContext('betting')
  const chips = [100, 500, 1000, 5000]

  const API = useRequest()
  const toast = useToast()

  const handleReset = () => {
    setAmount('')
    setVisible(false)
  }
  const onSubmit = async () => {
    const _amount = numeral(amount).value()
    if (!_amount) {
      toast({ duration: 2000, status: 'warning', title: '本金不可为空' })
      return
    }
    try {
      await API.createBet({
        odds_id: bettingInfo.id,
        odds: bettingInfo.home_odds,
        amount: _amount,
      })
      fetchUserInfo()
      toast({ duration: 1000, status: 'success', title: '下注成功' })
      handleReset()
    } catch (err) {}
  }

  const handleAmountChange = (amount: number) => {
    let value = amount
    if (value > user?.balance) {
      value = user?.balance
    }
    return setAmount(value || '')
  }

  useEffect(() => {
    if (amount > 999999) {
      return setAmount(999999)
    }
  }, [amount])
  return (
    <Modal show={visible} onHide={handleReset} centered>
      <Modal.Header closeButton>
        <h5 className="modal-titlemodal-header">下注资讯</h5>
      </Modal.Header>
      <Modal.Body>
        <div className="league-col text-center">
          {eventInfo?.team_home?.league_name}
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
              <Text>{toOptionName(sectionOpts, bettingInfo.section_code)}</Text>
              <Text>
                {bettingInfo.home_point}-{bettingInfo.away_point}
              </Text>
            </HStack>
            <span className="text-blue">
              @{(bettingInfo.home_odds * 100).toFixed(2)}
            </span>
          </div>
        )}

        <div className="d-flex justify-content-between mt-3">
          <div className="user-wallet">
            余额
            <span className="ml-2 text-blue">
              ¥{toCurrency(user?.balance, 2)}
            </span>
          </div>
          <div className="handling-charge">
            手续费<span className="ml-2 text-yellow">5%</span>
          </div>
        </div>
        <Flex mt="1" mb="4">
          <Box>
            单注限额
            <Text ml="2" as="span">
              {betSettings?.single_bet_least} ~{' '}
              {toCurrency(betSettings?.single_bet_limit, 0)}
            </Text>
          </Box>
          <Spacer />
          <Box>
            单场限额
            <Text ml="2" as="span">
              {toCurrency(betSettings?.single_game_limit, 0)}
            </Text>
          </Box>
        </Flex>
        <div className="method-btn-wrap">
          <input
            type="number"
            className="w-50"
            placeholder="本金"
            id="capital"
            value={amount}
            onChange={(e) => handleAmountChange(+e.currentTarget.value)}
          />
          <div className="w-50 " id="profit">
            可赢 $
            {numeral(amountToCanWin(amount, bettingInfo?.home_odds)).format(
              '0,0.00',
            )}
          </div>
        </div>
        <div className="method-btn-wrap">
          {chips.map((chip) => (
            <div
              key={chip}
              className="outline_btn color-gray"
              onClick={() => handleAmountChange(+amount + chip)}
            >
              +{chip}
            </div>
          ))}
        </div>
        <div className="method-btn-wrap">
          <div className="outline_btn color-gray" onClick={() => setAmount('')}>
            清除
          </div>
          {/* <div className="outline_btn color-gray">修改</div> */}
          <div
            className="flex2 outline_btn color-gray"
            onClick={() => setAmount(user?.balance)}
          >
            余额全投
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="d-flex flex-row justify-content-between flex-nowrap">
        <button
          type="button"
          className="btnbase outline_btn color-blue"
          onClick={() => setVisible(false)}
        >
          关闭窗口
        </button>
        <button
          type="button"
          className="btnbase primary_btn"
          onClick={() => onSubmit()}
        >
          立即投注
        </button>
        {/* <button type="button" class="btnbase primary_btn color-yellow">接受变化</button> */}
      </Modal.Footer>
    </Modal>
  )
}

export default BettingPopup

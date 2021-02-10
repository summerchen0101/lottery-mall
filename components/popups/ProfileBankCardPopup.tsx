import React, { useEffect } from 'react'
import BottomPopup from '@/components/popups/BottomPopup'
import $ from 'jquery'
import useRequest from '@/utils/useRequest'
import useService from '@/utils/useService'
import { Text } from '@chakra-ui/layout'

const jqEffectFunc = function () {
  $('.mask').fadeIn()
  $('#bank-card-edit').addClass('slide-up')
}

function ProfileBankCardPopup() {
  const { bankCardOpts, fetchBankCardOpts } = useService()

  useEffect(() => {
    $('.bank-card').on('click', jqEffectFunc)
    fetchBankCardOpts()
    return () => {
      $('.bank-card').off()
    }
  }, [])
  return (
    <BottomPopup title="銀行卡" id="bank-card-edit">
      {bankCardOpts.map((t, i) => (
        <Text key={i}>{t.name}</Text>
      ))}
    </BottomPopup>
  )
}

export default ProfileBankCardPopup

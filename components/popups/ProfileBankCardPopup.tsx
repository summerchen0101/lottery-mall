import BottomPopup from '@/components/popups/BottomPopup'
import { useGlobalProvider } from '@/context/GlobalProvider'
import useService from '@/utils/useService'
import { Text } from '@chakra-ui/layout'
import $ from 'jquery'
import React, { useEffect } from 'react'

const jqEffectFunc = function () {
  $('.mask').fadeIn()
  $('#bank-card-edit').addClass('slide-up')
}

function ProfileBankCardPopup() {
  const { fetchBankCardOpts } = useService()
  const { bankcardOpts } = useGlobalProvider()

  useEffect(() => {
    $('.bank-card').on('click', jqEffectFunc)
    fetchBankCardOpts()
    return () => {
      $('.bank-card').off()
    }
  }, [])
  return (
    <BottomPopup title="银行卡" id="bank-card-edit">
      {bankcardOpts.map((t, i) => (
        <Text key={i}>{t.name}</Text>
      ))}
    </BottomPopup>
  )
}

export default ProfileBankCardPopup

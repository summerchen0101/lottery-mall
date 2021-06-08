import { Button } from '@chakra-ui/button'
import { FormControl, FormLabel } from '@chakra-ui/form-control'
import { Input } from '@chakra-ui/input'
import { Box, HStack, Stack, Text } from '@chakra-ui/layout'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal'
import { Radio, RadioGroup } from '@chakra-ui/radio'
import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { useForm } from 'react-hook-form'
import FieldValidateMessage from './FieldValidateMessage'

export interface TeamSearchForm {
  type: 'username' | 'uid'
  keyword: string
}
interface TeamSearchPopupProps {
  isOpen: boolean
  onClose: () => void
  title: string
  onChange: (data: TeamSearchForm & { startDate: Date; endDate: Date }) => void
}

function TeamSearchPopup({
  isOpen,
  onClose,
  title,
  onChange,
}: TeamSearchPopupProps) {
  const { register, errors, handleSubmit, setValue } = useForm<TeamSearchForm>()
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const onSubmit = handleSubmit(async (d) => {
    onChange({ ...d, startDate, endDate })
    onClose()
  })
  return (
    <Modal isOpen={isOpen} onClose={onClose} autoFocus={false} isCentered>
      <ModalOverlay />
      <ModalContent
        className="modal__content"
        as="form"
        onSubmit={onSubmit}
        noValidate
      >
        <ModalHeader className="modal__header">
          <Text>{title}</Text>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody className="modal__body" color="#fff" lineHeight="24px">
          <Stack spacing="12px">
            <FormControl isRequired isInvalid={!!errors.type}>
              <FormLabel>会员查询</FormLabel>
              <RadioGroup name="type" defaultValue="username">
                <Stack direction="row">
                  <Radio value="username" ref={register}>
                    帐号
                  </Radio>
                  <Radio value="uid" ref={register}>
                    会员编号
                  </Radio>
                </Stack>
              </RadioGroup>
              <FieldValidateMessage error={errors.type} />
            </FormControl>
            <FormControl isRequired isInvalid={!!errors.keyword}>
              <Input name="keyword" ref={register} />
              <FieldValidateMessage error={errors.keyword} />
            </FormControl>
            <HStack>
              <Box flex="1">
                <Text>開始</Text>
                <Input
                  as={DatePicker}
                  selected={startDate}
                  onChange={(date) => setStartDate((date as unknown) as Date)}
                  bg="gray.800"
                  className="date"
                />
              </Box>
              <Box flex="1">
                <Text>結束</Text>
                <Input
                  as={DatePicker}
                  selected={endDate}
                  onChange={(date) => setEndDate((date as unknown) as Date)}
                  bg="gray.800"
                />
              </Box>
            </HStack>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button type="submit" mt="3" w="full" colorScheme="brand">
            确认
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default TeamSearchPopup

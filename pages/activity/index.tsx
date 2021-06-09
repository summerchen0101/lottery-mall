import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import useActivityList from '@/service/useActivityList'
import { Image } from '@chakra-ui/image'
import {
  Box,
  Center,
  Flex,
  HStack,
  Spacer,
  Stack,
  Text,
} from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { useRouter } from 'next/dist/client/router'
import React from 'react'

function activityList() {
  const router = useRouter()
  const { activityList, isLoading } = useActivityList()
  return (
    <Layout>
      <HeaderTitleBar title="优惠活动" />
      <Box p="15px 15px 65px 15px" flex="1" overflowY="auto">
        {isLoading ? (
          <Center w="full" h="100%">
            <Spinner m="20px" />
          </Center>
        ) : (
          <Stack spacing="10px">
            {activityList?.map((t) => (
              <HStack
                key={t.id}
                bg="contentBg.500"
                align="start"
                p="20px"
                onClick={() => router.push(`/activity/${t.id}`)}
                borderRadius="md"
                overflow="hidden"
              >
                <Image
                  src={`${process.env.apiBaseUrl}/${t.tiny_pic}`}
                  // boxSize="100px"
                  w="33%"
                  h="100px"
                  objectFit="cover"
                  borderRadius="sm"
                  float="left"
                />

                <Flex
                  w="67%"
                  h="100px"
                  color="#fff"
                  flexDir="column"
                  justifyContent="center"
                >
                  <Text fontSize="1.2rem" mb="1" fontWeight="600" noOfLines={1}>
                    {t.title}
                  </Text>

                  <Text fontSize=".9375rem" noOfLines={2}>
                    {t.summary}
                  </Text>
                </Flex>
              </HStack>
            ))}
          </Stack>
        )}
      </Box>
      <FooterNav />
    </Layout>
  )
}

export default activityList

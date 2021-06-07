import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import useActivityList from '@/service/useActivityList'
import { Image } from '@chakra-ui/image'
import { Box, Center, Flex, Spacer, Stack, Text } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { useRouter } from 'next/dist/client/router'
import React from 'react'

function activityList() {
  const router = useRouter()
  const { activityList, isLoading } = useActivityList()
  return (
    <Layout>
      <HeaderTitleBar title="优惠活动" />
      <Box p="15px" flex="1" overflowY="auto">
        {isLoading ? (
          <Center w="full" h="100%">
            <Spinner m="20px" />
          </Center>
        ) : (
          <Stack spacing="15px">
            {activityList?.map((t) => (
              <Flex
                key={t.id}
                bg="contentBg.500"
                align="start"
                p="20px"
                onClick={() => router.push(`/activity/${t.id}`)}
                shadow="sm"
                borderRadius="md"
                overflow="hidden"
              >
                <Image
                  src={`${process.env.apiBaseUrl}/${t.tiny_pic}`}
                  boxSize="100px"
                  objectFit="cover"
                />
                <Flex
                  flex="1"
                  px="10px"
                  h="100px"
                  color="#fff"
                  flexDir="column"
                >
                  <Text fontSize="1.3rem" fontWeight="600">
                    {t.title}
                  </Text>
                  <Spacer />
                  <Text fontSize=".9375rem" h="3.5rem" noOfLines={2}>
                    {t.summary}
                  </Text>
                </Flex>
              </Flex>
            ))}
          </Stack>
        )}
      </Box>
      <FooterNav />
    </Layout>
  )
}

export default activityList

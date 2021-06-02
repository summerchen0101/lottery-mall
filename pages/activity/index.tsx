import FooterNav from '@/components/FooterNav'
import HeaderTitleBar from '@/components/HeaderTitleBar'
import Layout from '@/components/Layout'
import useActivityList from '@/service/useActivityList'
import { Image } from '@chakra-ui/image'
import { Box, Flex, Stack, Text } from '@chakra-ui/layout'
import { Spinner } from '@chakra-ui/spinner'
import { useRouter } from 'next/dist/client/router'
import React from 'react'

function activityList() {
  const router = useRouter()
  const { activityList, isLoading } = useActivityList()
  return (
    <Layout>
      <HeaderTitleBar title="优惠活动" />
      <Box p="20px" flex="1" overflowY="auto">
        {isLoading ? (
          <Spinner />
        ) : (
          <Stack spacing="15px">
            {activityList?.map((t) => (
              <Flex
                key={t.id}
                bg="white"
                align="start"
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
                <Box flex="1" p="10px">
                  <Text fontSize="lg" color="pink.500" fontWeight="600">
                    {t.title}
                  </Text>
                  <Text fontSize="md" noOfLines={2} color="gray.500">
                    {t.summary}
                  </Text>
                </Box>
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

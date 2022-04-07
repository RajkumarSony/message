import React from 'react'
import {Box,SkeletonCircle, SkeletonText } from "@chakra-ui/react"
import { useThemeConfig } from '../../ThemeConfig'

export default function SkeletonContact() {
  const config = useThemeConfig();
    return (
        <Box h="80px" backgroundColor={config.contactBg} cursor="pointer" d="flex">
        <SkeletonCircle  my={3} mx={2} startColor="#a59a9a"  endColor="#83d8d8"  cursor="pointer" size="16" />
        <Box
          mt={4}
          width="90%"
          h="80%"
          borderBottom="1px solid rgba(32,32,23,0.23)"
        >
          <SkeletonText startColor="#a59a9a" endColor="#83d8d8" noOfLines={2} mr={2} spacing="4" />
        </Box>
      </Box>
    )
}

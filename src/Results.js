import React from 'react'
import { Text, Flex, Link, Input, Button, Box, Image, Heading, Spacer } from '@chakra-ui/react';

function Results() {
  return (
    <Flex align="center" direction="column">
        <Heading textAlign="center">Results</Heading>


        {/* Number of flashcards completed out of total */}
        <Text fontSize="30px" textAlign="center">
            12/25
        </Text>


        {/* Total number of points in study session */}
        <Text fontSize="30px" textAlign="center">
            2,400 pts
        </Text>


        {/* Image representing highest streak */}

        <Flex direction="row" justifyContent="space-between" >
            {/* Replay button */}
            <Button size="sm">
                Replay
            </Button>

            <Spacer />


            {/* Home button */}
            <Button size="sm">
                Home
            </Button>


        </Flex>
    </Flex>
  )
}

export default Results
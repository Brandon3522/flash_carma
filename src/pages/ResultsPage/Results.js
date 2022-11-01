import React from 'react'
import { Text, Flex, Link, Input, Button, Box, Image, Heading, Spacer } from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';


export const Results = () => {

   var streak =  sessionStorage.getItem('streak');
   var score = sessionStorage.getItem('score');
   var cardNumber = sessionStorage.getItem('cardnumber');
   var totalCard = sessionStorage.getItem('totalcard');

  return (
    <Flex align="center" direction="column">
        <Heading textAlign="center">Results</Heading>


        {/* Number of flashcards completed out of total */}
        <Text fontSize="30px" textAlign="center">
           Deck completion: {cardNumber}/{totalCard}
        </Text>

        {/* Study Session streak */}
        {/* Image representing highest streak added later */}
        <Text fontSize="30px" textAlign="center">
        Streak: {streak}
        </Text>

        {/* Total number of points in study session */}
        <Text fontSize="30px" textAlign="center">
        Score: {score}
        </Text>

        

        <Spacer marginTop={'20px'}/>

        <Flex direction="row" justifyContent="space-between" >
            {/* Replay button */}
            <Link as={ReachLink} to='/study'>
            <Button size="sm">
                Replay
            </Button>
            </Link>

            <Spacer marginLeft={'10px'}
            marginRight={'10px'}/>

            {/* Home button */}
            <Link as={ReachLink} to='/home'>
            <Button size="sm">
                Home
            </Button>
            </Link>

        </Flex>
    </Flex>
  )
}

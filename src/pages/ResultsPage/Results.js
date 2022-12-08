
import React, { useState, useEffect, useContext } from 'react';
import { Text, Flex, Link, Button, Heading, Spacer } from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import {getDocs, collection, doc, getDoc, updateDoc,
  } from 'firebase/firestore';
  import { database } from "../../firebase";
import UserContext from "../../UserContext";


export const Results = () => {
  var streak = sessionStorage.getItem('streak');
  var score = sessionStorage.getItem('score');
  var cardNumber = sessionStorage.getItem('cardnumber');
  var totalCard = sessionStorage.getItem('totalcard');
  score = parseInt(score)
 
 // User context
 const user = useContext(UserContext)?.user;
 const user_ref = doc(database, 'users', user.uid);




  // Update user score
  const updateUserScore = async value => {
    const data = await getDoc(user_ref);

    var score = data.data().score + value;
    //console.log(score)

    await updateDoc(user_ref, {
      score: score,
    });

    console.log('Score updated');
  };

  return (
    <Flex align="center" direction="column">
      <Spacer marginTop={10} />
      <Heading as="h3" size="xl" textAlign={'center'}>
        Results
      </Heading>

      {/* Number of flashcards completed out of total */}
      <Text fontSize="30px" textAlign="center">
        Deck completion: {cardNumber}/{totalCard}
      </Text>

      {/* Study Session streak */}
      {/* Image representing highest streak */}
      <Text fontSize="30px" textAlign="center">
        Streak: {streak}
      </Text>

      {/* Total number of points in study session */}
      <Text fontSize="30px" textAlign="center">
        Score: {score}
      </Text>

      <Spacer marginTop={'20px'} />

      <Flex direction="row" justifyContent="space-between">
        {/* Replay button */}
        <Link style={{ textDecoration: 'none' }} as={ReachLink} to="/study">
          <Button
            size="lg"
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}
            onClick={() => updateUserScore(score)}
          >
            Replay
          </Button>
        </Link>

        <Spacer marginLeft={'10px'} marginRight={'10px'} />

        {/* Home button */}
        <Link style={{ textDecoration: 'none' }} as={ReachLink} to="/home">
          <Button
            size="lg"
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}
            onClick={() => updateUserScore(score)}
          >
            Home
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

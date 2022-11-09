import React, { useContext, useEffect } from 'react'
import { Heading, Text, Box, Spacer, RangeSliderThumb } from '@chakra-ui/react'
import { useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, database } from '../../firebase';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import UserContext from '../../UserContext';

export const Home = () => {
  //const [user, loading, error] = useAuthState(auth);
  const [username, setUsername] = useState('');
  const [user_score, setUsers_score] = useState(0);

  // User context
  const user = useContext(UserContext)?.user;
  

  // const getUserName = async () => {
  //   try {
  //     const q = query(collection(database, 'users'), where('uid', '==', user?.uid));
  //     const doc = await getDocs(q);
  //     const data = doc.docs[0].data();
  //     setUsername(data.username);
  //   } catch (err) {
  //     console.error(err);
  //     alert("Error fetching user name")
  //   }
  // }

  // useEffect(() => {
  //   if (loading) return;
  //   if (!user) return;
  //   getUserName();
  // }, [user, loading])

  // Get user score
  // Database reference: const user_ref = doc(database, 'users', userID);
  // State: const [user_score, setUsers_score] = useState(0);
  const get_user_score = async () => {
      const user_ref = doc(database, 'users', user.uid);
      const data =  await getDoc(user_ref);

      const score = data.data().score;
      console.log(score)
      setUsers_score(score)
  }

  // if (loading) {
  //   return (
  //     <Box>
  //       <Heading>Loading...</Heading>
  //     </Box>
  //   )
  // }
  // if (error) {
  //   <Box>
  //     <Heading>Error!</Heading>
  //   </Box>
  // }
  if (user) {
    get_user_score()

    
  }
  

  return (
    <Box>
      <Box>
        <Heading>Home</Heading>
        <Heading>{username}</Heading>
        <Text>Current User ID: {user.uid}</Text>
        <Text>User Score: {user_score}</Text>
      </Box>

      <Spacer
      margin={'100px'}/>

      <Text fontSize={'2rem'} marginLeft='20px'> Recent Decks: </Text>
       <Box
       background= 'teal'
       height='400px'>

      </Box>

      {/* Containder for recent decks idea */}

    </Box>
  )
}

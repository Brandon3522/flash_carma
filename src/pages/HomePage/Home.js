import React, { useContext, useEffect } from 'react'
import { Heading, Text, Box, Spacer, RangeSliderThumb, Flex, Grid } from '@chakra-ui/react'
import { useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, database } from '../../firebase';
import { collection, getDocs, query, where, doc, getDoc, onSnapshot, limit } from 'firebase/firestore';
import UserContext from '../../UserContext';
import { SDeck } from '../../components/SDeck';

export const Home = () => {
  //const [user, loading, error] = useAuthState(auth);


  // User context
  const user = useContext(UserContext)?.user;
  const studyDecks_ref = collection(database, 'users', user.uid, 'study-decks')
  const [username, setUsername] = useState('');
  const [user_score, setUsers_score] = useState(0);
  const [studyDecks, setStudyDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studyDecks_limit, setStudyDecks_limit] = useState([]);
  

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

  useEffect (() => {
    const q = query(studyDecks_ref, limit(4))
    const getStudyDecks_limit = async () => {
      const data =  await getDocs(q);

      setStudyDecks_limit(data.docs.map((doc) => ({
        ...doc.data(), id: doc.id
      })))

    }
    getStudyDecks_limit();
    const unsub = onSnapshot(q, (snapshot) => {
      setStudyDecks(snapshot.docs.map((doc) => ({
        ...doc.data(), id: doc.id
      })))

      setLoading(false);
    })

    return unsub;
  }, [])

 /* useEffect(() => {
    const q = query(studyDecks_ref, limit(4))
    const getStudyDecks_limit = async () => {
      const data =  await getDocs(q);

      setStudyDecks_limit(data.docs.map((doc) => ({
        ...doc.data(), id: doc.id
      })))

    }
    getStudyDecks_limit();
  }, []) */

  if (loading) {
    return (
      <Heading textAlign={'center'}>Loading...</Heading>
    )
  } 
  

  return (
    <Box>
      <Box>
        <Spacer marginTop={10} />
        <Heading align={'center'}>Home</Heading>
        <Heading>{username}</Heading>
        {/* For testing purposes.
            <Text>Current User ID: {user.uid}</Text> 
        */}
        <Text align={'center'} fontSize={'1.5rem'}> User Score: {user_score}</Text>
      </Box>

      <Spacer margin={'100px'}/>

      <Text fontSize={'2rem'} marginLeft='20px'> Recent Decks: </Text>

      <Spacer marginBottom={10}/>

      <Flex justifyContent={'center'}>
        {/* Grid of Study Decks */}
        <Grid templateColumns='repeat(5, 1fr)' gap={10}>

          {/* From here on, it's the user's existing study decks */}

         {studyDecks.map(deck => (
            <SDeck key={deck.id} id={deck.id}
              name={deck.name} />
         ))} 

        </Grid>
      </Flex>
      {/* Containder for recent decks idea */}
      <Spacer marginTop={10}/>
    </Box>
  )
}

import React, { useState, useEffect, useContext } from 'react';
import {
  Flex, Link, Input, Button, ButtonGroup, Box, Heading, Spacer,
  Grid, GridItem, LinkBox, LinkOverlay, useDisclosure,
} from '@chakra-ui/react';
import {
  getDocs, collection, doc, getDoc, addDoc, deleteDoc, onSnapshot,
  query, where, limit
} from 'firebase/firestore';
import { database } from '../../firebase';
import { SDeck } from '../../components/SDeck'
import UserContext from '../../UserContext';

export const StudyDeckSelection = () => {

   /* Javascript goes here */
   const user = useContext(UserContext)?.user;
  
   const studyDecks_ref = collection(database, 'users', user.uid, 'study-decks')
   const [studyDecks, setStudyDecks] = useState([]);
   const [loading, setLoading] = useState(true);
   const { isOpen, onOpen, onClose } = useDisclosure();
   const initialRef = React.useRef(null)
 
 
   // Get all study decks from user on page load with realtime updates
   // Fix issue with loading state
   useEffect (() => {
     const unsub = onSnapshot(studyDecks_ref, (snapshot) => {
       setStudyDecks(snapshot.docs.map((doc) => ({
         ...doc.data(), id: doc.id
       })))
 
       setLoading(false);
     })
 
     return unsub;
   }, [])
 

 
   if (loading) {
     return (
       <Heading textAlign={'center'}>Loading...</Heading>
     )
   } 
  return (
    <>
        <Heading align={'center'}> Study Decks </Heading>

        <Spacer marginBottom={10} />
      <Flex justifyContent={'center'}>
        {/* Grid of Study Decks */}
        <Grid templateColumns='repeat(5, 1fr)' gap={10} >

          {/* From here on, it's the user's existing study decks */}

         {studyDecks.map(deck => (
            <SDeck key={deck.id} id={deck.id}
              name={deck.name} />
         ))} 

        </Grid>
      </Flex>
    </>
  )
}

import React, { useState, useEffect } from 'react';
import {
  Flex, Link, Input, Button, ButtonGroup, Box, Heading, Spacer,
  Grid, GridItem, LinkBox, LinkOverlay, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody,
  PopoverFooter, PopoverArrow, PopoverCloseButton, PopoverAnchor,
} from '@chakra-ui/react';
import {
  getDocs, collection, doc, getDoc, addDoc, deleteDoc, onSnapshot,
  query, where, limit
} from 'firebase/firestore';
import { database } from '../../firebase';
import { Deck } from '../../components/Deck';

export const ViewStudyDecks = () => {
  const userID = 'f6RoGmfu7uVUC7UBSKO7jQtmc4F2';
  
  const studyDecks_ref = collection(database, 'users', userID, 'study-decks')
  const [studyDecks, setStudyDecks] = useState([]);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const getStudyDecks = async () => {
      const data = await getDocs(studyDecks_ref);

      setStudyDecks(data.docs.map((doc) => ({
        ...doc.data(), id: doc.id
      })))
      setLoading(false);
    }
    getStudyDecks();
  }, []) 

  const delete_studyDeck = async (delete_studyDeckName) => {
    try {
      const q = query(studyDecks_ref, where('name', '==', delete_studyDeckName), limit(1));
      console.log(q);

      const docs = await getDocs(q);
      var doc_id = ''
      docs.forEach((doc) => {
        doc_id = doc.id
      })

      const studyDeck = doc(database, 'users', userID, 'study-decks', doc_id);

      await deleteDoc(studyDeck);

      console.log('Study Deck deleted successfully');
    } catch (error) {
      alert(`Deletion unsuccessful: ${error.message}`);
    }
  } 

  if (loading) {
    return (
      <Heading textAlign={'center'}>Loading...</Heading>
    )
  } 
  return (
    <>
      <Heading as='h3' size='xl'>Study Decks</Heading>


      <Spacer marginBottom={10} />
      <Flex>
        {/* Grid of Study Decks */}
        <Grid templateColumns='repeat(4, 1fr)' gap={10}>
          {/* Create new study deck button. MAKE A POPOVER LATER*/}
          <LinkBox>
            <LinkOverlay href='#'>
              <GridItem w='100px' h='100px' bg='chartreuse'>Create Study Deck</GridItem>
            </LinkOverlay>
          </LinkBox>

          {/* From here on, it's the user's existing study decks */}

         {studyDecks.map(deck => (
            <Deck key={deck.id} id={deck.id}
              name={deck.name} onDelete={() => { delete_studyDeck(deck.name) }} />
         ))} 



          {/* <LinkBox>
            <LinkOverlay href='#'>
              <GridItem w='100px' h='100px' bg='chartreuse'>Study Deck 2</GridItem>
            </LinkOverlay>
          </LinkBox>

          <LinkBox>
            <LinkOverlay href='#'>
              <GridItem w='100px' h='100px' bg='chartreuse'>Study Deck 3</GridItem>
            </LinkOverlay>
          </LinkBox>

          <LinkBox>
            <LinkOverlay href='#'>
              <GridItem w='100px' h='100px' bg='chartreuse'>Study Deck 4</GridItem>
            </LinkOverlay>
         </LinkBox> */}


        </Grid>
      </Flex>
    </>
  )
}
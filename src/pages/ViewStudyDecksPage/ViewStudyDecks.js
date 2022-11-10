import React, { useState, useEffect, useContext } from 'react';
import {
  Flex, Link, Input, Button, ButtonGroup, Box, Heading, Spacer,
  Grid, GridItem, LinkBox, LinkOverlay, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody,
  PopoverFooter, PopoverArrow, PopoverCloseButton, PopoverAnchor, Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react';
import {
  getDocs, collection, doc, getDoc, addDoc, deleteDoc, onSnapshot,
  query, where, limit
} from 'firebase/firestore';
import { database } from '../../firebase';
import { Deck } from '../../components/Deck';
import UserContext from '../../UserContext';

export const ViewStudyDecks = () => {
  //const user = 'f6RoGmfu7uVUC7UBSKO7jQtmc4F2';
  // User context
  const user = useContext(UserContext)?.user;
  
  const studyDecks_ref = collection(database, 'users', user.uid, 'study-decks')
  const [studyDecks, setStudyDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null)

  const user_studyDeck_ref = collection(database, 'users', user.uid, 'study-decks');
  const [studyDeck_name, setStudyDeck_name] = useState('');



  // useEffect(() => {
  //   const getStudyDecks = async () => {
  //     const data = await getDocs(studyDecks_ref);

  //     setStudyDecks(data.docs.map((doc) => ({
  //       ...doc.data(), id: doc.id
  //     })))
  //     setLoading(false);
  //   }
  //   getStudyDecks();
  // }, [])

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

  const delete_studyDeck = async (delete_studyDeckName) => {
    try {
      const q = query(studyDecks_ref, where('name', '==', delete_studyDeckName), limit(1));
      console.log(q);

      const docs = await getDocs(q);
      var doc_id = ''
      docs.forEach((doc) => {
        doc_id = doc.id
      })

      const studyDeck = doc(database, 'users', user.uid, 'study-decks', doc_id);

      await deleteDoc(studyDeck);

      console.log('Study Deck deleted successfully');
    } catch (error) {
      alert(`Deletion unsuccessful: ${error.message}`);
    }
  } 

  function add_studyDeck() {
    addDoc(user_studyDeck_ref, {
        name: studyDeck_name,
    })
        .then(() => {
            alert('Data Added');
        })
        .catch((err) => {
            alert(err.message);
        });
  }

  if (loading) {
    return (
      <Heading textAlign={'center'}>Loading...</Heading>
    )
  } 
  return (
    <>
      <Heading as='h3' size='xl' textAlign={'center'}>Study Decks</Heading>


      <Spacer marginBottom={10} />
      <Flex justifyContent={'center'}>
        {/* Grid of Study Decks */}
        <Grid templateColumns='repeat(5, 1fr)' gap={10} >
          {/* Create new study deck button. MAKE A POPOVER LATER*/}
          {/*
          <LinkBox>
            <LinkOverlay href='#'>
              <GridItem w='200px' h='200px' bg='chartreuse' lineHeight={'200px'} textAlign={'center'}>Create Study Deck</GridItem>
            </LinkOverlay>
          </LinkBox>
          */}

          <Button onClick={onOpen} w={200} h={200} fontSize={'10rem'} paddingBottom={'30px'}> + </Button>

          <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create Study Deck</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel>Study Deck Name</FormLabel>
                  <Input ref={initialRef} placeholder='Study Deck Name'
                  onChange={e => setStudyDeck_name(e.target.value)} />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme='red' mr={3} onClick={onClose}>
                  Close
                </Button>
                <Button colorScheme='blue' mr={3} onClick={add_studyDeck}>
                  Okay
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
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
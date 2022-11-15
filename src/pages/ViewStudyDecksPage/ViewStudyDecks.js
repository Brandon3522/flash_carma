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
  Radio,
} from '@chakra-ui/react';
import {
  getDocs, collection, doc, getDoc, addDoc, deleteDoc, onSnapshot,
  query, where, limit, orderBy
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

  //const [acending_order, setAcending_order] = useState(true);
 // const [studyDecks_order, setStudyDecks_order] = useState([]);

  //var ascending = true;

  var deckname

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



/*useEffect (() => {
  const unsub = onSnapshot(studyDecks_ref, (snapshot) => {
    
    setStudyDecks(snapshot.docs.map((doc) => ({
      ...doc.data(), id: doc.id
    })))

    setLoading(false);
  })

  return unsub;
}, [])*/

/*useEffect (() => {
var order
  if(acending_order){
    order = 'asc'
  }
  else{
    order = 'desc'
  }


  const q = query(studyDecks_ref, orderBy('name', order))

  const getStudyDecks_order = async () => {
    const data =  await getDocs(q);

    setStudyDecks_order(data.docs.map((doc) => ({
      ...doc.data(), id: doc.id
    })))

  }
  getStudyDecks_order();
  const unsub = onSnapshot(q, (snapshot) => {
    setStudyDecks(snapshot.docs.map((doc) => ({
      ...doc.data(), id: doc.id
    })))

    setLoading(false);
  })

  return unsub;
}, [])*/

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
      <Spacer marginTop={10} />
      <Heading as='h3' size='xl' textAlign={'center'}>Study Decks</Heading>

      <Spacer marginBottom={10} />
      <Flex justifyContent={'center'}>
        {/* Grid of Study Decks */}
        <Grid templateColumns='repeat(5, 1fr)' gap={10} >

          <Button onClick={onOpen} w={200} h={200} fontSize={'10rem'} paddingBottom={'30px'} shadow='md' borderRadius={'lg'}> + </Button>

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
              name={deck.name} onDelete={() => { delete_studyDeck(deck.name) }} 
              //getDeckName={() => {getDeckName(deck.id)}}
              />
         ))} 


        </Grid>
      </Flex>
      <Spacer marginTop={10}/>
    </>
  )
}
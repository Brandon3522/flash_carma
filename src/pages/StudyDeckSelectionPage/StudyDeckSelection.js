import React, { useState, useEffect, useContext } from 'react';
import {
  Flex,
  Heading,
  Spacer,
  Grid,
  useDisclosure,
  Spinner,
} from '@chakra-ui/react';
import { collection, onSnapshot } from 'firebase/firestore';
import { database } from '../../firebase';
import { SDeck } from '../../components/SDeck';
import UserContext from '../../UserContext';

export const StudyDeckSelection = () => {
  /* Javascript goes here */
  const user = useContext(UserContext)?.user;

  const studyDecks_ref = collection(database, 'users', user.uid, 'study-decks');
  const [studyDecks, setStudyDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);

  // Get all study decks from user on page load with realtime updates
  useEffect(() => {
    const unsub = onSnapshot(studyDecks_ref, snapshot => {
      setStudyDecks(
        snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }))
      );

      setLoading(false);
    });

    return unsub;
  }, []);

  if (loading) {
    return (
      <Spinner
        position={'fixed'}
        top={'50%'}
        left={'50%'}
        transform={'translate(-50%, 50%)'}
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="#4299e1"
        size="xl"
      />
    );
  }
  return (
    <>
      <Spacer marginTop={10} />
      <Heading align={'center'}> Study Decks </Heading>

      <Spacer marginBottom={10} />
      <Flex justifyContent={'center'}>
        {/* Grid of Study Decks */}
        <Grid templateColumns="repeat(5, 1fr)" gap={10}>
          {/* From here on, it's the user's existing study decks */}

          {studyDecks.map(deck => (
            <SDeck key={deck.id} id={deck.id} name={deck.name} />
          ))}
        </Grid>
      </Flex>
      <Spacer marginTop={10} />
    </>
  );
};

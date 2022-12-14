import React, { useContext, useEffect } from 'react';
import {  Heading, Text, Box, Spacer, Flex, Grid, Spinner,
} from '@chakra-ui/react';
import { useState } from 'react';
import { database } from '../../firebase';
import {  collection, getDocs, query, doc, getDoc, limit, orderBy,
} from 'firebase/firestore';
import UserContext from '../../UserContext';
import { SDeck } from '../../components/SDeck';

export const Home = () => {
  // User context
  const user = useContext(UserContext)?.user;

  const studyDecks_ref = collection(database, 'users', user.uid, 'study-decks');
  const [user_score, setUsers_score] = useState(0);
  const [studyDecks, setStudyDecks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get user score
  const get_user_score = async () => {
    const user_ref = doc(database, 'users', user.uid);
    const data = await getDoc(user_ref);

    const score = data.data().score;
    //console.log(score)
    setUsers_score(score);
  };

  if (user) {
    get_user_score();
  }

  // Get the 4 most recently created study decks
  useEffect(() => {
    const q = query(studyDecks_ref, orderBy('timestamp', 'desc'), limit(4));
    const getStudyDecks_limit = async () => {
      const data = await getDocs(q);

      setStudyDecks(
        data.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
      setLoading(false);
    };

    getStudyDecks_limit();
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
    <Box>
      <Box>
        <Spacer marginTop={10} />
        <Heading align={'center'} fontSize={'2.5rem'}>
          Home
        </Heading>
        <Text align={'center'} fontSize={'1.5rem'}>
          {' '}
          Overall Score: {user_score}
        </Text>
      </Box>

      <Spacer margin={'100px'} />

      <Text fontSize={'2.5rem'} textAlign={'center'} fontWeight={'bold'}>
        {' '}
        Recently Created Decks{' '}
      </Text>

      <Spacer marginBottom={10} />

      <Flex justifyContent={'center'}>
        {/* Grid of Study Decks */}
        <Grid templateColumns="repeat(4, 1fr)" gap={10}>
          {/* From here on, it's the user's existing study decks */}

          {studyDecks.map(deck => (
            <SDeck key={deck.id} id={deck.id} name={deck.name} />
          ))}
        </Grid>
      </Flex>
      {/* Containder for recent decks idea */}
      <Spacer marginTop={10} />
    </Box>
  );
};

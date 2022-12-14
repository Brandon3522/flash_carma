import React, { useState, useEffect, useContext } from 'react';
import {
Text, Flex, Link,  Button, Box, Image, Spacer,
 keyframes, Spinner, Center, IconButton,
} from '@chakra-ui/react';
import { CloseIcon, CheckIcon } from '@chakra-ui/icons';
import correct from '../../components/images/correctButton.png';
import incorrect from '../../components/images/incorrectButton.png';
import streak1 from '../../components/images/streak_icon.png';
import './Study.css';
import { Link as ReachLink } from 'react-router-dom';
import {getDocs, collection, doc, getDoc, updateDoc,
} from 'firebase/firestore';
import { database } from '../../firebase';
import UserContext from '../../UserContext';

export function Study() {
  // State:
  const [flashcards, setFlashcards] = useState([]);
  const [display_studyDeckName, setDislpay_studyDeckName] = useState('');
  const [loading, setLoading] = useState(true);

  // User context
  const user = useContext(UserContext)?.user;

  var deckid = sessionStorage.getItem('deckid');
  //console.log(deckid)
  const studyDeck_ID = deckid;

  // Database reference:
  const flashcards_ref = collection(
    database,
    'users',
    user.uid,
    'study-decks',
    studyDeck_ID,
    'flashcards'
  );
  const studyDeckName_ref = doc(
    database,
    'users',
    user.uid,
    'study-decks',
    studyDeck_ID
  );
  const user_ref = doc(database, 'users', user.uid);

  //animation to rotate card
  const animation = keyframes`
    from { transform: rotateY(0deg) }

    to { transform: rotateY(180deg) }
  `;
  const rotateAnimation = `${animation} infinite 2s`;

  //card status
  var cardtext; //text currently on the card
  var isFlipped = false; //whether the card is facing front or back
  var cardNumber = 1; //card out of the total
  var totalCard = 5; //card count for specified deck

  //session stats
  var isStreaking = false; //if user has a streak
  var streak = 0; //streak for the session
  var score = 0; //score for the session

  let currentCard = { //card that is currently being studied
    front: '',
    back: '',
  };

  // Get deck name
  useEffect(() => {
    const getStudyDeckName = async () => {
      const data = await getDoc(studyDeckName_ref);

      const name = data.data().name;

      setDislpay_studyDeckName(name);
      //console.log(name);
    };
    getStudyDeckName();
  }, []);

  // Get all flashcards from study deck on page load
  useEffect(() => {
    const getFlashcards = async () => {
      const data = await getDocs(flashcards_ref);

      setFlashcards(
        data.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }))
      );

      setLoading(false);
    };
    getFlashcards();
  }, []);

  //loading screen buffer
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

  let deckName = display_studyDeckName; //name of the study deck
  totalCard = flashcards.length; //updates total to how many entries there are

  if (totalCard === 0) {
    return (
      <>
        <Text fontSize={'4rem'} align="center">
          {' '}
          Study Session{' '}
        </Text>

        <Text fontSize={'2rem'} align="center">
          {' '}
          This deck is empty
        </Text>

        <Text fontSize={'1.5rem'} align="center">
          {' '}
          Please add at least one card to the deck{' '}
        </Text>
        <Center>

          {/* Button to head to edit page */}
          <Link style={{ textDecoration: 'none' }} as={ReachLink} to="/edit">
            <Spacer marginTop={10} />
            <Button
              size={'lg'}
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
            >
              Edit
            </Button>
          </Link>
        </Center>
      </>
    );
  }

  //initializes first card
  currentCard.front = flashcards[0].question;
  currentCard.back = flashcards[0].answer;
  cardtext = currentCard.front;

  function changeCard() {
    //swaps to next card in deck
    currentCard.front = flashcards[cardNumber - 1].question;
    currentCard.back = flashcards[cardNumber - 1].answer;
    cardtext = currentCard.front;
    document.getElementById('cardtext').innerHTML = cardtext;
  }

  function flipCard() {
    //swaps the text on the card to the other value stored
    isFlipped = !isFlipped;
    if (isFlipped === true) {
      cardtext = currentCard.back;
    } else {
      cardtext = currentCard.front;
    }
    document.getElementById('cardtext').innerHTML = cardtext;
  }

  function incorrectAns() {
    //when you click the incorrect buttton
    if (cardNumber <= totalCard) {
      isStreaking = false;
      streak = 0;
      document.getElementById('streak').innerHTML = streak;
      incrementCardCount();
    }
  }

  function correctAns() {
    //when you click the correct button
    if (cardNumber <= totalCard) {
      addPoints();
      document.getElementById('streak').innerHTML = streak;
      document.getElementById('score').innerHTML = 'Score: ' + score;
      incrementCardCount();
    }
  }

  function addPoints() {
    //adds score and streak
    score = score + 100;
    if (isStreaking === false) {
      isStreaking = true;
      streak++;
    } else {
      streak++;
    }
  }

  function incrementCardCount() {
    //increments card count/moves to results page
    cardNumber++;
    if (cardNumber > totalCard) {
      document.getElementById('cardnumber').innerHTML = 'Cards: Complete!';
    } else {
      document.getElementById('cardnumber').innerHTML =
        'Cards: ' + cardNumber + ' / ' + totalCard;
      changeCard();
    }
  }

  function StoreResultsValues() {
    //stores data in user's current session (meant for results)
    if (cardNumber > totalCard) {
      cardNumber = totalCard;
    }

    sessionStorage.setItem('streak', JSON.stringify(streak));
    sessionStorage.setItem('score', JSON.stringify(score));
    sessionStorage.setItem('totalcard', JSON.stringify(totalCard));
    sessionStorage.setItem('cardnumber', JSON.stringify(cardNumber));
  }

  return (
    <>
      <Spacer marginTop={10} />
      {/* title of Study Session page */}
      <Text fontSize={'4rem'} align="center">
        {' '}
        Study Session{' '}
      </Text>

      {/* Displays the number of cards studied out of the total in the deck*/}
      <Flex justifyContent={'center'}>
        <Text fontSize={'1.5rem'} id="cardnumber" marginRight={'500px'}>
          {' '}
          Cards: {cardNumber} / {totalCard}{' '}
        </Text>

        {/* Results button */}
        <Link style={{ textDecoration: 'none' }} as={ReachLink} to="/results">
          <Button onClick={StoreResultsValues} id="endsession">
            {' '}
            End Session{' '}
          </Button>
        </Link>
      </Flex>

      <Box>
        {/* displays deck's name */}
        <Text fontSize={'3rem'} align="center">
          {' '}
          {deckName}{' '}
        </Text>

        {/* displays user's current streak */}

        <Box class="container" align={'center'}>
          {/*Image src={streak1} alt={'streak_symbol'} boxSize={'50px'}/> */}
          <Box fontSize={'30px'} class="streaksymbol" id="streak">
            {' '}
            {streak}{' '}
          </Box>
        </Box>

        {/* displays user's current score */}
        <Text fontSize={'2rem'} align="center" id="score">
          {' '}
          Score: {score}{' '}
        </Text>
      </Box>

      {/* displays a card and the text inside the card */}
      <Flex justifyContent={'center'}>
        <Box id="flashcard" onClick={flipCard}>
          {/*_hover={{ animation: rotateAnimation }}*/}

          <Text
            id="cardtext"
            fontSize={'1.5rem'}
            align="center"
            flexWrap={'wrap'}
            color="black"
          >
            {' '}
            {cardtext}{' '}
          </Text>
        </Box>
      </Flex>

      <Spacer margin={'40px'} />

      <Flex justifyContent={'center'}>
        {/* incorrect */}
        <Box>
          {/*<Image
            height={'200px'}
            width={'300px'}
            marginRight={'20px'}
            objectFit='cover'
            src={incorrect}
            alt='incorrect'
            onClick={incorrectAns} />*/}
          <IconButton
            icon={<CloseIcon boxSize={20} />}
            height={'200px'}
            width={'300px'}
            marginRight={'20px'}
            objectFit="cover"
            src={incorrect}
            alt="incorrect"
            onClick={incorrectAns}
            bg={'red'}
          />
        </Box>

        {/* correct */}
        <Box>
          {/*<Image
            height={'200px'}
            width={'300px'}
            marginLeft={'20px'}
            objectFit='cover'
            src={correct}
            alt='correct'
            onClick={correctAns} />*/}
          <IconButton
            icon={<CheckIcon boxSize={20} />}
            height={'200px'}
            width={'300px'}
            marginRight={'20px'}
            objectFit="cover"
            src={correct}
            alt="correct"
            onClick={correctAns}
            bg={'chartreuse'}
          />
        </Box>
      </Flex>

      <Spacer margin={'40px'} />
    </>
  );
}

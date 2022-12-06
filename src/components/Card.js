import {  Text,  Input,  Button,  Box, Flex, Textarea, EditableTextarea,
} from '@chakra-ui/react';
import { collection, doc, getDoc, addDoc, deleteDoc,
  onSnapshot, updateDoc,
} from 'firebase/firestore';
import { database } from '../firebase';
import UserContext from '../UserContext';
import { Editable, EditableInput, EditablePreview } from '@chakra-ui/react';
import React, { useState, useEffect, useContext } from 'react';

export function Card({ id, front, back, deck, onDelete }) {
  const [frontText, setfrontText] = useState(front);
  const [backText, setbackText] = useState(back);
  const user = useContext(UserContext)?.user;
  const flashcards_ref = doc(
    database,
    'users',
    user.uid,
    'study-decks',
    deck,
    'flashcards',
    id
  );

  function update_cardText() {
    if (trimtext(frontText) === '' || trimtext(backText) === '') {
      setfrontText('Front text');
      setbackText('Back text');
    }

    console.log(frontText);
    console.log(backText);
    updateDoc(flashcards_ref, {
      question: frontText,
      answer: backText,
    })
      .then(() => {
        //alert('Data Updated');
      })
      .catch(err => {
        alert(err.message);
      });
  }

  function trimtext(text) {
    return text.replace(/^\s+|\s+$/g, '');
  }

  return (
    <>
      <Box id="card">
        <Flex justifyContent={'center'}>
          <Box height={250}>
            <Text color="black"> Front Side: </Text>

            {/*<Text id='cardtext' fontSize={"1.5rem"} flex='wrap'
                                                        color='black' width={'500px'}
        overflowWrap='break-word'>   {front} </Text>*/}
            <Editable
              defaultValue={front}
              placeholder="Front text"
              id="cardtext"
              fontSize={'1.5rem'}
              flex="wrap"
              color="black"
              width={'500px'}
              overflowWrap="break-word"
              onSubmit={update_cardText}
              onChange={setfrontText}
              marginTop="1.5"
            >
              <EditablePreview />

              <Textarea maxLength={201} as={EditableTextarea} />
            </Editable>
          </Box>
          <Box height={250}>
            <Text color="black"> Back Side: </Text>
            {/* <Text id='cardtext' fontSize={"1.5rem"} flex='wrap'
                                                        color='black' width={'500px'}
overflowWrap='break-word'> {back} </Text>*/}

            <Editable
              defaultValue={back}
              placeholder="Back text"
              id="cardtext"
              fontSize={'1.5rem'}
              flex="wrap"
              color="black"
              width={'500px'}
              overflowWrap="break-word"
              onSubmit={update_cardText}
              onChange={setbackText}
              marginTop="1.5"
            >
              <EditablePreview />

              <Textarea maxLength={201} as={EditableTextarea} />
            </Editable>
          </Box>
        </Flex>
        <Button
          borderRadius={'5px'}
          margin={'10px'}
          padding={'2px'}
          colorScheme={'red'}
          fontsize={'1.2rem'}
          onClick={() => onDelete(id)}
        >
          {' '}
          Delete Card{' '}
        </Button>
      </Box>
    </>
  );
}

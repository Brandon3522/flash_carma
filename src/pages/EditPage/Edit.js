import React, { useState, useEffect, useContext } from 'react';
import { Text, Heading, Flex, Link, Input, Button, Box, Image, background, Textarea, filter, Spacer, Spinner } from '@chakra-ui/react';
import "./Edit.css";
import { Card } from "../../components/Card.js";
import { stringify } from '@firebase/util';
import {
  getDocs, collection, doc, getDoc, addDoc, deleteDoc, onSnapshot,
  query, where, limit, setDoc, updateDoc
} from 'firebase/firestore';
import { database } from '../../firebase';
import UserContext from '../../UserContext';
import { Editable, EditableInput, EditableTextarea, EditablePreview, } from '@chakra-ui/react'


export function Edit(props) {

  const [cardset, setCards] = useState([]); //array of cards

  // State: 
  const [flashcards, setFlashcards] = useState([]);
  const [display_studyDeckName, setDisplay_studyDeckName] = useState('');
  const [loading, setLoading] = useState(true);
  const [flashcard_question, setFlashcard_question] = useState('');
  const [flashcard_answer, setFlashcard_answer] = useState('');

  // User context
  const user = useContext(UserContext)?.user;

  var deckid = sessionStorage.getItem('deckid')

  // console.log("Deck ID" + deckid)

  //const user = 'f6RoGmfu7uVUC7UBSKO7jQtmc4F2'
  //const studyDeck_ID = 'GDpNJPUaBb9Xhe4fOsbZ'
  const studyDeck_ID = deckid

  // Database reference: 
  const flashcards_ref = collection(database, 'users', user.uid, 'study-decks', studyDeck_ID, 'flashcards');
  const studyDeckName_ref = doc(database, 'users', user.uid, 'study-decks', studyDeck_ID)

  // Get deck name
  useEffect(() => {
    const getStudyDeckName = async () => {
      const data = await getDoc(studyDeckName_ref);

      const name = data.data().name;

      setDisplay_studyDeckName(name);
      console.log(name);
    }
    getStudyDeckName();
  }, [])

  // Get all flashcards from study deck on page load
  useEffect(() => {
    const unsub = onSnapshot(collection(database, 'users', user.uid, 'study-decks', studyDeck_ID, 'flashcards'), (snapshot) => {
      setFlashcards(snapshot.docs.map((doc) => ({
        ...doc.data(), id: doc.id
      })))

      setLoading(false);
    })

    return unsub;
  }, [])

  function update_studyDeckName() {

    if (trimtext(display_studyDeckName) === "") {
      display_studyDeckName = "Deck Name"
    }


    updateDoc(studyDeckName_ref, {
      name: display_studyDeckName,
    })
      .then(() => {
       // alert('Data Updated');
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  //loading screen buffer 
  if (loading) {
    return (
      <Spinner
        position={"fixed"}
        top={"50%"}
        left={"50%"}
        transform={"translate(-50%, 50%)"}
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='#4299e1'
        size='xl'
      />
    )
  }


  const add_flashcard = (f, b) => {
    const ref = collection(database, 'users', user.uid, 'study-decks', studyDeck_ID, 'flashcards');
    addDoc(ref, {
      //question: flashcard_question,
      //answer: flashcard_answer,
      question: f,
      answer: b,
    })
      .then(() => {
        alert('Data Added');
        document.getElementById('TBfront').value = ''
        document.getElementById('TBback').value = ''
        //setFlashcards([ref, ...flashcards])
      })
      .catch((err) => {
        alert(err.message);
      });

    // 

  }

  // const delete_flashcard = async (flashcardName) => {
  //   try {
  //     const q = query(flashcards_ref, where('question', '==', flashcardName), limit(1))
  //     console.log(q)

  //     const docs = await getDocs(q)
  //     var doc_id = ''
  //     docs.forEach((doc) => {
  //       console.log(doc.data())
  //       doc_id = doc.id
  //       console.log(doc_id)
  //     })

  //     const flashcard = doc(database, 'users', user.uid, 'study-decks', studyDeck_ID, 'flashcards', doc_id)

  //     await deleteDoc(flashcard);

  //     console.log('Flashcard deleted successfully');

  //   } catch (error) {
  //     alert(`Deletion unsuccessful: ${error.message}`);
  //   }
  // }

  // Delete flashcard
  const delete_flashcard = async (flashcardID) => {
    try {
      const flashcard = doc(database, 'users', user.uid, 'study-decks', studyDeck_ID, 'flashcards', flashcardID)

      await deleteDoc(flashcard);

      console.log('Flashcard deleted successfully');

    } catch (error) {
      alert(`Deletion unsuccessful: ${error.message}`);
    }
  }

  var deckname = display_studyDeckName

  const addCardToList = (front, back, id) => { //adds a card to list

    const card = {
      front,
      back,
      id
    }
    setCards([card, ...cardset])

  }

  function trimtext(text) {
    return text.replace(/^\s+|\s+$/g, '');
  }

  function getTextToAdd() { //gets texts and prepares it to be added to the card list
    var f = document.getElementById('TBfront').value
    var b = document.getElementById('TBback').value

    if (trimtext(f) == '') //checks if frontside textarea is empty
    {
      alert("Please fill in Front!");
      return false;
    }
    else if (trimtext(b) == '') //checks if backside textarea is empty
    {
      alert("Please fill in Back!");
      return false;
    }
    else
      //addCardToList(f, b);
      //setFlashcard_question(JSON.stringify(f))
      //setFlashcard_answer(JSON.stringify(b))
      //flashcard_question=f;
      //flashcard_answer=b;
      add_flashcard(f, b);
  }


  function deleteCard(id) { //removes a card from list based on id
    setCards(cardset.filter(card => card.id !== id))
  }


  return (
    <>
      <Text fontSize={'4rem'} align='center'> Edit Deck </Text>
      <Flex justifyContent={'center'}>
        <Text fontSize={'2rem'} margin='2'> Deck Name:</Text>

        <Editable defaultValue={deckname} placeholder="Deck name"
          fontSize={'2rem'}
          onSubmit={update_studyDeckName} onChange={setDisplay_studyDeckName}
          marginTop='1.5'
        >
          <EditablePreview />

          <Input maxLength={22} as={EditableInput} />
        </Editable>


      </Flex>

      <Flex justifyContent={'center'}>
        <Box id='textprompt'>
          <Text> Front: </Text> {/*<Textarea id='TBfront'>  </Textarea> */}
          <Input maxLength={201} id='TBfront'
            width={500} />
        </Box>

        <Box id='textprompt'>
          <Text> Back: </Text>
          {/*<Textarea id='TBback'> 
          </Textarea> */}
          <Input maxLength={201} id='TBback'
            width={500} />
        </Box>
      </Flex>



      <Flex justifyContent={'center'}>
        <Button id='newdeck' align={'center'} fontSize={'1.5rem'}
          onClick={getTextToAdd}> Create a new card </Button>
      </Flex>

      <Text fontSize={'2rem'} align={'center'}> Card List: </Text>

      {flashcards.map(card => (
        <Card key={card.id} id={card.id}
          front={card.question} back={card.answer} onDelete={() => { delete_flashcard(card.id) }} />
      ))}
      <Spacer marginTop={10} />
    </>
  );

}
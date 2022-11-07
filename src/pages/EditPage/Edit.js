import React, { useState, useEffect } from 'react';
import { Text, Heading, Flex, Link, Input, Button, Box, Image, background, Textarea, filter } from '@chakra-ui/react';
import "./Edit.css";
import { Card } from "../../components/Card.js";
import { stringify } from '@firebase/util';
import { getDocs, collection, doc, getDoc, addDoc, deleteDoc, onSnapshot,
query, where, limit} from 'firebase/firestore';
import { database } from '../../firebase';



export function Edit(props) {

  const [cardset, setCards] = useState([]); //array of cards

  // State: 
  const [flashcards, setFlashcards] = useState([]);
  const [display_studyDeckName, setDislpay_studyDeckName] = useState('');
  const [loading, setLoading] = useState(true);
  const [flashcard_question, setFlashcard_question] = useState('');
  const [flashcard_answer, setFlashcard_answer] = useState('');


  const userID = 'f6RoGmfu7uVUC7UBSKO7jQtmc4F2'
  const studyDeck_ID = 'GDpNJPUaBb9Xhe4fOsbZ'
  // Database reference: 
  const flashcards_ref = collection(database, 'users', userID, 'study-decks', studyDeck_ID, 'flashcards');
  const studyDeckName_ref = doc(database, 'users', userID, 'study-decks', studyDeck_ID)

  // Get deck name
  useEffect(() => {
    const getStudyDeckName = async () => {
      const data = await getDoc(studyDeckName_ref);

      const name = data.data().name;

      setDislpay_studyDeckName(name);
      console.log(name);
    }
    getStudyDeckName();
  }, [])

  // Get all flashcards from study deck on page load
  useEffect (() => {
    const unsub = onSnapshot(collection(database, 'users', userID, 'study-decks', studyDeck_ID, 'flashcards'), (snapshot) => {
      setFlashcards(snapshot.docs.map((doc) => ({
        ...doc.data(), id: doc.id
      })))

      setLoading(false);
    })

    return unsub;
  }, [])


  //loading screen buffer 
  if (loading) {
    return (
      <Heading textAlign={'center'}>Loading...</Heading>
    )
  }


  const add_flashcard = (f, b) => {
    const ref = collection(database, 'users', userID, 'study-decks', studyDeck_ID, 'flashcards');
    addDoc(ref, {
     //question: flashcard_question,
     //answer: flashcard_answer,
      question: f,
      answer: b,
    })
      .then(() => {
        alert('Data Added');
        //setFlashcards([ref, ...flashcards])
      })
      .catch((err) => {
        alert(err.message);
      });

     // 

  }

  const delete_flashcard = async (flashcardName) => {
    try {
      const q = query(flashcards_ref, where('question', '==', flashcardName), limit(1))
      console.log(q)

      const docs = await getDocs(q)
      var doc_id = ''
      docs.forEach((doc) => {
        console.log(doc.data())
        doc_id = doc.id
        console.log(doc_id)
      })

      const flashcard = doc(database, 'users', userID, 'study-decks', studyDeck_ID, 'flashcards', doc_id)

      await deleteDoc(flashcard);

      console.log('Flashcard deleted successfully');
        
    } catch (error) {
      alert(`Deletion unsuccessful: ${error.message}`);
    }
  }

  var deckname = display_studyDeckName

  const addCardToList = (front, back) => { //adds a card to list

    const card = {
      front,
      back,
      id: Math.random()
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
      <Text align='center' fontSize={'2rem'}> Deck Name: {deckname} </Text>

      <Flex justifyContent={'center'}>
        <Box id='textprompt'>
          <Text> Front: </Text> <Textarea id='TBfront'>  </Textarea>
        </Box>

        <Box id='textprompt'>
          <Text> Back: </Text> <Textarea id='TBback'> </Textarea>
        </Box>
      </Flex>




      <Flex justifyContent={'center'}>
        <Button id='newdeck' align={'center'} fontSize={'1.5rem'}
          onClick={getTextToAdd}> Create a new card </Button>
      </Flex>

      <Text fontSize={'2rem'} align={'center'}> Cards: </Text>

      {flashcards.map(card => (
        <Card key={card.id} id={card.id}
          front={card.question} back={card.answer} onDelete={() => {delete_flashcard(card.question)}} />
      ))}

    </>
  );

}
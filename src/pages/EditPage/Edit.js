import React, { useState, useEffect } from 'react';
import { Text, Heading, Flex, Link, Input, Button, Box, Image, background, Textarea, filter } from '@chakra-ui/react';
import "./Edit.css";
import {Card} from "../../components/Card.js";
import { stringify } from '@firebase/util';
import { getDocs, collection, doc, getDoc } from 'firebase/firestore';
import { database } from '../../firebase';



export function EditPage(props){

  const [cardset, setCards] = useState( [] ); //array of cards
 // State: 
  const [flashcards, setFlashcards] = useState([]);
  const [display_studyDeckName, setDislpay_studyDeckName] = useState('');
  const [loading, setLoading] = useState(true);
  

    const userID = 'f6RoGmfu7uVUC7UBSKO7jQtmc4F2'
    const studyDeck_ID = 'GDpNJPUaBb9Xhe4fOsbZ'
    // Database reference: 
    const flashcards_ref = collection(database,'users',userID,'study-decks',studyDeck_ID,'flashcards');
    const studyDeckName_ref = doc(database, 'users', userID, 'study-decks', studyDeck_ID)

 // Get deck name
 useEffect(() => {
    const getStudyDeckName = async () => {
      const data =  await getDoc(studyDeckName_ref);

      const name = data.data().name;

      setDislpay_studyDeckName(name);
      console.log(name);
    }
    getStudyDeckName();
  }, [])

  // Get all flashcards from study deck on page load
  useEffect(() => {
    const getFlashcards = async () => {
      const data = await getDocs(flashcards_ref);

      setFlashcards(data.docs.map((doc) => ({
        ...doc.data(), id: doc.id
      })))

      data.docs.map((doc) => {
        console.log(doc.data())
      })

      setLoading(false);
    }
    getFlashcards()
  }, [])


//loading screen buffer 
  if (loading) {
    return (
      <Heading textAlign={'center'}>Loading...</Heading>
    )
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

function trimtext(text) 
{ 
    return text.replace(/^\s+|\s+$/g,''); 
}
function getTextToAdd (){ //gets texts and prepares it to be added to the card list
    var f = document.getElementById('TBfront').value 
    var b = document.getElementById('TBback').value

    if(trimtext(f) == '') //checks if frontside textarea is empty
    {      
         alert("Please fill in Front!");
         return false;       
    }
    else if(trimtext(b) == '') //checks if backside textarea is empty
    {      
          alert("Please fill in Back!");
          return false;       
   }
    else
      addCardToList(f, b);

}


function deleteCard(id){ //removes a card from list based on id
    setCards(cardset.filter(card => card.id !== id))
}
    

    
    return(
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

    {cardset.map(card => (
        <Card key={card.id} id={card.id} 
        front={card.front} back={card.back} onDelete ={deleteCard} />
    ))}

    </>
    );

}
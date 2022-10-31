import React, { useState, useEffect } from 'react';
import { Text, Flex, Link, Input, Button, Box, Image, background, Heading } from '@chakra-ui/react';
import correct from "../../components/images/correctButton.png"
import incorrect from "../../components/images/incorrectButton.png"
import "../../components/Study.css"
import { Link as ReachLink } from 'react-router-dom';
import { getDocs, collection, doc, getDoc } from 'firebase/firestore';
import { database } from '../../firebase';


export function StudyPage(props){
  // State: 
  const [flashcards, setFlashcards] = useState([]);
  const [display_studyDeckName, setDislpay_studyDeckName] = useState('');
  const [loading, setLoading] = useState(true);
  

  const userID = 'f6RoGmfu7uVUC7UBSKO7jQtmc4F2'
  const studyDeck_ID = 'GDpNJPUaBb9Xhe4fOsbZ'
  // Database reference: 
  const flashcards_ref = collection(database,'users',userID,'study-decks',studyDeck_ID,'flashcards');
  const studyDeckName_ref = doc(database, 'users', userID, 'study-decks', studyDeck_ID)
  
  
  //card status
  var cardtext; //text currently on the card
  var isFlipped = false; //whether the card is facing front or back
  var cardNumber = 1; //card out of the total
  var totalCard = 5; //card count for specified deck

  //session stats
  var isStreaking = false; //if user has a streak
  var streak = 0; //streak for the session
  var score = 0; //score for the session

  let currentCard = {
    front: "",
    back: ""
  }

  // Get study name
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

   


  //Test Deck
  let deck = {
    deckName: display_studyDeckName,
    cardset: [{
      id: 1,
      front: "Hello",
      back: "World"
    },{
      id: 2,
      front: "The second one",
      back: "Electric boogaloo",
    }]
  }

 

  //initializes first card
  currentCard.front = deck.cardset[0].front
  currentCard.back = deck.cardset[0].back
  cardtext = currentCard.front;

  function changeCard(){ //swaps to next card in deck
    currentCard.front = deck.cardset[cardNumber-1].front
    currentCard.back = deck.cardset[cardNumber-1].back
    cardtext = currentCard.front
    document.getElementById("cardtext").innerHTML = cardtext
  }

  function flipCard(){  //swaps the text on the card to the other value stored
    isFlipped = !isFlipped;
    if(isFlipped === true){
      cardtext= currentCard.back;
    }
    else{
      cardtext= currentCard.front;
    }
    document.getElementById("cardtext").innerHTML = cardtext;
  }

  function incorrectAns(){ //when you click the incorrect buttton
    isStreaking = false;
    streak = 0;
    document.getElementById("streak").innerHTML = streak;
    incrementCardCount();
  }

  function correctAns(){ //when you click the correct button
    addPoints();
    document.getElementById("streak").innerHTML = streak;
    document.getElementById("score").innerHTML = "Score: " + score;
    incrementCardCount();
  }

  function addPoints(){ //adds score and streak
    score = score + 100;
    if(isStreaking === false){
      isStreaking = true;
    }
    else{
      streak++;
    }
  }

  function incrementCardCount(){ //increments card count/moves to results page
    if(cardNumber === totalCard){
      //sessionStorage.setItem('streak', JSON.stringify(streak));
      //sessionStorage.setItem('score', JSON.stringify(score));
     
     
     //Move to results page with streak and score
     
    }
    else{
      cardNumber++;
      document.getElementById('cardnumber').innerHTML = "Cards: " + cardNumber + " / " + totalCard;
      changeCard();
    }
  }

 function StoreResultsValues(){ //stores data in user's current session (meant for results)
   sessionStorage.setItem('streak', JSON.stringify(streak));
   sessionStorage.setItem('score', JSON.stringify(score));
   sessionStorage.setItem('cardnumber', JSON.stringify(cardNumber));
   sessionStorage.setItem('totalcard', JSON.stringify(totalCard));
 }

 sessionStorage.clear()

 if (loading) {
  return (
    <Heading textAlign={'center'}>Loading...</Heading>
  )
}
  
  return(

    <>
      {/* title of Study Session page */}
      <Text fontSize={'4rem'} align='center'> Study Session </Text>

      {/* Displays the number of cards studied out of the total in the deck*/}
      <Flex justifyContent={'center'}>
        <Text fontSize={'1.5rem'} id='cardnumber'> Cards: {cardNumber} / {totalCard} </Text>

        {/* Results button */}
        <Link as={ReachLink} to='/results'>
        <Button onClick={StoreResultsValues} id='endsession'> End Session </Button>
        </Link> 
      </Flex>

      <Box>
       {/* displays deck's name */}
        <Text fontSize={'3rem'} align='center'> {deck.deckName} </Text>

        {/* displays user's current streak */}
        <Text fontSize={'2rem'} align='center'id='streak'> {streak} </Text> 

        {/* displays user's current score */}
        <Text fontSize={'2rem'} align='center' id='score'> Score: {score} </Text>
      </Box>

    {/* displays a card and the text inside the card */}
    <Flex justifyContent={'center'}>
      <Box id='flashcard' onClick={flipCard}>
        <Text id='cardtext' fontSize={'1.5rem'} align='center' flexWrap={'wrap'}> {cardtext} </Text>
      </Box>
    </Flex>
    
    <Flex justifyContent={'center'}>
      {/* incorrect */}
        <Box>
          <Image
            boxSize='500px'
            objectFit='cover'
            src={incorrect}
            alt='incorrect' 
            onClick={incorrectAns}/>
        </Box>

        {/* correct */}
        <Box> 
          <Image
            boxSize='500px'
            objectFit='cover'
            src={correct}
            alt='correct'
            onClick={correctAns}/>
           
        </Box>
      </Flex></>

  );
  


}




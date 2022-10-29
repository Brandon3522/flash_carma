import React, { useState } from 'react';
import { Text, Flex, Link, Input, Button, Box, Image, background, Textarea, filter } from '@chakra-ui/react';
import "../../components/Edit.css";
import {Card} from "../../components/Card.js";
import { stringify } from '@firebase/util';




export function EditPage(props){
    
    var deckname = "Test deck" 

    const [cardset, setCards] = useState( [] ); //array of cards

    

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
         alert("Please Provide Front!");
         return false;       
    }
    else if(trimtext(b) == '') //checks if backside textarea is empty
    {      
          alert("Please Provide Back!");
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
    onClick={getTextToAdd}> Create a new deck </Button>
    </Flex>

    <Text fontSize={'2rem'} align={'center'}> Cards: </Text>

    {cardset.map(card => (
        <Card key={card.id} id={card.id} 
        front={card.front} back={card.back} onDelete ={deleteCard} />
    ))}

    </>
    );

}
import { Text, Flex, Link, Input, Button, Box, Image } from '@chakra-ui/react';

function aquireData(){
    //var streak = sessionStorage.getItem("streak");
    //var score = sessionStorage.getItem("score");

   // streak = JSON.parse(streak);
    //score = JSON.parse(score);
}

   // aquireData();
export function ResultsPage(props){
   
    return(
    <>
    <Text fontSize={'4rem'} align='center'> Results: </Text>
    <Text align='center'> streak </Text>
    <Text align='center'> score: </Text>
    </>
    );

}

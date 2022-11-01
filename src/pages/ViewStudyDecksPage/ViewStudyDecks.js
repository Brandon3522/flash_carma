import React from 'react'
import { Text, Flex, Link, Input, Button, Box, Heading, Spacer, Grid, GridItem, Linkbox, LinkOverlay } from '@chakra-ui/react';

export const Results = () => {

    /*JavaScript goes here*/
    var streak =  sessionStorage.getItem('streak');
 
   return (
    <Flex>
       <h1>Study Decks</h1>

       {/* Grid of Study Decks */}
       <Grid templateColumns='repeats(4, 1fr)' gap={14}>
         {/* Create new study deck button */}
         <LinkOverlay href='#'>
            <GridItem w='100px' h='100px' bg='chartreuse'>

            </GridItem>
         </LinkOverlay>
         
         {/* From here on, it's the user's existing study decks */}
         <LinkOverlay href='#'>
           <GridItem w='100px' h='100px' bg='chartreuse'>Study Deck 1</GridItem>
         </LinkOverlay>

         <LinkOverlay href='#'>
         <GridItem w='100px' h='100px' bg='chartreuse'>Study Deck 2</GridItem>
         </LinkOverlay>

         <LinkOverlay href='#'>
         <GridItem w='100px' h='100px' bg='chartreuse'>Study Deck 3</GridItem>
         </LinkOverlay>

         <LinkOverlay href='#'>
         <GridItem w='100px' h='100px' bg='chartreuse'>Study Deck 4</GridItem>
         </LinkOverlay>
       </Grid>
     </Flex>
   )
 }
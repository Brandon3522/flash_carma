import React from 'react'
import { Text, Flex, Link, Input, Button, Box, Heading, Spacer, Grid, GridItem, 
         Linkbox, LinkOverlay } from '@chakra-ui/react';

export const ViewStudyDecks = () => {

    /*JavaScript goes here*/
 
   return (
    <Flex>
       <Heading as='h2' size='xl'>Study Decks</Heading>

       {/* Grid of Study Decks */}
       <Grid templateColumns='repeats(4, 1fr)' gap={14}>
         {/* Create new study deck button */}
         <Linkbox>
           <LinkOverlay href='#'>
             <GridItem w='100px' h='100px' bg='chartreuse'>Sample text</GridItem>
           </LinkOverlay> 
         </Linkbox>
         
         {/* From here on, it's the user's existing study decks */}
         <Linkbox>
           <LinkOverlay href='#'>
             <GridItem w='100px' h='100px' bg='chartreuse'>Study Deck 1</GridItem>
           </LinkOverlay> 
         </Linkbox>

         <Linkbox>
           <LinkOverlay href='#'>
             <GridItem w='100px' h='100px' bg='chartreuse'>Study Deck 2</GridItem>
           </LinkOverlay> 
         </Linkbox>

         <Linkbox>
           <LinkOverlay href='#'>
             <GridItem w='100px' h='100px' bg='chartreuse'>Study Deck 3</GridItem>
           </LinkOverlay> 
         </Linkbox>

         <Linkbox>
           <LinkOverlay href='#'>
             <GridItem w='100px' h='100px' bg='chartreuse'>Study Deck 4</GridItem>
           </LinkOverlay> 
         </Linkbox>
       </Grid>
     </Flex>
   )
 }
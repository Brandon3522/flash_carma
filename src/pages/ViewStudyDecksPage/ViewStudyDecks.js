import React from 'react'
import { Text, Flex, Link, Input, Button, Box, Heading, Spacer, Grid, GridItem, Linkbox, LinkOverlay } from '@chakra-ui/react';

export const ViewStudyDecks = () => {

    /*JavaScript goes here*/
    var streak =  sessionStorage.getItem('streak');
 
   return (
    <Flex>
       <h1>Study Decks</h1>

       {/* Grid of Study Decks */}
       <Grid templateColumns='repeats(4, 1fr)' gap={14}>
         {/* Create new study deck button */}
         <GridItem w='100px' h='100px' bg='chartreuse'>

         </GridItem>
         
         {/* From here on, it's the user's existing study decks */}
         <GridItem w='100px' h='100px' bg='chartreuse'>

         </GridItem>

         <GridItem w='100px' h='100px' bg='chartreuse'>

         </GridItem>

         <GridItem w='100px' h='100px' bg='chartreuse'>

         </GridItem>
       </Grid>
     </Flex>
   )
 }
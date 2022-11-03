import React from 'react'
import { Text, Flex, Link, Input, Button, Box, Heading, Spacer, Grid, GridItem, 
         LinkBox, LinkOverlay } from '@chakra-ui/react';

export const ViewStudyDecks = () => {
  
        /*JavaScript goes here */
     
        
       return (
        <>
           <Heading as='h3' size='xl'>Study Decks</Heading>
    
           <Spacer marginBottom={10}/>
          <Flex>
           {/* Grid of Study Decks */}
           <Grid templateColumns='repeat(4, 1fr)' gap={10}>
             {/* Create new study deck button */}
             <LinkBox>
               <LinkOverlay href='#'>
                 <GridItem w='100px' h='100px' bg='chartreuse'>Sample text</GridItem>
               </LinkOverlay> 
             </LinkBox>
             
             {/* From here on, it's the user's existing study decks */}
             <LinkBox>
               <LinkOverlay href='#'>
                 <GridItem w='100px' h='100px' bg='chartreuse'>Study Deck 1</GridItem>
               </LinkOverlay> 
             </LinkBox>
    
             <LinkBox>
               <LinkOverlay href='#'>
                 <GridItem w='100px' h='100px' bg='chartreuse'>Study Deck 2</GridItem>
               </LinkOverlay> 
             </LinkBox>
    
             <LinkBox>
               <LinkOverlay href='#'>
                 <GridItem w='100px' h='100px' bg='chartreuse'>Study Deck 3</GridItem>
               </LinkOverlay> 
             </LinkBox>
    
             <LinkBox>
               <LinkOverlay href='#'>
                 <GridItem w='100px' h='100px' bg='chartreuse'>Study Deck 4</GridItem>
               </LinkOverlay> 
             </LinkBox>
           </Grid>
           </Flex>
         </>
       )
     }
    
   return (
    <Flex>
       <Heading as='h3' size='xl'>Study Decks</Heading>

       {/* Grid of Study Decks */}
       <Grid templateColumns='repeat(4, 1fr)' gap={10}>
         {/* Create new study deck button */}
         <LinkBox>
           <LinkOverlay href='#'>
             <GridItem w='100px' h='100px' bg='chartreuse'>Sample text</GridItem>
           </LinkOverlay> 
         </LinkBox>
         
         {/* From here on, it's the user's existing study decks */}
         <LinkBox>
           <LinkOverlay href='#'>
             <GridItem w='100px' h='100px' bg='chartreuse'>Study Deck 1</GridItem>
           </LinkOverlay> 
         </LinkBox>

         <LinkBox>
           <LinkOverlay href='#'>
             <GridItem w='100px' h='100px' bg='chartreuse'>Study Deck 2</GridItem>
           </LinkOverlay> 
         </LinkBox>

         <LinkBox>
           <LinkOverlay href='#'>
             <GridItem w='100px' h='100px' bg='chartreuse'>Study Deck 3</GridItem>
           </LinkOverlay> 
         </LinkBox>

         <LinkBox>
           <LinkOverlay href='#'>
             <GridItem w='100px' h='100px' bg='chartreuse'>Study Deck 4</GridItem>
           </LinkOverlay> 
         </LinkBox>
       </Grid>
     </Flex>
   )
 }
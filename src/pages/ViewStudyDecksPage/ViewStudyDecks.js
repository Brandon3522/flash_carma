import React from 'react'
import {
  Flex, 
  Link, 
  Input, 
  Button,
  ButtonGroup,
  Box, 
  Heading, 
  Spacer, 
  Grid, 
  GridItem, 
  LinkBox, 
  LinkOverlay,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from '@chakra-ui/react';

export const ViewStudyDecks = () => {

        /*JavaScript goes here */
     
        
       return (
        <>
           <Heading as='h3' size='xl'>Study Decks</Heading>
    
    
           <Spacer marginBottom={10}/>
          <Flex>
           {/* Grid of Study Decks */}
           <Grid templateColumns='repeat(4, 1fr)' gap={10}>
             {/* Create new study deck button. MAKE A POPOVER LATER*/}
             <LinkBox>
               <LinkOverlay href='#'>
                 <GridItem w='100px' h='100px' bg='chartreuse'>Create Study Deck</GridItem>
               </LinkOverlay> 
             </LinkBox>
             
             {/* From here on, it's the user's existing study decks */}
             <Popover>
              <PopoverTrigger>
                <Button>Study Deck 1</Button>
              </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                    <ButtonGroup>
                      <Button>Edit</Button>
                      <Button>Study</Button>
                      <Button>Delete</Button>
                    </ButtonGroup>
                  </PopoverBody>
                </PopoverContent>
              </Popover>
    
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
import { Link as ReachLink } from 'react-router-dom';
import {
  Flex, Input, Button, ButtonGroup, Box, Heading, Spacer, Link,
  Grid, GridItem, LinkBox, LinkOverlay, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody,
  PopoverFooter, PopoverArrow, PopoverCloseButton, PopoverAnchor,
} from '@chakra-ui/react';

export function SDeck({ id, name }) {


function getDeckName(id){
    //console.log(id)
  sessionStorage.setItem('deckid', id)
}

  return (
    <>
      <LinkBox>
        <LinkOverlay href='/study'>
          <Button w={[150, 200]} h={200} shadow='md' borderRadius={'lg'}
          onClick={() => getDeckName(id)}> {name} </Button>
        </LinkOverlay>
      </LinkBox>

    </>
  );

}
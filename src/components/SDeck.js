import { Link as ReachLink } from 'react-router-dom';
import {
  Flex, Input, Button, ButtonGroup, Box, Heading, Spacer, Link,
  Grid, GridItem, LinkBox, LinkOverlay, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody,
  PopoverFooter, PopoverArrow, PopoverCloseButton, PopoverAnchor,
} from '@chakra-ui/react';

export function SDeck({ id, name }) {



  return (
    <>
      <LinkBox>
        <LinkOverlay href='/study'>
          <Button w={200} h={200} shadow='md' borderRadius={'lg'}> {name} </Button>
        </LinkOverlay>
      </LinkBox>

    </>
  );

}
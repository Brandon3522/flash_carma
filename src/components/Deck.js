import { Link as ReachLink } from 'react-router-dom';
import {
    Flex, Input, Button, ButtonGroup, Box, Heading, Spacer, Link,
    Grid, GridItem, LinkBox, LinkOverlay, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody,
    PopoverFooter, PopoverArrow, PopoverCloseButton, PopoverAnchor,
} from '@chakra-ui/react';

export function Deck({ id, name, onDelete }) {

function getDeckName(id){
    //console.log(id)
sessionStorage.setItem('deckid', id)
}


    return (
        <>
            <Popover>
                <PopoverTrigger>
                    <Button w={200} h={200} shadow='md' borderRadius={'lg'}> {name} </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>
                        <ButtonGroup display={'flex'} flexWrap={'wrap'} spacing='6'>
                            <Link as={ReachLink} to='/edit'>
                                <Button onClick={() => getDeckName(id)} >Edit</Button>
                            </Link>

                            <Link as={ReachLink} to='/study'>
                                <Button onClick={() => getDeckName(id)} >Study</Button>
                            </Link>

                            <Button colorScheme='red' onClick={() => onDelete(id)}>Delete</Button>
                        </ButtonGroup>
                    </PopoverBody>
                </PopoverContent>
            </Popover>


        </>
    );

}
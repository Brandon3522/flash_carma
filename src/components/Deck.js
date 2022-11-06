import { Link as ReachLink } from 'react-router-dom';
import {
    Flex, Input, Button, ButtonGroup, Box, Heading, Spacer, Link,
    Grid, GridItem, LinkBox, LinkOverlay, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody,
    PopoverFooter, PopoverArrow, PopoverCloseButton, PopoverAnchor,
  } from '@chakra-ui/react';

export function Deck({ id, name, onDelete }) {



    return (
        <>
            <Popover>
                <PopoverTrigger>
                    <Button w={100} h={100}> {name} </Button>
                </PopoverTrigger>
                <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>
                        <ButtonGroup display={'flex'} flexWrap={'wrap'} spacing='6'>
                            <Link as={ReachLink} to='/edit'>
                                <Button>Edit</Button>
                            </Link>

                            <Link as={ReachLink} to='/study'>
                                <Button>Study</Button>
                            </Link>

                            <Button colorScheme='red' onClick={() => onDelete(id)}>Delete</Button>
                        </ButtonGroup>
                    </PopoverBody>
                </PopoverContent>
            </Popover>


        </>
    );

}
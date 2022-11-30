import { Link as ReachLink } from 'react-router-dom';
import {
    Button, 
    ButtonGroup, 
    Link,
    Popover, 
    PopoverTrigger, 
    PopoverContent, 
    PopoverBody,
    PopoverArrow, 
    PopoverCloseButton, 
    Modal, 
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react';
import React from 'react';

export function Deck({ id, name, onDelete }) {

const { isOpen, onOpen, onClose } = useDisclosure();
const initialRef = React.useRef(null)

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

                            <Button colorScheme='red' onClick={onOpen}>Delete</Button>

                            <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Are You Sure You Want To Delete This Deck?</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalFooter>
                                        <ButtonGroup>
                                            <Button colorScheme='red' onClick={() => onDelete(id)}>Yes</Button>
                                            <Button onClick={onClose}>No</Button>
                                        </ButtonGroup>
                                    </ModalFooter>
                                </ModalContent>

                                
                            </Modal>
                        </ButtonGroup>
                    </PopoverBody>
                </PopoverContent>
            </Popover>


        </>
    );

}
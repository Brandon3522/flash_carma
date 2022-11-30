import { Text, Button, Box, Flex } from '@chakra-ui/react';

export function Card({ id, front, back, onDelete }) {
        return (
                <>
                        <Box id='card'>
                                <Flex justifyContent={'center'}>
                                        <Box height={250}>
                                                <Text color='black'> Front Side: </Text>

                                                <Text id='cardtext' fontSize={"1.5rem"} flex='wrap'
                                                        color='black' width={'500px'}
                                                        overflowWrap='break-word'>   {front} </Text>


                                        </Box>
                                        <Box height={250}>
                                                <Text color='black'> Back Side: </Text>
                                                <Text id='cardtext' fontSize={"1.5rem"} flex='wrap'
                                                        color='black' width={'500px'}
                                                        overflowWrap='break-word'> {back} </Text>
                                        </Box>

                                </Flex>
                                <Button borderRadius={'5px'} margin={'10px'} padding={'2px'}
                                        colorScheme={'red'} fontsize={"1.2rem"}
                                        onClick={() => onDelete(id)}> Delete Card </Button>
                        </Box>

                </>
        );

}
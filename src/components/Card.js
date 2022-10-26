import { Text, Button, Box } from '@chakra-ui/react';

export function Card({id, front, back, onDelete}){



    return(
        <>
        <Box id='card'>

        <Text id='cardtext' fontSize = {"1.5rem"} flex='wrap'> Front side: {front} </Text> 

        <Text id='cardtext' fontSize= {"1.5rem"} flex='wrap'> Back side: {back} </Text>

        <Button id='deletebutton'fontsize={"1.2rem"} onClick={() => onDelete(id)}> Delete Card </Button>
        </Box>

        </>
    );

    }
import { Button, LinkBox, LinkOverlay } from '@chakra-ui/react';

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
import React, { useState } from 'react';
import { Switch, Flex, Link, Input, Button, Box, Image } from '@chakra-ui/react';
import logo from './images/logo.png'
import { Link as ReachLink } from 'react-router-dom';

function Navbar() {
  const [display, changeDisplay] = useState('none')
  return (
    <Flex>
      <Flex
        position='fixed'
        top='1rem'
        right='1rem'
        align='center'
      >
        <Flex display={['none', 'none', 'flex', 'flex']}>
          <Link as={ReachLink} to='/home'>
            <Button
              as='a'
              variant='ghost'
              aria-label='home'
              my={5}
              w='100%'>
                Home
            </Button>
          </Link>

          <Link as={ReachLink} to='/viewdeck'>
            <Button
              as='a'
              variant='ghost'
              aria-label='home'
              my={5}
              w='100%'>
                View Study Decks
            </Button>
          </Link>

          {/* page not made yet
          <Link as={ReachLink} to='/study'>
            <Button
              as='a'
              variant='ghost'
              aria-label='home'
              my={5}
              w='100%'>
                Study Session
            </Button>
          </Link>
          */}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Navbar;
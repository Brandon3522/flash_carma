import React, { useState } from 'react';
import { Switch, Flex, Link, Input, Button, Box, Image } from '@chakra-ui/react';
import logo from './images/logo.png'
import { Link as ReachLink } from 'react-router-dom';

function Navbar() {
  const [display, changeDisplay] = useState('none')

  const [scroll, setScroll] = useState(false);

  const changeScroll = () =>
    document.body.scrollTop > 80 || document.documentElement.scrollTop > 80
      ? setScroll(true)
      : setScroll(false);

  window.addEventListener('scroll', changeScroll);
  return (
    <Flex>
      <Flex
        h="10vh"
        alignItems="center"
        p="6"
        boxShadow={scroll ? 'base' : 'none'}
        position="sticky"
        top="0"
        zIndex="sticky"
        w="full"
        backgroundColor="grey"
        color="white"
        fontSize="large"
        justifyContent="space-between"
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

          {/* todo: make icon
          <Link as={ReachLink} to='\settings'>
            <Button
              as='a'
              variant='ghost'
              aria-label='home'
              my={5}
              w='100%'>
                settings
            </Button>
          </Link>
          */}

          {/* todo: make icon
          <Link as={ReachLink} to='\profile'>
            <Button
              as='a'
              variant='ghost'
              aria-label='home'
              my={5}
              w='100%'>
                profile
            </Button>
          </Link>
          */}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Navbar;
import React, { useState } from 'react';
import { Text, Flex, Link, Input, Button, Box, Image } from '@chakra-ui/react';
import logo from './images/logo.png';
import { Link as ReachLink } from 'react-router-dom';

function Navbar() {
  const [scroll, setScroll] = useState(false);

  const changeScroll = () =>
    document.body.scrollTop > 80 || document.documentElement.scrollTop > 80
      ? setScroll(true)
      : setScroll(false);

  window.addEventListener('scroll', changeScroll);

  return (
    <Box>
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
        <Link as={ReachLink} to="/home">
          <Image
            src={logo}
            // objectFit="cover"
            mt={'8'}
            ml={'-10'}
          />
        </Link>

        {/* Add links */}
        <Link mr="10">View Study Decks</Link>
        <Link>Study Session</Link>

        <Flex>
          <Input
            placeholder="Search"
            backgroundColor="white"
            textColor="grey"
            ml="10"
            size="md"
            htmlSize={40}
            width="auto"
          ></Input>
          <Button fontSize="large" ml="3" color="white" variant="link">
            Search
          </Button>
        </Flex>

        {/* Add links */}
        <Flex>
          <Link mr="10">Settings</Link>
          <Link>Profile</Link>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Navbar;

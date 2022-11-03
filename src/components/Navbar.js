import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useColorModeValue,
  Stack,
  MenuDivider,
  Image,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import profile from './images/profile_img.png'
import { ColorModeSwitcher } from './ColorModeSwitcher';
import {Link as ReachLink} from 'react-router-dom'
import logo from './images/logo.png'

const Links = [{name: 'View Study Decks', href: '/view'}, {name: 'Study Session', href: '/study'}];

const NavLink = ({children, href}) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={href}>
        {children}
    </Link>
)

export default function Simple() {
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    return (
      <>
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
          <Flex h={'100px'} alignItems={'center'} justifyContent={'space-between'}>
            <IconButton
              size={'md'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={'center'}>
              <Box>
                <Link as={ReachLink} to='/home'>
                 <Image src={logo} width='200px' height={'100px'}/>
                </Link>
              </Box>
              <HStack
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}>
                {Links.map((link) => (
                  <NavLink key={link.name} href={link.href}>{link.name}</NavLink>
                ))}
              </HStack>
            </HStack>
            <Flex alignItems={'center'}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={
                      profile
                    }
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <Link as={ReachLink} to='/settings'>Settings</Link>
                  </MenuItem>
                  <MenuItem>Link 2</MenuItem>
                  <MenuDivider />
                  <ColorModeSwitcher /> Dark Mode
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
  
          {isOpen ? (
            <Box pb={4} display={{ md: 'none' }}>
              <Stack as={'nav'} spacing={4}>
                {Links.map((link) => (
                  <NavLink key={link.name} href={link.href}>{link.name}</NavLink>
                ))}
              </Stack>
            </Box>
          ) : null}
        </Box>
      </>
    );
  }
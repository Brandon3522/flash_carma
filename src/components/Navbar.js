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
  Text
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import profile from './images/profile_img.png'
import { ColorModeSwitcher } from './ColorModeSwitcher';
import {Link as ReachLink, useNavigate} from 'react-router-dom'
import logo from './images/logo.png'
import { signOut } from 'firebase/auth';
import { auth, database } from '../firebase';
import { getDoc, doc } from 'firebase/firestore';
import UserContext from '../UserContext';
import { useContext, useState, useEffect } from 'react';

const Links = [{name: 'View Study Decks', href: '/viewstudydecks'}, {name: 'Study Session', href: '/studydeckselection'}];

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
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    // User context
    const user = useContext(UserContext)?.user;

    // User reference
    const user_ref = doc(database, 'users', user.uid);

    // Get username
    useEffect(() => {
      const getUsername = async () => {
        try {
          const data = await getDoc(user_ref);
  
          setUsername(data.data().username)
          console.log(data.data().username)
        } catch (error) {
          console.log(error.message);
        }
      }
  
      getUsername();      
    }, [])

    // Logout current authenticated user
    const logout = () => {
      signOut(auth)
        .then(() => {
          // navigate to login page
          alert('Logout successful')
          navigate('/')
        }).catch((error) => {
          console.log(error.message);
        });
    }
  
    return (
      <>
        <Box bg={useColorModeValue('white')} px={4} shadow='sm'>
          <Flex h={'100px'} alignItems={'center'} justifyContent={'space-between'}>
            <IconButton
              size={'md'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={'center'}>
              <Box pl={-10}>
                <Link as={ReachLink} to='/home'>
                 <Image  src={logo} width='200px' height={'100px'}/>
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
              <Text
                pr={5}>
                Hello, {username ? username: null}
              </Text>
              <Menu>
                <MenuButton
                  marginRight={'30px'}
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    bg='teal'
                    border='black'
                    borderStyle={'solid'}
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <Link as={ReachLink} to='/settings'>Settings</Link>
                  </MenuItem>
                  <MenuItem>
                    <Button variant={'link'} onClick={logout}>Logout</Button>
                  </MenuItem>
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
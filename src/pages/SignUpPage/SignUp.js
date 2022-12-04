import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
  } from '@chakra-ui/react';
  import { useState } from 'react';
  import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
  import { Link as ReachLink, useNavigate } from 'react-router-dom';
  import { auth } from '../../firebase';
  import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
  import { setDoc, doc } from 'firebase/firestore';
  import { database } from '../../firebase';
  
  export const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [score, setScore] = useState(0);

    const navigate = useNavigate();

    // Add user to the database
    function add_user(auth) {
      const user_ref = doc(database, 'users', auth.user.uid)

      setDoc(user_ref, {
          username: username,
          email: email,
          score: score
      })
          .then(() => {
              //alert('Data Added');
          })
          .catch((err) => {
              alert(err.message);
          });
    };

    // Register user
    const register = (e) => {
      e.preventDefault(); // Prevent entire page refresh

      // Firebase registration
      createUserWithEmailAndPassword(auth, email, password)
        .then((auth) => {
          if (auth) {
            // Create user in database
            add_user(auth);
            
            //alert('Registration successful')
            navigate('/')
          }
        })
        .catch((error) => alert(error.message))
    }

    
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'} textAlign={'center'}>
              Sign up
            </Heading>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <HStack>
                <FormControl id="firstName" isRequired>
                  <FormLabel>User Name</FormLabel>
                  <Input type="text" onChange={e => setUsername(e.target.value)}/>
                </FormControl>
              </HStack>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" onChange={e => setEmail(e.target.value)}/>
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} onChange={e => setPassword(e.target.value)} />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }>
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  onClick={register}
                  loadingText="Submitting"
                  size="lg"
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}>
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Already a user? <Link color={'blue.400'} as={ReachLink} to='/'>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }

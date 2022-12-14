import React, { useEffect } from 'react';
import { Heading,  Box, Spacer, FormControl,
  FormLabel, Input, Stack, Button, Flex,
  Spinner, InputGroup, InputRightElement,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, database } from '../../firebase';
import { updatePassword } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import UserContext from '../../UserContext';

export const Settings = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // User context
  const user = useContext(UserContext)?.user;

  // User reference
  const user_ref = doc(database, 'users', user.uid);

  const navigate = useNavigate();

  // Get username
  useEffect(() => {
    const getUsername = async () => {
      try {
        const data = await getDoc(user_ref);

        setUsername(data.data().username);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };

    getUsername();
  }, []);

  // Update Auth password
  const updateAuthPassword = () => {
    updatePassword(auth.currentUser, password)
      .then(() => {
        alert('Password updated successfully');
      })
      .catch(error => {
        // Add message for re-authentication
        alert(
          'Error! Press the Re-authenticate button to authenticate a password change.'
        );
      });
  };

  // Update database username
  const updateUsername = async () => {
    try {
      await updateDoc(user_ref, {
        username: username,
      });
      //console.log('Username updated');
    } catch (error) {
      console.log(error.message);
    }
  };

  // Update username onclick
  const updateUserUsername = () => {
    if (username.length > 0 && username.trim() !== '') {
      console.log(username.trim());
      updateUsername();
    } else {
      alert('Please enter a valid username.');
    }
  };

  // Update password onclick
  const updateUserPassword = () => {
    if (password.length > 0 && password.trim() !== '') {
      updateAuthPassword();
    } else {
      alert('Please enter a valid password.');
    }
  };

  // Navigate to login page
  const reauthenticate = () => {
    alert('Redirecting to login');
    navigate('/');
  };

  if (loading) {
    return (
      <Spinner
        position={'fixed'}
        top={'50%'}
        left={'50%'}
        transform={'translate(-50%, 50%)'}
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="#4299e1"
        size="xl"
      />
    );
  }

  return (
    <Box>
      <Spacer marginTop={10} />
      <Heading as="h3" size="xl" textAlign={'center'}>
        Settings
      </Heading>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <FormControl id="username">
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </FormControl>
        <Button
          onClick={updateUserUsername}
          w={200}
          bg={'blue.400'}
          color={'white'}
          _hover={{
            bg: 'blue.500',
          }}
        >
          Update Username
        </Button>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              onChange={e => setPassword(e.target.value)}
            />
            <InputRightElement h={'full'}>
              <Button
                variant={'ghost'}
                onClick={() => setShowPassword(showPassword => !showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Flex>
          <Button
            onClick={updateUserPassword}
            w={200}
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}
          >
            Update Password
          </Button>
          <Button
            onClick={reauthenticate}
            w={200}
            bg={'blue.400'}
            color={'white'}
            marginLeft={'auto'}
            _hover={{
              bg: 'blue.500',
            }}
          >
            Re-authenticate
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};

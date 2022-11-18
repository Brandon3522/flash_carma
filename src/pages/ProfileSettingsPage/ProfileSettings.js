import React, { useEffect } from 'react'
import { Heading, Text, Box, Spacer, RangeSliderThumb, FormControl, FormLabel, Input, Stack, Button, Flex } from '@chakra-ui/react'
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, database } from '../../firebase';
import { updateEmail, updatePassword } from "firebase/auth";
import { collection, getDocs, query, where, doc, getDoc, updateDoc } from 'firebase/firestore';
import UserContext from '../../UserContext';

export const Settings = () =>{
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  // User context
  const user = useContext(UserContext)?.user;

  // User reference
  const user_ref = doc(database, 'users', user.uid);

  const navigate = useNavigate();

  // Get username and email
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

    const getEmail = async () => {
      try {
        const data = await getDoc(user_ref);

        setEmail(data.data().email)
        console.log(data.data().email)

        setLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    }

    getUsername();
    getEmail();
    
  }, [])

  // Update Auth email
  const updateAuthEmail = () => {
    updateEmail(auth.currentUser, email).then(() => {
      console.log(auth.currentUser)
      alert("Email updated successfully");
      console.log(auth.currentUser)
      console.log(email);
      console.log(`Auth email after: ${auth.currentUser.email}`)
    }).catch((error) => {
      alert(error.message);
    });
  }

  // Update Auth password
  const updateAuthPassword = () => {
    updatePassword(auth.currentUser, password).then(() => {
      alert('Password updated successfully');
    }).catch((error) => {
      // Add message for re-authentication
      alert("Error! Press the Re-authenticate button to authenticate a password change.");
    });
  }

  // Update database email
  const updateEmail = async () => {
    try {
      await updateDoc(user_ref, {
        email: email
      })
      console.log('Email updated');
    } catch (error) {
      console.log(error.message);
    }
  }

  // Update database password
  const updatePassowrd = async () => {
    try {
      await updateDoc(user_ref, {
        password: password
      })
      console.log('Password updated');
    } catch (error) {
      console.log(error.message);
    }
  }

  // Update database username
  const updateUsername = async () => {
    try {
      await updateDoc(user_ref, {
        username: username
      })
      console.log('Username updated');
    } catch (error) {
      console.log(error.message);
    }
  }

  // Update username onclick
  const updateUserUsername = () => {
    if (username.length > 0 && username.trim() != '') {
      console.log(username.trim())
      updateUsername();
    }
    else {
      alert('PLease enter a valid username.')
    }
  }

  // Update email onclick
  const updateUserEmail = () => {
    if (email.length > 0 && email.trim() != '') {
      updateEmail();
      updateAuthEmail();
    }
    else {
      alert('PLease enter a valid email.')
    }
  }

  // Update password onclick
  const updateUserPassword = () => {
    if (password.length > 0 
        && password.trim() != '') {
      updatePassowrd();
      updateAuthPassword();
    }
    else {
      alert('PLease enter a valid password.')
    }
  }

  // Navigate to login page
  const reauthenticate = () => {
    alert('Redirecting to login');
    navigate('/');
  }

  if (loading) {
    return (
      <Box>
        <Heading textAlign={'center'}>Loading...</Heading>
      </Box>
    )
    }

  return (
    <Box>
      <Spacer marginTop={10} />
      <Heading as='h3' size='xl' textAlign={'center'}>Settings</Heading>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <FormControl id="username" >
          <FormLabel>Username</FormLabel>
          <Input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
        </FormControl>
        <Button
          onClick={updateUserUsername}
          size="lg"
          w={150}
          bg={'blue.400'}
          color={'white'}
          _hover={{
            bg: 'blue.500',
          }}>
          Update Username
        </Button>
        <FormControl id="email" >
          <FormLabel>Email Address</FormLabel>
          <Input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
        </FormControl>
        <Button
          onClick={updateUserEmail}
          size="lg"
          w={150}
          bg={'blue.400'}
          color={'white'}
          _hover={{
            bg: 'blue.500',
          }}>
          Update Email
        </Button>
        <FormControl id="password" >
          <FormLabel>Password</FormLabel>
          <Input type="text" placeholder={'Change Password'} onChange={e => setPassword(e.target.value)}/>
        </FormControl>
        <Flex>
          <Button
            onClick={updateUserPassword}
            size="lg"
            w={150}
            bg={'blue.400'}
            color={'white'}
            _hover={{
              bg: 'blue.500',
            }}>
            Update Password
          </Button>
          <Button
            onClick={reauthenticate}
            size="lg"
            w={150}
            bg={'blue.400'}
            color={'white'}
            marginLeft={'auto'}
            _hover={{
              bg: 'blue.500',
            }}>
            Re-authenticate
          </Button>
        </Flex>  
      </Stack> 
    </Box>
  )
}
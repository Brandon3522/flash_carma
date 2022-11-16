import React, { useEffect } from 'react'
import { Heading, Text, Box, Spacer, RangeSliderThumb, FormControl, FormLabel, Input, Stack, Button } from '@chakra-ui/react'
import { useState, useContext } from 'react';
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


  // const get_user = async () => {
  //   const user_ref = doc(database, 'users', user.uid);
  //   const data =  await getDoc(user_ref);
    
  //   setLoading(false);
    
  // }

  // Update Auth email
  const updateAuthEmail = () => {
    updateEmail(auth.currentUser, email).then(() => {
      alert("Email updated successfully");
      alert(email)
      console.log(email);
    }).catch((error) => {
      alert(error.message);
    });
  }

  const updateAuthPassword = () => {
    updatePassword(auth.currentUser, password).then(() => {
      alert('Password updated successfully');
    }).catch((error) => {
      alert(error.message);
    });
  }

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

  const updateUser = () => {
    updateUsername();

    updateEmail();

    updateAuthEmail();

    updateAuthPassword();

  }

  if (loading) {
    return (
      <Box>
        <Heading textAlign={'center'}>Loading...</Heading>
      </Box>
    )
    }
  //   if (user != null) {
  //     get_user()
  
      
  //   }

  return (
    <Box>
      <Spacer marginTop={10} />
      <Heading as='h3' size='xl' textAlign={'center'}>Settings</Heading>
      <Heading>{username}</Heading>
      <Text>Current User ID: {user.uid}</Text>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <FormControl id="username" >
          <FormLabel>User Name</FormLabel>
          <Input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
        </FormControl>
        <FormControl id="email" >
          <FormLabel>Email Address</FormLabel>
          <Input type="text" value={email} onChange={e => setEmail(e.target.value)}/>
        </FormControl>
        <FormControl id="password" >
          <FormLabel>Password</FormLabel>
          <Input type="text" value={password} onChange={e => setPassword(e.target.value)}/>
        </FormControl>
        <Button
          onClick={updateUser}
          loadingText="Submitting"
          size="lg"
          w={150}
          bg={'blue.400'}
          color={'white'}
          _hover={{
            bg: 'blue.500',
          }}>
          Update
        </Button>
      </Stack>
      
    </Box>
  )
}
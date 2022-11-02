import React from 'react'
import { Heading, Text, Box, Spacer, RangeSliderThumb } from '@chakra-ui/react'
import { useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, database } from '../../firebase';
import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';

export const Settings = () =>{
    const [user, loading, error] = useAuthState(auth);
    const [username] = useState('');

    const get_user = async () => {
        const user_ref = doc(database, 'users', user.uid);
        const data =  await getDoc(user_ref);

        if (loading) {
            return (
              <Box>
                <Heading>Loading...</Heading>
              </Box>
            )
          }
          if (error) {
            <Box>
              <Heading>Error!</Heading>
            </Box>
          }
          if (user) {
            get_user()
        
            
          }
    }

    return (
        <Box>
          <Box>
            <Heading>Settings</Heading>
            <Heading>{username}</Heading>
            <Text>Current User ID: {user.uid}</Text>
          </Box>
        </Box>
      )
}
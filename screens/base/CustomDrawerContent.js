import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer';
import  Icon  from 'react-native-vector-icons/FontAwesome';
import { useAuthStore } from '../../src/store/auth';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../../src/store/authApi';

const CustomDrawerContent = ({...props}) => {
  const navigation = useNavigation();  
   // Handle Logout
   const handleLogout = () => {
    // Call Zustand's clearUser function to clear user data
    // useAuthStore.getState().clearUser();
    logout();
    // Navigate to the Login screen after clearing the user data
    navigation.replace('Login');  // Replace 'Login' with your actual login screen name
  };
  return (
    <DrawerContentScrollView {...props}>

        <DrawerItemList {...props} />
         {/* Logout Button */}
         <DrawerItem
          label="Logout"
          icon={() => <Icon name="sign-out" size={20} color="purple" />}
          onPress={handleLogout}
        />
   
    </DrawerContentScrollView>
  );
};




export default CustomDrawerContent;

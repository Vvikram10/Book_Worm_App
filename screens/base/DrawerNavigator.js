import React, { useEffect, useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import  Icon  from 'react-native-vector-icons/FontAwesome';

import CustomDrawerContent from './CustomDrawerContent'; // Custom Drawer content (Optional)
import BooksScreen from './BookScreen';
import AddBook from '../books/AddBook';
import BookList from '../books/BookList';
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {

  return (
 
      <Drawer.Navigator
        initialRouteName="Books"
        screenOptions={{headerStyle:{backgroundColor:'lightyellow'},
    drawerActiveBackgroundColor:'lightyellow',
drawerActiveTintColor:'black',drawerInactiveTintColor:'black',
drawerStyle:{
    backgroundColor:'lightgray',
    
}}}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="Books"
          component={BookList}
          options={{
            headerTitle:'Dashboard',
            drawerLabel:'Dashboard',
            drawerIcon: props => (
              // Custom color and size
              <Icon name="book" color={'purple'} size={20} />
            ),
          }}
        />
        <Drawer.Screen
          name="AddBook"
          component={AddBook}
          options={{drawerIcon: props => (
            // Custom color and size
            <Icon name="plus" color={'purple'} size={20} />
          ),}}
        />
      </Drawer.Navigator>
    
  );
};

export default DrawerNavigator;

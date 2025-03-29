import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { TailwindProvider } from 'tailwindcss-react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/base/Home';
import GlobalStyle from './src/style/GlobalStyle';
import Login from './screens/auth/Login';
import Register from './screens/auth/Register';
import Main from './screens/base/Main';
import DrawerNavigator from './screens/base/DrawerNavigator';
import BookDetails from './screens/books/BookDetails';
import EditBook from './screens/books/EditBook';
import UpdateBook from './screens/books/UpdateBook';
import Footer from './screens/base/Footer';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
  <SafeAreaView style={GlobalStyle.droidSafeArea}>
    <TailwindProvider>
      {/* <Provider store={store}> */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen   name="Home" component={Home} options={{headerShown:false}} />
          <Stack.Screen   name="Main" component={Main} options={{headerShown:false}} />
          <Stack.Screen   name="Login" component={Login} options={{headerShown:false}} />
          <Stack.Screen   name="Register" component={Register} options={{headerShown:false}} />
          <Stack.Screen   name="BookDetails" component={BookDetails} options={{headerShown:false}} />
          <Stack.Screen   name="UpdateBook" component={UpdateBook} options={{headerShown:false}} />
          <Stack.Screen   name="Footer" component={Footer} options={{headerShown:false}} />
          <Stack.Screen   name="DrawerNavigator" component={DrawerNavigator} options={{headerShown:false}} />
        </Stack.Navigator>
      </NavigationContainer>
      {/* </Provider> */}
    </TailwindProvider>
  </SafeAreaView>
  );
}



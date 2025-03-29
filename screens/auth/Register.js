import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { images } from '../../assets/images/images';
import { useNavigation } from '@react-navigation/native';
import { register } from '../../src/store/authApi';
import  Icon  from 'react-native-vector-icons/Feather';

const Register = () => {
  const navigation = useNavigation();
  
  // State to manage input fields
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  

  const handleRegister = async () => {
    setLoading(true);
    const { data, error } = await register(username, email, password); // Call the register function
    
    if (error) {
      setError(error); // Set error message if registration fails
    } else {
      setUsername('');
      setEmail('');
      setPassword('');
      navigation.navigate('Login'); // Navigate to the main screen after successful registration
    }
    setLoading(false);
  };

  return (
        <ScrollView showsVerticalScrollIndicator={false} verticle className='flex-1 bg-sky-900'>
          <View className="mx-3 py-4 items-center">

            <Image className="h-[50] w-[50] mb-2"
            source={images.login}
            />
            {/* Welcome Text */}
            <Text className="text-white text-center rounded-md p-4 font-bold text-lg">
            Create Your Account Here
            </Text>
          </View>

          <View className="flex-1 justify-center mx-3 py-1">
            {/* Name Input */}
            <TextInput
              className="bg-white font-medium p-4 rounded-md mx-1 my-2 border"
              placeholder="Enter Your Username"
              value={username}
              onChangeText={setUsername}
            />
            {/* Email Input */}
            <TextInput
              className="bg-white font-medium p-4 rounded-md mx-1 my-2 border"
              placeholder="Enter Your Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
                />

            {/* Password Input */}
            {/* <TextInput
              className="bg-white font-medium p-4 rounded-md mx-1 my-2 border"
              placeholder="Enter Your Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            /> */}
            
           <View className='flex-row items-center relative'>
                         {/* Password Input */}
              <TextInput
                className="bg-white font-medium p-4 rounded-md mx-1 my-2 border flex-1"
                placeholder="Enter Your Password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className='absolute right-3 transform -translate-y-1/2'>
                <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color="gray" /> 
               </TouchableOpacity>
              </View>

            {/* Login Button */}
            <TouchableOpacity onPress={handleRegister}>
              <Text className="bg-green-200 text-center text-lg p-3 mx-1 mt-3 rounded-md">
              {loading ? <ActivityIndicator color="#fff" /> : 'Register'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
              <Text className="text-center text-base text-white p-2 mx-1 mt-2 rounded-md">
                Already have an account ? Login
              </Text>
            </TouchableOpacity>
            {error && <Text>{error}</Text>}
            
          </View>
        </ScrollView>
 
  );
};

export default Register;

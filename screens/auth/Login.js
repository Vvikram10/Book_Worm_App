import { View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Image, ActivityIndicator, Button } from 'react-native';
import React, { useState } from 'react';
import { images } from '../../assets/images/images';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../../src/store/auth';
import { login } from '../../src/store/authApi';
import  Icon  from 'react-native-vector-icons/Feather';
const Login = () => {
  const navigation = useNavigation();
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState('');
  const { setUser, setLoading, loading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin= async() =>{
    setLoading(true);
    const {data,error} = await login(username,password);
    if (error){
      setError(error)
    }else{
      setUsername('');
      setPassword('');
      setUser(data.user, data.access, data.refresh);
      navigation.navigate('DrawerNavigator')
    }
    setLoading(false)

  };
  

  return (
        <ScrollView showsVerticalScrollIndicator={false} verticle className='flex-1 bg-sky-900'>
          <View className="mx-3 py-4 items-center">

            <Image className="h-[50] w-[50] mb-2"
            source={images.login}
            />
            {/* Welcome Text */}
            <Text className="text-white text-center rounded-md p-4 font-bold text-lg">
            Please Login Here
            </Text>
          </View>

          <View className="flex-1 justify-center mx-3 py-4">
            {/* Email Input */}
            <TextInput
              className="bg-white font-medium p-4 rounded-md mx-1 my-2 border"
              placeholder="Enter Your Username"
              keyboardType="default"
              value={username}
              onChangeText={setUsername}
            />

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
            {/* <TouchableOpacity onPress={handleLogin}>
      <View style={{ backgroundColor: 'green', padding: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>Login</Text>
        )}
      </View>
    </TouchableOpacity> */}
            <TouchableOpacity onPress={handleLogin}>
  <Text className="bg-green-200 font-bold text-lg text-center p-3 mx-1 mt-3 rounded-md">
    {loading ? <ActivityIndicator color="#fff" /> : 'Login'}
  </Text>
</TouchableOpacity>

            {/* <Button title="Login" onPress={handleLogin} /> */}
            <TouchableOpacity onPress={()=>navigation.navigate('Register')}>
              <Text className="text-center text-base text-white p-2 mx-1 mt-2 rounded-md">
                Don`t have an account ? Register
              </Text>
            </TouchableOpacity>
            {error && <Text>{error}</Text>}
          </View>
        </ScrollView>
  );
};

export default Login;

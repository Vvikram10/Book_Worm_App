import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Using FontAwesome icons

const Footer = ({ totalBooks, studiedBooks, remainingBooks }) => {
  return (
    <View className='flex-row justify-between items-center rounded-lg bg-green-800 py-2 px-5'>
      {/* Total Books */}
      <View className='items-center'>
        <Icon name="book" size={20} color="#4CAF50" />
        <Text className='mt-2'>{totalBooks}</Text>
      </View>

      {/* Studied Books */}
      <View className='items-center'>
        <Icon name="check-circle" size={20} color="#2196F3" />
        <Text className='mt-2'>{studiedBooks}</Text>
      </View>

      {/* Remaining Books */}
      <View className='items-center'>
        <Icon name="clock-o" size={20} color="#FF9800" />
        <Text className='mt-2'>{remainingBooks}</Text>
      </View>
    </View>
  );
};

export default Footer;

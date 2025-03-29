import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native'; // For accessing route params

const BookDetails = () => {
  const { book } = useRoute().params; // Get the selected book from the navigation params

  if (!book) {
    return <Text>No details available</Text>;
  }

  return (
   
    <View className="flex-1 items-center py-5 bg-gray-400">
      <Text className="text-3xl font-bold text-center text-gray-800 mb-2">{book.title}</Text>
      <Text className="text-xl text-red-600 italic">Writer: {book.author}</Text>

      <Text className="text-lg text-gray-700 mt-5 px-2">{book.description}</Text>

    </View>
    
  );
};

export default BookDetails;

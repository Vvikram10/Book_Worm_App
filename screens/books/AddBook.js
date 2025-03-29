import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import useBookStore from '../../src/store/book';

const AddBook = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const { addBook, loading, error } = useBookStore();

  const handleAddBook = async () => {
    if (title && author && description) {
      const newBook = { title, author, description };  // Include all required fields
  
      try {
        await addBook(newBook);  // Call the addBook function to make the API request
        setTitle('');
        setAuthor('');
        setDescription('');
        navigation.goBack();  // Navigate back to the book list after successful addition
      } catch (err) {
        console.error('Error adding book:', err);
      }
    }
  };

  return (
    <View className="flex-1 p-6 bg-gray-100">
      <TextInput
        className="border-b-2 border-gray-400 p-2 mb-4"
        placeholder="Book Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        className="border-b-2 border-gray-400 p-2 mb-4"
        placeholder="Book Author"
        value={author}
        onChangeText={setAuthor}
      />
      <TextInput
        className="border-b-2 border-gray-400 p-2 mb-4"
        placeholder="Book Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Button title="Add Book" onPress={handleAddBook} />
      {loading && <Text className="text-center text-blue-500 mt-4">Loading...</Text>}
      {error && <Text className="text-center text-red-500 mt-4">{error}</Text>}
    </View>
  );
};

export default AddBook;

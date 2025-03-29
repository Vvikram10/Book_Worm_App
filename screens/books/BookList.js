// src/components/BookList.js
import React, { useEffect } from 'react';
import { View, Text, Button, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import useBookStore from '../../src/store/book';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../base/Footer';
const BookList = ({ navigation }) => {
  const { books, loading, error, fetchBooks, deleteBook, totalBooks, studiedBooks, remainingBooks,markBookAsStudied } = useBookStore();

  useEffect(() => {
    fetchBooks(); // Fetch books when the component mounts
  }, [fetchBooks]);

  const handleDeleteBook = (id) => {
    deleteBook(id); // Call delete book action
  };

  const handleAddBook = () => {
    navigation.navigate('AddBook'); // Navigate to AddBook screen
  };
  const handleUpdateBook = (book) => {
    navigation.navigate('UpdateBook', {
      bookId: book.id,
      currentTitle: book.title,
      currentAuthor: book.author,
      currentDescription:book.description,
    }); // Pass book details to the UpdateBook screen
  };

//   const handleViewBookDetails = (book) => {
//     // Navigate to the BookDetails screen and pass the selected book's details
//     navigation.navigate('BookDetails', {
//       bookId: book.id,
//       title: book.title,
//       author: book.author,
//       description: book.description,  // Assuming `description` is a property in your book data
//     });
//   };
const handleViewBookDetails = (book) => {
    // Pass the entire book object to the BookDetails screen
    // markBookAsStudied(book.id);
    navigation.navigate('BookDetails', { book });
  };
  

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text>{error}</Text>;

  return (
    <View className='flex-1 bg-lime-100 p-4'>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className='mb-4 p-2 bg-gray-100 rounded-lg shadow-lg'>
            <Text className='text-xl font-normal  mb-2'>{item.title}</Text>
            {/* <Text className='text-lg text-gray-700 text-center mb-3'>{item.author}</Text> */}
            <View className='flex-row justify-end'>
            {/* Use Icon.Button for button with icon */}
          <View className='mx-1 rounded-full items-center bg-slate-800 p-2'>
            <TouchableOpacity onPress={() => handleViewBookDetails(item)} >
                <Icon name="eye" size={20} color="white"/>
            </TouchableOpacity>
            </View>
            <View className='mx-1 rounded-full items-center bg-green-400 p-2'>
            <TouchableOpacity onPress={() => handleUpdateBook(item)} >
                <Icon name="edit" size={20} color="white"/>
            </TouchableOpacity>
            </View>
            <View className='mx-1 rounded-full items-center bg-red-600 p-2'>
            <TouchableOpacity onPress={() => handleDeleteBook(item.id)} >
                <Icon name="trash" size={20} color="white"/>
            </TouchableOpacity>
            </View>
            </View>
            
          </View>
          
        )}
        
      />
       {/* Footer to show total, studied, and remaining books */}
       {/* <Footer
        totalBooks={totalBooks} 
        studiedBooks={studiedBooks} 
        remainingBooks={remainingBooks} 
      /> */}
      {/* <Button title="Add Book" onPress={handleAddBook} /> */}
      <View className='mx-1 bottom-20 right-5 rounded-full items-center absolute  bg-gray-900 p-5'>
            <TouchableOpacity onPress={handleAddBook} >
                <Icon name="plus" size={20} color="white"/>
            </TouchableOpacity>
            </View>
    </View>
  );
};


export default BookList;

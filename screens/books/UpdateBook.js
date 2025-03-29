// src/components/UpdateBook.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import useBookStore from '../../src/store/book';

const UpdateBook = ({ route, navigation }) => {
  // Get the book to be updated from the route params
  const { bookId, currentTitle, currentAuthor,currentDescription } = route.params;
  
  // Local state to hold the title and author of the book
  const [title, setTitle] = useState(currentTitle);
  const [author, setAuthor] = useState(currentAuthor);
  const [description, setDescription] = useState(currentDescription);
  
  const { updateBook } = useBookStore(); // Zustand store function to update book

  // Function to handle updating the book
  const handleUpdateBook = async () => {
    if (title && author && description) {
      const updatedBook = { id: bookId, title, author,description };
      await updateBook(updatedBook);  // Call the action to update the book in the store and API
      navigation.goBack();  // Go back to the previous screen (BookList)
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Book Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Book Author"
        value={author}
        onChangeText={setAuthor}
      />
      <TextInput
        style={styles.input}
        placeholder="Book description"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Update Book" onPress={handleUpdateBook} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 5,
  },
});

export default UpdateBook;

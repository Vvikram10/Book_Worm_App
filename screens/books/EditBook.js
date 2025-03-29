import React, { useState } from 'react';
import { TextInput, Button, View, ActivityIndicator, Text } from 'react-native';
import { useBookStore } from '../../src/store/book'; // Zustand store for state management
import { updateBook } from '../../src/store/bookApi'; // API call for updating book

const EditBook = ({ route, navigation }) => {
  const { book } = route.params; // Receive the book data passed from BookDetails or BooksScreen
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [description, setDescription] = useState(book.description);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle book update
  const handleUpdateBook = async () => {
    const updatedBookData = { title, author, description };

    setLoading(true);

    try {
      // Call updateBook API to update the book
      await updateBook(book.id, updatedBookData);

      // After update, go back to BooksScreen and fetch the updated list
      setLoading(false);
      navigation.goBack(); // Go back to previous screen after update

    } catch (err) {
      setLoading(false);
      setError(err.message || 'Failed to update book');
    }
  };

  return (
    <View style={{ padding: 16 }}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{ marginBottom: 8, borderBottomWidth: 1, borderColor: '#ddd' }}
      />
      <TextInput
        placeholder="Author"
        value={author}
        onChangeText={setAuthor}
        style={{ marginBottom: 8, borderBottomWidth: 1, borderColor: '#ddd' }}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={{ marginBottom: 8, borderBottomWidth: 1, borderColor: '#ddd' }}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Update Book" onPress={handleUpdateBook} />
      )}
      
      {error && <Text style={{ color: 'red' }}>{error}</Text>} {/* Display error if any */}
    </View>
  );
};

export default EditBook;

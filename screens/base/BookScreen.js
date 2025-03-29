import React, { useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useBookStore } from '../../src/store/book';
import  Icon  from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { deleteBook, updateBook } from '../../src/store/bookApi';


const BooksScreen = () => {
  const { books, loading, error, fetchBooks } = useBookStore();
 const navigation = useNavigation();
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }
  const handleBookPress = (bookId) => {
    // Navigate to the BookDetails screen and pass the entire book object
    const selectedBook = books.find((book) => book.id === bookId);
    navigation.navigate('BookDetails', { book: selectedBook });
  };
   // Function to handle delete (replace with your delete logic)
   const handleDelete = (bookId) => {
    if (bookId) {
      deleteBook(bookId); // Deletes the book from the store using the ID
    } else {
      console.error('Book not found for deletion');
    }
  };

   // Handle navigating to the edit page
  const handleUpdateBook = (bookId) => {
    const selectedBook = books.find((book) => book.id === bookId);
    navigation.navigate('EditBook', { book: selectedBook });
  };



  return (
    // <ScrollView showsVerticalScrollIndicator={false} >


    //    {books.map((book) => (
    //     <TouchableOpacity
    //       key={book.id}
    //       onPress={() => handleBookPress(book.id)} // Navigate to the details page with selected book
    //     >
    //       <View className="p-4 border-b border-gray-300">
    //         <Text className="font-bold text-lg">{book.title}</Text>
    //         <Text className="text-gray-600">{book.author}</Text>
            
    //       </View>
    //     </TouchableOpacity>
        
    //   ))}
    //         <TouchableOpacity onPress={()=>(navigation.navigate('AddBook'))} className='absolute right-8 bottom-2 bg-gray-600 p-4 rounded-full'>
    //           <Icon name="plus" size={30} color="white" />
    //           </TouchableOpacity>
    // </ScrollView>
     <ScrollView showsVerticalScrollIndicator={false}>
     {books.map((book) => (
       <View key={book.id} className="p-4 border-b border-gray-300">
         <TouchableOpacity
           onPress={() => handleBookPress(book.id)} // Navigate to the details page with selected book
         >
           <Text className="font-bold text-lg">{book.title}</Text>
           <Text className="text-gray-600">{book.author}</Text>
         </TouchableOpacity>

         {/* Update and Delete Icons */}
         <View className="flex-row justify-self-center mt-2">
           {/* Update Icon */}
           <TouchableOpacity onPress={() => handleUpdateBook(book.id)}>
             <Icon name="pencil" size={24} color="blue" style={{ marginRight: 16 }} />
           </TouchableOpacity>

           {/* Delete Icon */}
           <TouchableOpacity onPress={() => handleDelete(book.id)}>
             <Icon name="trash" size={24} color="red" />
           </TouchableOpacity>
         </View>
       </View>
     ))}

     {/* Add Book Button */}
     <TouchableOpacity
       onPress={()=>(navigation.navigate('AddBook'))}
       className="absolute right-8 bottom-2 bg-gray-600 p-4 rounded-full"
     >
       <Icon name="plus" size={30} color="white" />
     </TouchableOpacity>
   </ScrollView>

    // <View className='flex-1 bg-gray-400 p-2'>
    //   <FlatList
    //     data={books}
    //     renderItem={({ item }) => (
    //       <View className='flex-row justify-between items-center p-4 border-b bg-green-200'>
    //         <Text className='text-lg font-semibold'>{item.title}</Text>
    //         <Text className='text-gray-500'>{item.author}</Text>
    //       </View>
    //     )}
    //     keyExtractor={(item) => item.id.toString()}
    //   />
    //   <TouchableOpacity onPress={()=>(navigation.navigate('AddBook'))} className='absolute right-8 bottom-24 bg-gray-600 p-4 rounded-full'>
    //   <Icon name="plus" size={30} color="white" />
    //   </TouchableOpacity>
    // </View>
  );
};

export default BooksScreen;

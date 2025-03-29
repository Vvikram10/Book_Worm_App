import { create } from "zustand";
// import { persist } from 'zustand/middleware';
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { fetchbookAPI, addBookAPI, updateBookAPI, deleteBookAPI } from "./bookApi";
import { useAuthStore } from "./auth";

// Create the store
const useBookStore = create(persist((set) => ({
  books: [],
  loading: false,
  error: null,
  // totalBooks: 0, // Total number of books
  // studiedBooks: 0, // Number of books studied
  // remainingBooks: 0, // Number of books remaining to be studied

  // Fetch all books
  fetchBooks: async () => {
    const { accessToken } = useAuthStore.getState(); // Get access token from the authentication store
    set({ loading: true, error: null });

    try {
      // Fetch books using the access token
      const books = await fetchbookAPI(accessToken);  
      console.log('Fetched Books:', books);  // Log to check if books are being fetched properly

      // // Calculate totalBooks, studiedBooks, and remainingBooks
      // const totalBooks = books.length;
      // const studiedBooks = books.filter(book => book.studied).length;
      // const remainingBooks = totalBooks - studiedBooks;

      // Update the state with the fetched books and calculated counts
      set({
        books,
        // totalBooks,
        // studiedBooks,
        // remainingBooks,
        loading: false,
      });

    } catch (error) {
      console.error('Fetch Books Error:', error);  // Log errors to debug
      set({ error: error.message, loading: false });
    }
  },

  // Store method for marking a book as studied
      //  markBookAsStudied: (bookId) => {
      //   set((state) => {
      //     const updatedBooks = state.books.map((book) =>
      //       book.id === bookId ? { ...book, studied: true } : book
      //     );
      //     const studiedBooks = updatedBooks.filter((book) => book.studied).length;
      //     const remainingBooks = updatedBooks.length - studiedBooks;
      //     return {
      //       books: updatedBooks,
      //       studiedBooks: studiedBooks,
      //       remainingBooks: remainingBooks,
      //     };
      //   });
      // },

  // Add a new Book
  addBook: async (newBook) => {
    const { accessToken } = useAuthStore.getState();
    set({ loading: true, error: null });

    try {
      const addedBook = await addBookAPI(newBook, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Added Book:', addedBook);  // Log to see if the book is added correctly
      set((state) => ({
        books: [...state.books, addedBook],  // Update books state
        loading: false,
      }));
    } catch (error) {
      console.error('Add Book Error:', error);  // Log errors to debug
      set({ error: error.message, loading: false });
    }
  },

  // Update an existing book
  updateBook: async (updatedBook) => {
    const { accessToken } = useAuthStore.getState();
    set({ loading: true, error: null });

    try {
      const updated = await updateBookAPI(updatedBook, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      set((state) => ({
        books: state.books.map((book) => (book.id === updated.id ? updated : book)),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Delete a book
  deleteBook: async (bookId) => {
    set({ loading: true, error: null });
    try {
      await deleteBookAPI(bookId);
      set((state) => ({
        books: state.books.filter((book) => book.id !== bookId),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

}), {
  name: 'book-storage', // A unique name for your storage
  // getStorage: () => AsyncStorage, // Use AsyncStorage as the storage method
  storage: createJSONStorage(() => AsyncStorage)
}));

export default useBookStore;

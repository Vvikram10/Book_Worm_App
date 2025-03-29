

import axiosInstance from "./axiosInstance"
//  fetchbook
// In bookApi.js (fetchbookAPI)
export const fetchbookAPI = async (accessToken) => {
  try {
    const response = await axiosInstance.get('bookview/', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data;  // This should return the list of books from the API
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

//  addbook
// export const addBookAPI = async (newBook) =>{
//   try{
//     const response = await axiosInstance.post('bookview/',newBook);
//     return response.data; 
//   }catch(error){
//     throw new Error(error.response ? error.response.data.message:error.message);
//   }
// };

// In bookApi.js (addBookAPI)
export const addBookAPI = async (newBook, options) => {
  try {
    const response = await axiosInstance.post('bookview/', newBook, {
      headers: options.headers,  // Pass the authorization headers
    });

    return response.data;  // Return the added book's data
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

//  updatebook

export const  updateBookAPI = async (updatedBook,options) =>{
  try{
  const response = await axiosInstance.put(`bookview/${updatedBook.id}/`,updatedBook,{
    headers: options.headers,  // Pass the authorization headers
  });
    return response.data; 
  }catch(error){
    throw new Error(error.response ? error.response.data.message:error.message);
  }
};

//  Delete Book

export const deleteBookAPI = async (bookId) => {
  try{
    const response = await axiosInstance.delete(`bookview/${bookId}/`);
    return response.data;
  }catch(error){
    throw new Error(error.response ? error.response.data.message:error.message);
  }
};
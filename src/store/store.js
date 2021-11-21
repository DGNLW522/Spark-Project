import { configureStore } from '@reduxjs/toolkit'
import booksReducer from "./booksSlice"
import membersReducer from "./membersSlice"

export default configureStore({
  reducer: {
      books: booksReducer, 
      members: membersReducer, 
  }, 
});
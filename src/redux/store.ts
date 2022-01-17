import { configureStore } from '@reduxjs/toolkit'
import recordsReducer from './recordSlice'

export const store = configureStore({
  reducer: {
      records: recordsReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

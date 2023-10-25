import { createSlice, configureStore  } from '@reduxjs/toolkit'

const demoSlice = createSlice({
  name: 'appData',
  initialState: {
    reduxMessage: 'Learning Simplified',
    reduxCount: 0
  },
  reducers: {
    /**
     * @param action 
     */
    onDemo: (state, action) => {
      state.reduxCount = action.payload
    },
  }
})
export const { onDemo } = demoSlice.actions

export const store = configureStore({
  reducer: {
    reduxData: demoSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch


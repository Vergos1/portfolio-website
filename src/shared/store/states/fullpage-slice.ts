import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  first: {
    subscribe: 0,
    direction: '',
  },
  second: {
    subscribe: 0,
    direction: '',
  },
  third: {
    subscribe: 0,
    direction: '',
  },
  fourth: {
    subscribe: 0,
    direction: '',
  },
};

const FullpageSlice = createSlice({
  name: 'fullpage',
  initialState,
  reducers: {
    setActiveSlide: (state, action: PayloadAction<[string, string]>) => {
      const [anchor, direction] = action.payload;
      return {
        ...state,
        [anchor]: {
          subscribe: ((state as any)[anchor]?.subscribe || 0) + 1,
          direction,
        },
      };
    },
  },
});

export const { setActiveSlide } = FullpageSlice.actions;

export default FullpageSlice.reducer;

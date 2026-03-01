import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type Anchor =
  | 'first'
  | 'second'
  | 'third'
  | 'fourth'
  | 'fifth'
  | 'sixth';

export type Direction = 'up' | 'down' | '';

interface SlideState {
  subscribe: number;
  direction: Direction;
}

interface FullpageState {
  slides: Record<Anchor, SlideState>;
  selectedBackground: 'Light' | 'Dark';
}

const anchorBackground: Record<Anchor, 'Light' | 'Dark'> = {
  first: 'Light',
  second: 'Light',
  third: 'Light',
  fourth: 'Light',
  fifth: 'Light',
  sixth: 'Light',
};

const initialState: FullpageState = {
  slides: {
    first: { subscribe: 0, direction: '' },
    second: { subscribe: 0, direction: '' },
    third: { subscribe: 0, direction: '' },
    fourth: { subscribe: 0, direction: '' },
    fifth: { subscribe: 0, direction: '' },
    sixth: { subscribe: 0, direction: '' },
  },
  selectedBackground: 'Light',
};

const FullpageSlice = createSlice({
  name: 'fullpage',
  initialState,
  reducers: {
    setActiveSlide: (
      state,
      action: PayloadAction<[Anchor, Direction]>
    ) => {
      const [anchor, direction] = action.payload;

      state.slides[anchor].subscribe += 1;
      state.slides[anchor].direction = direction;
      state.selectedBackground = anchorBackground[anchor];
    },

    setHeaderBackground: (
      state,
      action: PayloadAction<Anchor>
    ) => {
      state.selectedBackground = anchorBackground[action.payload];
    },
  },
});

export const { setActiveSlide, setHeaderBackground } =
  FullpageSlice.actions;

export default FullpageSlice.reducer;
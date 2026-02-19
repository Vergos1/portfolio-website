import { configureStore } from '@reduxjs/toolkit';
import fullpageReducer from './states/fullpage-slice';
import menuReducer from './states/menu-slice';
import splineReducer from './states/spline-slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      fullpage: fullpageReducer,
      menu: menuReducer,
      spline: splineReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

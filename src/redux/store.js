import { configureStore } from '@reduxjs/toolkit';
import { UserAuthApi } from './services/UserAuth';
import { UserDataApi} from './services/UserData'
import AuthUserReducer from './features/User'

export const store = configureStore({
  reducer: {
    [UserAuthApi.reducerPath]: UserAuthApi.reducer,
    [UserDataApi.reducerPath]: UserDataApi.reducer,
    UserAuth: AuthUserReducer,
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(UserAuthApi.middleware, UserDataApi.middleware),
});
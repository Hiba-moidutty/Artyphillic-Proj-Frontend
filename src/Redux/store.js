import {combineReducers, configureStore} from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import userReducer  from './User/usernameSlice';
import adminReducer from './Admin/adminnameSlice';
import artistReducer from './Artist/artistnameSlice';
import { persistConfig } from './persistConfig';


const persistedReducer = persistReducer(persistConfig, 
  combineReducers({
    artist:artistReducer,
    user:userReducer,
    admin:adminReducer
  }));

  
const store = configureStore({
  reducer:persistedReducer
})

const persistor = persistStore(store);

export { store , persistor };
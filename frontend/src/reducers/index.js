
import {combineReducers} from 'redux';

// reducers 
import {userReducer} from './userReducer'


const rootReducer = combineReducers({
    user: userReducer,
}
);

export default rootReducer;

/* 
import { configureStore } from '@reduxjs/toolkit';


export default configureStore({
    rootReducer: {
    user: userReducer,
  },
  devTools: false,
}); */
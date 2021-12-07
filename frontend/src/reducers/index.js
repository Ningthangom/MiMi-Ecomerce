
import {combineReducers} from 'redux';
import {searchReducer} from './searchReducer';

// reducers 
import {userReducer} from './userReducer'
import { cartReducer } from "./cartReducer";
import { drawerReducer } from "./drawerReducer";
import { couponReducer } from "./couponReducer";


const rootReducer = combineReducers({
    user: userReducer,
    search: searchReducer,
    cart: cartReducer,
    drawer: drawerReducer,
    couponRedux: couponReducer,
}
);

export default rootReducer;
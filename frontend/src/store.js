import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import {
  productsReducer,
  productDetailsReducer,
} from "./reducers/productReducers";
import { authReducer } from "./reducers/userReducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  auth: authReducer,
});
//contain all data before load the application
let initialState = {};
const middlware = [thunk];
//creation of Redux Store
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlware))
);

export default store;

import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import mainReducers from "../reducers";

const initialState = {
  user: "",
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default function configureStore() {
  return createStore(
    mainReducers,
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  );
}

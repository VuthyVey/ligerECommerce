import { combineReducers, createStore } from 'redux';
import imageReducer from '/imports/reducers/selectedImageIdReducers.js';

export function productsReducer(state = [], action) {
  return state;
}

export function userReducer(state = '', action) {
  switch(action.type) {
    case 'updateUser' :
      return "asfdsafs";
  }
  return state;
}
const allReducers = combineReducers({
  products: productsReducer,
  user: userReducer,
  imageId: imageReducer
})

const store = createStore(allReducers, {
  products: [{name: 'Iphone'}],
  user: 'Vuthy'
}, window.devToolsExtension && window.devToolsExtension());


export function action () {
  console.log("firing")
  return {
  type: 'updateUser',
  payload: {
    user: 'John'
  }
}}

export default store;

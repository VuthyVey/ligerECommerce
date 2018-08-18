import { combineReducers, createStore } from 'redux';

function productReducers(state = [], action) {
  return state;
}

function userReducers(state = '', action) {
  switch (action.type) {
    case 'updateUser':
      return "HelloWorld";
      break;
    default:
      return state;
  }
}

function ImageReducers(state = '', action) {
  return 'state';
}

const allReducers = combineReducers({
  product:productReducers,
  user: userReducers,
  images: ImageReducers
})

const store = createStore(allReducers, {
  user: 'Vuthy',
  product: {item: 'apple'}
}, window.devToolsExtension && window.devToolsExtension()
);
console.log(store.getState());

const updateUserAction = {
  type: 'updateUser',
  payload: {
    user: 'John'
  }
}

store.dispatch(updateUserAction)

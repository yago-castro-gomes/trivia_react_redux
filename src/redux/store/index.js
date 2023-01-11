import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension/';
import reduce from '../reduce';

const store = createStore(reduce, composeWithDevTools(applyMiddleware(thunk)));

export default store;

if (window.Cypress) {
  window.store = store;
}

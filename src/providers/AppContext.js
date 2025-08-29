import React, { createContext, useContext, useReducer } from 'react';
import { sampleUsers } from '../models/User';
import { sampleProducts } from '../models/Product';

// Initial State
const initialState = {
  users: sampleUsers,
  products: sampleProducts,
  selectedUser: null,
  selectedProduct: null,
  isLoading: false,
  error: null,
};

// Action Types
export const ACTIONS = {
  SET_USERS: 'SET_USERS',
  SET_PRODUCTS: 'SET_PRODUCTS',
  SELECT_USER: 'SELECT_USER',
  SELECT_PRODUCT: 'SELECT_PRODUCT',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  ADD_USER: 'ADD_USER',
  ADD_PRODUCT: 'ADD_PRODUCT',
  UPDATE_USER: 'UPDATE_USER',
  UPDATE_PRODUCT: 'UPDATE_PRODUCT',
  DELETE_USER: 'DELETE_USER',
  DELETE_PRODUCT: 'DELETE_PRODUCT',
};

// Reducer Function
const appReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_USERS:
      return { ...state, users: action.payload };
    
    case ACTIONS.SET_PRODUCTS:
      return { ...state, products: action.payload };
    
    case ACTIONS.SELECT_USER:
      return { ...state, selectedUser: action.payload };
    
    case ACTIONS.SELECT_PRODUCT:
      return { ...state, selectedProduct: action.payload };
    
    case ACTIONS.SET_LOADING:
      return { ...state, isLoading: action.payload };
    
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload };
    
    case ACTIONS.ADD_USER:
      return { ...state, users: [...state.users, action.payload] };
    
    case ACTIONS.ADD_PRODUCT:
      return { ...state, products: [...state.products, action.payload] };
    
    case ACTIONS.UPDATE_USER:
      return {
        ...state,
        users: state.users.map(user => 
          user.id === action.payload.id ? action.payload : user
        ),
      };
    
    case ACTIONS.UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map(product => 
          product.id === action.payload.id ? action.payload : product
        ),
      };
    
    case ACTIONS.DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
      };
    
    case ACTIONS.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload),
      };
    
    default:
      return state;
  }
};

// Create Context
const AppContext = createContext();

// Provider Component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Actions
  const actions = {
    // User Actions
    setUsers: (users) => dispatch({ type: ACTIONS.SET_USERS, payload: users }),
    selectUser: (user) => dispatch({ type: ACTIONS.SELECT_USER, payload: user }),
    addUser: (user) => dispatch({ type: ACTIONS.ADD_USER, payload: user }),
    updateUser: (user) => dispatch({ type: ACTIONS.UPDATE_USER, payload: user }),
    deleteUser: (userId) => dispatch({ type: ACTIONS.DELETE_USER, payload: userId }),
    
    // Product Actions
    setProducts: (products) => dispatch({ type: ACTIONS.SET_PRODUCTS, payload: products }),
    selectProduct: (product) => dispatch({ type: ACTIONS.SELECT_PRODUCT, payload: product }),
    addProduct: (product) => dispatch({ type: ACTIONS.ADD_PRODUCT, payload: product }),
    updateProduct: (product) => dispatch({ type: ACTIONS.UPDATE_PRODUCT, payload: product }),
    deleteProduct: (productId) => dispatch({ type: ACTIONS.DELETE_PRODUCT, payload: productId }),
    
    // Loading & Error Actions
    setLoading: (loading) => dispatch({ type: ACTIONS.SET_LOADING, payload: loading }),
    setError: (error) => dispatch({ type: ACTIONS.SET_ERROR, payload: error }),
  };

  const value = {
    ...state,
    ...actions,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom Hook สำหรับใช้ Context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}; 
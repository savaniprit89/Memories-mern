export const initialState = {
    user: null,
    posts:[]
}

export const actionTypes = {
    SET_USER: 'SET_USER'
}

const reducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        
            case 'FETCH_ALL':
                return action.payload;
            case 'CREATE':
                return {...state,
          posts: [...state.basket, action.payload]};
            default:
              return state
    }
}

export default reducer

/*
import React from 'react'
import './Product.css'

import { useStateValue } from "./StateProvider";
function Product({  title, image, price, rating }) {
  const [{basket}, dispatch] = useStateValue();

console.log(basket)
  const addtobasket = () => {
    // dispatch the item into the data layer
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };
  return (
*/
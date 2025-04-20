import axios from 'axios'
import React, { useContext, useState } from 'react'
import { createContext } from 'react'
import { authContext } from './AuthContext'


export const CartContext = createContext()

export default function CartContextProvider({children}) {

    const {userToken} =  useContext(authContext) 
    
    const [numOfCartItems, setNumOfCartItems] = useState(0)
    const [totalCartPrice, setTotalCartPrice] = useState(0)
    const [products, setProducts] = useState(null)

    // const [succOrError, setSuccOrError] = useState(null)





    

    async function addProductsToCart(id){
        const res = await axios.post('https://ecommerce.routemisr.com/api/v1/cart',
            {
                productId: id,
            },
            {
                headers:{ token: userToken }

            })
        .then(function(res){
            console.log('cart items',res.data)
            console.log('cart items',res.data.numOfCartItems);
            console.log('price',res.data.data.totalCartPrice);
            console.log('products',res.data.data.products);

            setNumOfCartItems(res.data.numOfCartItems);
            setTotalCartPrice(res.data.data.totalCartPrice);
            setProducts(res.data.data.products);

            return true


            
        })
        .catch(function(err){
            console.log( 'err',err)
                return false
        })
        return res
    }


  return (
    <CartContext.Provider value={ { 
        addProductsToCart, 
        } }>
        {children}
    </CartContext.Provider>
  )
}

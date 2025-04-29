import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { authContext } from './AuthContext'
import toast from 'react-hot-toast'


export const CartContext = createContext()

export default function CartContextProvider({ children }) {

    // const { userToken } = useContext(authContext)

    // const [numOfCartItems, setNumOfCartItems] = useState(0)
    // const [totalCartPrice, setTotalCartPrice] = useState(0)
    // const [products, setProducts] = useState(null)


    // async function addProductsToCart(id) {
    //     const res = await axios.post('http://localhost:8000/api/carts/6802bcef489dbe50c70aad5b/products',
    //         {
    //             productId: id,
    //             quantity: 1
    //         },
    //         {
    //             headers: {
    //                 Authorization: `Bearer ${userToken}`
    //             }
    //         })
    //         .then(function (res) {
    //             console.log('cart items', res.data)
    //             // console.log('cart items', res.data.numOfCartItems);
    //             // console.log('price', res.data.data.totalCartPrice);
    //             // console.log('products', res.data.data.products);

    //             // setNumOfCartItems(res.data.numOfCartItems);
    //             // setTotalCartPrice(res.data.data.totalCartPrice);
    //             // setProducts(res.data.data.products);

    //             return true



    //         })
    //         .catch(function (err) {
    //             console.log('err', err)
    //             return false
    //         })
    //     return res
    // }

    // function getUserCart() {

    //     axios.get('https://ecommerce.routemisr.com/api/v1/cart',
    //         {
    //             headers: {
    //                 token: userToken
    //             }
    //         }
    //     )

    //         .then(function (res) {
    //             console.log('res', res.data.data);
    //             console.log('res', res.data.numOfCartItems);
    //             setNumOfCartItems(res.data.numOfCartItems)
    //             console.log('res', res.data.data.totalCartPrice);
    //             setTotalCartPrice(res.data.data.totalCartPrice)
    //             console.log('res', res.data.data.products);
    //             setProducts(res.data.data.products)



    //         })
    //         .catch(function (err) {
    //             console.log('err', err);

    //         })
    // }

    // async function updateCount(id, newCount) {
    //     const res = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    //         {
    //             "count": newCount
    //         },
    //         {
    //             headers: {
    //                 token: userToken
    //             }
    //         }
    //     )
    //         .then(function (resp) {
    //             setNumOfCartItems(resp.data.numOfCartItems)
    //             // console.log('res', res.data.data.totalCartPrice);
    //             setTotalCartPrice(resp.data.data.totalCartPrice)
    //             // console.log('res', res.data.data.products);
    //             setProducts(resp.data.data.products)

    //             return true

    //         })
    //         .catch(function (err) {
    //             console.log('err', err);
    //             return false

    //         })

    //     res ? toast.success("count changed succesfully") : toast.error('error')
    // }

    // async function removeElementFromCrat(id) {
    //     const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    //         {
    //             headers: {
    //                 token: userToken
    //             }
    //         }
    //     ).then(function (res) {
    //         // console.log(res.data.data.totalCartPrice);
    //         // console.log(res.data.data.products);

    //         setNumOfCartItems(res.data.numOfCartItems);
    //         setTotalCartPrice(res.data.data.totalCartPrice);
    //         setProducts(res.data.data.products);

    //         return true

    //     })
    //         .catch(function (err) {
    //             console.log(err);
    //             return false

    //         })
    //     return res
    // }


    // useEffect(() => {
    //     if (userToken) {
    //         getUserCart()
    //     }
    // }, [userToken])

    return (
        <CartContext.Provider value={{
            
        }}>
            {children}
        </CartContext.Provider>
    )
}

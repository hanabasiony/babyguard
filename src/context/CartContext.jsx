import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { authContext } from './AuthContext'
import toast from 'react-hot-toast'


export const CartContext = createContext()

export default function CartContextProvider({ children }) {



    return (
        <CartContext.Provider value={{
            
        }}>
            {children}
        </CartContext.Provider>
    )
}

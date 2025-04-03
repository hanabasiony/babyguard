import React, { createContext, useEffect, useState } from 'react'

export const authContext = createContext()

export default function AuthcontextProvider({ children }) {

    const [userToken, setuserToken] = useState(null)

   

    useEffect(function(){
        console.log("refreshed");
        
        if( localStorage.getItem('tkn') != null){
            setuserToken(localStorage.getItem('tkn'))
        }
    } , [])
     
    return (
        <>
            <authContext.Provider value={ {
                userToken, setuserToken
             } }>
                {children}

            </authContext.Provider>

        </>
    )
}

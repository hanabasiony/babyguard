import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FallingLines } from 'react-loader-spinner'
import LoaderScreen from '../loaderScreen/loaderScreen'
import SimpleSlider from '../homeSlider/homeSlider'
import CategoriesSlider from '../categoriesSlider/categoriesSlider'
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from "react-router-dom";


export default function Home() {

    function getAllProducts2() {
        return axios.get('http://localhost:8000/api/products')
    }

    const { data, isError, error, isLoading, isFetching } = useQuery({
        queryKey: ['getAllProsucts'],
        queryFn: getAllProducts2
    })
    const navigate = useNavigate()

    function navigatePayment(){
        navigate('/payment/')
    }

    console.log('data', data);
    console.log('isError', isError);
    console.log('error', error);
    console.log('isLoading', isLoading);
    console.log('isFetching', isFetching);


    if (isLoading) {
        return <LoaderScreen />
    }
    if (isError) {
        return <div>{isError}</div>
    }


    return (
        <>
            {/* <SimpleSlider />

            <CategoriesSlider /> */}
            <div className="wrapper py-40 bg-pink-50 px-10 mx-auto">
                <div className='container mx-auto '>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 mx-auto justify-items-center">

                        {data.data.data?.map(product => <Link to={`/productDetails/${product._id}`} key={product._id} className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center text-center w-64">
                            <img src={product.imageCover} alt={product.title} className=' w-24 h-24 mb-4' />
                            <h3 className='text-lg font-semibold text-blue-600 mb-1'>{product.name}</h3>
                            <h2 className='text-blue-600'>{product.description}</h2>
                         
                               

                                <p className='text-blue-400 mb-3 font-semibold'>EGP {product.price}</p>

                            
                            <button class="bg-pink-400 hover:bg-pink-500 text-white font-medium py-2 px-4 rounded-full cursor-pointer" onClick={navigatePayment}>
                                Add to Cart
                            </button>
                        </Link>)}



                    </div>
                </div>
            </div>
        </>

    )
}

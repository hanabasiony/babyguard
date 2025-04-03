import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FallingLines } from 'react-loader-spinner'
import LoaderScreen from '../loaderScreen/loaderScreen'
import SimpleSlider from '../homeSlider/homeSlider'
import CategoriesSlider from '../categoriesSlider/categoriesSlider'
import { useQuery } from '@tanstack/react-query'

export default function Home() {

    function getAllProducts2() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/products')
    }

    const { data, isError, error, isLoading, isFetching } = useQuery({
        queryKey: ['getAllProsucts'],
        queryFn: getAllProducts2
    })

    console.log('data', data);
    console.log('isError', isError);
    console.log('error', error);
    console.log('isLoading', isLoading);
    console.log('isFetching', isFetching);


    if (isLoading) {
        return <LoaderScreen />
    }
    if(isError){
        return <div>{isError}</div>
    }


    return (
        <>
            <SimpleSlider />

            <CategoriesSlider />
            <div className='container mx-auto'>

                <div className="grid md:grid-cols-3 lg:md:grid-cols-6 gap-2 md:gap-5 ">

                    {data.data.data?.map(product => <div key={product._id} className="bg-blue-500 p-3">
                        <img src={product.imageCover} alt={product.title} className='w-full' />
                        <h3>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
                        <h2>{product.category.name}</h2>
                        <div className='flex justify-between items-center'>
                            <p>{product.ratingsAverage}</p>
                            <div>
                                {product.priceAfterDiscount ?
                                    <>
                                        <p className='line-through text-red-500'>{product.price}</p>
                                        <p>{product.priceAfterDiscount}</p>
                                    </> : <p>{product.price}</p>}
                            </div>
                        </div>
                    </div>)}



                </div>
            </div>
        </>

    )
}

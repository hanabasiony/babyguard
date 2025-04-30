import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios'
import { FallingLines } from 'react-loader-spinner'
import LoaderScreen from '../loaderScreen/loaderScreen'
import SimpleSlider from '../homeSlider/homeSlider'
import CategoriesSlider from '../categoriesSlider/categoriesSlider'
import { useQuery } from '@tanstack/react-query'
import { CartContext } from '../../context/CartContext'
import toast from 'react-hot-toast'
import './home.css'

export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [productQuantities, setProductQuantities] = useState({});

    useEffect(() => {
        // Check for cart expiration on component mount
        checkCartExpiration();
        
        // Set up interval to check cart expiration every minute
        const intervalId = setInterval(checkCartExpiration, 60000);

        // Set up beforeunload event listener
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Cleanup function
        return () => {
            clearInterval(intervalId);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    const checkCartExpiration = async () => {
        const cartId = localStorage.getItem('cartId');
        const cartTimestamp = localStorage.getItem('cartTimestamp');
        
        if (cartId && cartTimestamp) {
            const now = Date.now();
            const cartAge = now - parseInt(cartTimestamp);
            const fifteenMinutes = 15 * 60 * 1000; // 15 minutes in milliseconds

            if (cartAge > fifteenMinutes) {
                try {
                    const token = localStorage.getItem('token');
                    await axios.delete(`http://localhost:8000/api/carts/${cartId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    
                    // Clear cart data from localStorage
                    localStorage.removeItem('cartId');
                    localStorage.removeItem('cartTimestamp');
                    setProductQuantities({});
                    
                    console.log('Cart deleted due to expiration');
                } catch (error) {
                    console.error('Error deleting expired cart:', error);
                }
            }
        }
    };

    const handleBeforeUnload = async () => {
        const cartId = localStorage.getItem('cartId');
        if (cartId) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:8000/api/carts/${cartId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                // Clear cart data from localStorage
                localStorage.removeItem('cartId');
                localStorage.removeItem('cartTimestamp');
            } catch (error) {
                console.error('Error deleting cart on browser close:', error);
            }
        }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                console.log('Starting API call...'); 
                const token = localStorage.getItem('token');
               
                
                const response = await axios.get('http://localhost:8000/api/products', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setProducts(response.data.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch products');
                setLoading(false);
                console.error('Error fetching products:', err);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <LoaderScreen />;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    async function handleAddToCart(e, productId) {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const cartId = localStorage.getItem('cartId');
            
            const response = await axios.post(
                `http://localhost:8000/api/carts/${cartId}/products`,
                {
                    productId: productId,
                    quantity: 1
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            
            // Set or update cart timestamp
            localStorage.setItem('cartTimestamp', Date.now().toString());
            
            setProductQuantities(prev => ({
                ...prev,
                [productId]: (prev[productId] || 0) + 1
            }));

            console.log('Product added to cart:', response.data);
            toast.success('Product added to cart successfully!');
        } catch (error) {
            console.error('Error adding product to cart:', error);
            toast.error('Failed to add product to cart');
        }
    }

    async function handleUpdateQuantity(e, productId, change) {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const cartId = localStorage.getItem('cartId');
            const newQuantity = (productQuantities[productId] || 0) + change;
            
            if (newQuantity < 0) return;

            let response;
            if (productQuantities[productId] > 0) {
                // Use PATCH for existing products
                response = await axios.patch(
                    `http://localhost:8000/api/carts/${cartId}/products/${productId}`,
                    {
                        quantity: newQuantity
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
            } else {
                // Use POST for new products
                response = await axios.post(
                    `http://localhost:8000/api/carts/${cartId}/products`,
                    {
                        productId: productId,
                        quantity: newQuantity
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
            }
            
            // Update cart timestamp on any cart activity
            localStorage.setItem('cartTimestamp', Date.now().toString());
            
            setProductQuantities(prev => ({
                ...prev,
                [productId]: newQuantity
            }));

            // Show appropriate toast message based on the change
            if (change > 0) {
                toast.success(`Quantity increased to ${newQuantity}`);
            } else {
                toast.success(`Quantity decreased to ${newQuantity}`);
            }

            console.log('Cart updated:', response.data);
        } catch (error) {
            console.error('Error updating cart:', error);
            toast.error('Failed to update cart quantity');
        }
    }

    return (
        <>
            {/* <SimpleSlider />

            <CategoriesSlider /> */}
            <div className="wrapper py-40 px-10 mx-auto">
                <div className='container mx-auto '>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 mx-auto justify-items-center">
                        {products.map((product) => (
                            <Link
                                to={`/productDetails/${product._id}`}
                                key={product._id}
                                className="bg-white pb-15 rounded-2xl relative shadow-md p-4 flex flex-col items-center text-center w-64 group  transition-all"
                            >
                                <img 
                                    src={product.image} 
                                    alt={product.name} 
                                    className='w-24 h-24 mb-4 object-cover'
                                />
                                <h3 className='text-lg font-semibold text-blue-600 mb-1'>{product.name}</h3>
                                <h2 className='text-blue-600'>{product.description}</h2>
                                <p className='text-blue-400 mb-3 font-semibold'>EGP: {product.price}</p>

                                {productQuantities[product._id] > 0 ? (
                                    <div className="flex items-center justify-center gap-2 absolute bottom-3">
                                        <button 
                                            onClick={(e) => handleUpdateQuantity(e, product._id, -1)}
                                            className="bg-pink-400 hover:bg-pink-500 cursor-pointer text-white font-medium w-8 h-8 rounded-full flex items-center justify-center"
                                        >
                                            -
                                        </button>
                                        <span className="bg-pink-400 text-white font-medium px-3 py-1 rounded-full">
                                            {productQuantities[product._id]}
                                        </span>
                                        <button 
                                            onClick={(e) => handleUpdateQuantity(e, product._id, 1)}
                                            className="bg-pink-400 hover:bg-pink-500 cursor-pointer text-white font-medium w-8 h-8 rounded-full flex items-center justify-center"
                                        >
                                            +
                                        </button>
                                    </div>
                                ) : (
                                    <button 
                                        onClick={(e) => handleAddToCart(e, product._id)} 
                                        className="bg-pink-400 absolute bottom-3 hover:bg-pink-500 text-white font-medium py-2 px-4 rounded-full cursor-pointer"
                                    >
                                        Add to Cart
                                    </button>
                                )}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

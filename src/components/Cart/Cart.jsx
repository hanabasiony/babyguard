import React, { useContext, useEffect, useState } from 'react';
import { Trash, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import LoaderScreen from '../loaderScreen/loaderScreen';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';

const Cart = () => {
    const navigate = useNavigate();
    const [cartData, setCartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { handleUpdateQuantity, loadingProducts, productQuantities } = useContext(CartContext);

    const fetchCartData = async () => {
        try {
            const cartId = localStorage.getItem('cartId');
            const token = localStorage.getItem('token');
            
            if (!cartId) {
                setLoading(false);
                return;
            }

            const response = await axios.get(`http://localhost:8000/api/carts/${cartId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            setCartData(response.data.data);
        } catch (error) {
            console.error('Error fetching cart:', error);
            toast.error('Failed to fetch cart data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCartData();
    }, [productQuantities]);

    const handleQuantityChange = async (e, productId, change) => {
        try {
            await handleUpdateQuantity(e, productId, change);
            await fetchCartData();
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    if (loading) {
        return <LoaderScreen />;
    }

    if (!cartData) {
        return (
            <div className="max-w-5xl py-30 mx-auto p-6 bg-whitw min-h-screen">
                <p className="text-center text-gray-500">Your cart is empty</p>
            </div>
        );
    }

    const { cart, products } = cartData;

    return (
        <div className="max-w-5xl py-30 mx-auto p-6 bg-whitw min-h-screen">
            <p className="text-pink-500 mb-6 text-lg font-medium">
                Total: {cart.totalPrice} EGP
            </p>

            {products.map((product) => (
                <div
                    key={product.productId}
                    className="flex items-center justify-between bg-white rounded-2xl shadow p-4 mb-4"
                >
                    <div className="flex items-center gap-4">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-20 h-20 rounded-xl object-cover border-2 border-pink-200"
                        />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">{product.name}</h3>
                            <p className="text-pink-500 font-medium text-sm">Price: {product.price} EGP</p>
                            <button
                                className="mt-2 flex items-center text-xs text-pink-400 cursor-pointer hover:underline"
                                onClick={(e) => handleQuantityChange(e, product.productId, -product.quantity)}
                            >
                                <Trash className="w-4 h-4 mr-1" /> Remove
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {loadingProducts[product.productId] ? (
                            <div className="flex justify-center">
                                <Oval
                                    height={20}
                                    width={20}
                                    color="#EC4899"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                    visible={true}
                                    ariaLabel='oval-loading'
                                    secondaryColor="#EC4899"
                                    strokeWidth={4}
                                    strokeWidthSecondary={4}
                                />
                            </div>
                        ) : (
                            <>
                                <button 
                                    onClick={(e) => handleQuantityChange(e, product.productId, -1)}
                                    className="bg-pink-200 text-pink-800 px-2 py-1 cursor-pointer rounded-full hover:bg-pink-300"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="text-md font-semibold text-gray-700">{product.quantity}</span>
                                <button 
                                    onClick={(e) => handleQuantityChange(e, product.productId, 1)}
                                    className="bg-pink-200 cursor-pointer text-pink-800 px-2 py-1 rounded-full hover:bg-pink-300"
                                >
                                    <Plus size={16} />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            ))}

            <div className="mt-6 text-center">
                <button 
                    onClick={() => navigate('/payment')} 
                    className="bg-pink-500 text-white px-6 py-3 rounded-full shadow hover:bg-pink-600 cursor-pointer text-lg font-semibold"
                >
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default Cart;
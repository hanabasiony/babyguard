import React, { useState, useContext } from 'react'
// import logo from '../../assets/images/freshcart-logo.svg'
import logobaby from '../../assets/images/logo-new2.png'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { FaBars, FaTimes } from "react-icons/fa";
import './navbar.css'
import Login from './../login/Login';
import Reg from '../Reg/Reg'
// import Btn from './btn';
import { authContext } from '../../context/AuthContext';
import Home from './../home/home';
import { ShoppingCart, Settings } from 'lucide-react'
import { CartContext } from '../../context/CartContext';
import axios from 'axios';




export default function Navbar() {
  const { userToken, setuserToken } = useContext(authContext)
   const { totalItems } = useContext(CartContext)
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleLogout() {
    try {
        // First try to delete the cart
        const cartId = localStorage.getItem('cartId');
        // const cartId = '68102814d2dae0db51b3960d'

        
        if (cartId) {
            setLoading(true);
            try {
                const response = await axios.delete(
                    `http://localhost:8000/api/carts/${cartId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${userToken}`
                        }
                    }
                );

                if (response.status === 200) {
                    // Only proceed with logout if cart is successfully deleted
                    localStorage.removeItem('cartId');
                    // localStorage.removeItem('cartDetails');
                    localStorage.removeItem('token');
                    localStorage.removeItem('role');
                    setuserToken(null);
                    navigate('/login');
                    console.log('cart deleted',response);
                    
                } else {
                    throw new Error('Failed to delete cart');
                    console.log('cart not deleted',response);
                }
            } catch (cartError) {
                console.error('Cart deletion error:', cartError);
                
                // Handle specific error cases
                if (cartError.response) {
                    const errorMessage = cartError.response.data?.message || 'Failed to delete cart';
                    
                    if (cartError.response.status === 404) {
                        setErrorMessage('Cart not found. Please try again.');
                    } else if (cartError.response.status === 400) {
                        setErrorMessage(errorMessage);
                    } else if (cartError.response.status === 401) {
                        setErrorMessage('Session expired. Please login again.');
                    } else {
                        setErrorMessage('Cannot logout: ' + errorMessage);
                    }
                } else {
                    setErrorMessage('Network error. Please check your connection.');
                }
                
                setTimeout(() => setErrorMessage(''), 3000);
                return; // Prevent logout on any cart deletion error
            }
        } else {
            // If no cart exists, allow logout
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            setuserToken(null);
            navigate('/login');
        }
    } catch (error) {
        console.error('Logout error:', error);
        setErrorMessage('An unexpected error occurred. Please try again.');
        setTimeout(() => setErrorMessage(''), 3000);
    } finally {
        setLoading(false);
    }
  }

  async function deleteCart() {
    // Get cart ID from localStorage
    const cartId = localStorage.getItem('cartId');
    
    // Check if cart ID exists
    if (!cartId) {
        console.error('No cart ID found in localStorage');
        return;
    }

    try {
        // Show loading state if needed
        setLoading(true);

        // Make the delete request
        const response = await axios.delete(
            `http://localhost:8000/api/carts/${cartId}`,
            {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            }
        );

        // Log success
        console.log('Cart deleted successfully:', response.data);

        // Clear cart data from localStorage
        localStorage.removeItem('cartId');
        localStorage.removeItem('cartDetails');

        // Show success message to user
        setSuccessMessage('Cart deleted successfully');
        setTimeout(() => setSuccessMessage(''), 3000);

        // Refresh the page or update the UI as needed
        window.location.reload();

    } catch (error) {
        // Handle different types of errors
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Error response:', error.response.data);
            console.error('Error status:', error.response.status);
            
            if (error.response.status === 404) {
                setErrorMessage('Cart not found');
            } else if (error.response.status === 401) {
                setErrorMessage('Unauthorized - Please login again');
            } else {
                setErrorMessage('Failed to delete cart');
            }
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
            setErrorMessage('Network error - Please check your connection');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error setting up request:', error.message);
            setErrorMessage('An error occurred while deleting the cart');
        }

        // Clear error message after 3 seconds
        setTimeout(() => setErrorMessage(''), 3000);
    } finally {
        // Reset loading state
        setLoading(false);
    }
  }
  return (
    <>
     

      <nav className="bg-pink-50 shadow pe-7 shadow-pink-300 px-2 fixed mb-6 py-2 w-full">
        <div className="container mx-auto flex items-center justify-between max-w-[1200px]">
          {/* Left Side: Logo & Links */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logobaby} alt="fresh cart" className="w-50" />
              {/* <h1 className="text-pink-300 text-xl font-bold">Baby Guard</h1> */}
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center space-x-6">
            <li>
              <NavLink to="/products" className=" hover:text-pink-600    text-pink-400 font-semibold ">
                Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/vacciens" className=" hover:text-pink-600    text-pink-400 font-semibold">
                Vacciens
              </NavLink>
            </li>
            <li>
              <NavLink to="/pregnancyTips" className=" hover:text-pink-600     text-pink-400 font-semibold">
                Pregnancy tips
              </NavLink>
            </li>
            <li>
              <NavLink to="/childProfile" className=" hover:text-pink-600     text-pink-400 font-semibold">
                Child profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/contactUs" className=" hover:text-pink-600     text-pink-400 font-semibold">
                Contact us
              </NavLink>
            </li>
            <li>
              <NavLink to="/aboutUs" className=" hover:text-pink-600     text-pink-400 font-semibold">
                About us
              </NavLink>
            </li>
          </ul>

          {/* Right Side: Socials & Buttons */}
          <div className="hidden md:flex items-center space-x-5">
            <ul className="flex items-center space-x-3">
              {userToken ? (
                <>
                  <li>
                    <NavLink to="/settings" className="text-pink-300 hover:text-pink-400">
                      <Settings className="w-6 h-6" />
                    </NavLink>
                  </li>
                  <div className="cart">
                    <NavLink to="/cart">
                      <div className="relative inline-block">
                        <ShoppingCart className="w-6 h-6 text-pink-700" />
                        {totalItems > 0 && (
                          <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                            {totalItems}
                          </span>
                        )}
                      </div>
                    </NavLink>
                  </div>
                </>
              ) : (
                <li>
                  <NavLink to="/settings" className="text-pink-300 hover:text-pink-400">
                    <Settings className="w-6 h-6" />
                  </NavLink>
                </li>
              )}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-600" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-pink-100 py-4">
            <ul className="flex flex-col items-center space-y-4">
              <li><NavLink to="/products" className="text-gray-600 hover:text-pink-400" onClick={() => setIsOpen(false)}>Products</NavLink></li>
              <li><NavLink to="/categories" className="text-gray-600 hover:text-pink-400" onClick={() => setIsOpen(false)}>Categories</NavLink></li>
              <li><NavLink to="/" className="text-gray-600 hover:text-pink-400" onClick={() => setIsOpen(false)}>Pergnancy tips</NavLink></li>
              <li><NavLink to="/" className="text-gray-600 hover:text-pink-400" onClick={() => setIsOpen(false)}>Contant us</NavLink></li>
              <li><NavLink to="/aboutUs" className="text-gray-600 hover:text-pink-400" onClick={() => setIsOpen(false)}>About us</NavLink></li>
              <li><NavLink to="/cart" className="text-gray-600 hover:text-pink-400" onClick={() => setIsOpen(false)}>
                <i className="fa-solid fa-cart-shopping text-xl text-pink-500"></i>
              </NavLink></li>
              <li><NavLink to="/settings" className="text-gray-600 hover:text-pink-400" onClick={() => setIsOpen(false)}>
                <Settings className="w-6 h-6" />
              </NavLink></li>
            </ul>
          </div>
        )}
      </nav>
      <Outlet />
    </>
  )
}

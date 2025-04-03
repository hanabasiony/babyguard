import React, { useState, useContext } from 'react'
// import logo from '../../assets/images/freshcart-logo.svg'
import logobaby from '../../assets/images/logo.png'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { FaBars, FaTimes } from "react-icons/fa";
import './navbar.css'
import Login from './../login/Login';
import Reg from '../Reg/Reg'
// import Btn from './btn';
import { authContext } from '../../context/AuthContext';
import Home from './../home/home';




export default function Navbar() {
  const { userToken, setuserToken } = useContext(authContext)

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  function handleLogout() {
    localStorage.removeItem('tkn')
    setuserToken(null)
    navigate('./login')
  }
  return (
    <>
      {/* <nav className='flex items-center justify-between px-10 shadow shadow-pink-300 bg-pink-50'>
        <div className="left-nav flex items-center gap-3 ">
          <Link to='' className={'flex justify-center align-middle'}>
         
            <img src={logobaby} alt="fresh cart" style={{width:'80px'}} />
            <h1 className='text-pink-300 text-xl mt-6.5 font-bold'>Baby guard</h1>
          </Link>

          <ul className='flex item-center space-x-4 '>

            <li>
              <NavLink to='/products' className={'text-gray-600'}>
                products
              </NavLink>
            </li>

            <li>
              <NavLink to='/categories' className={'text-gray-600'}>
                categories
              </NavLink>
            </li>

            <li>
              <NavLink to='/cart' className={'text-gray-600'}>
                cart
              </NavLink>
            </li>


          </ul>
        </div>



        <div className="right-nav  flex items-center justify-center gap-5">
          <ul className='flex gap-4 '>

            <li>
              <i className='fa-brands cursor-pointer text-gray-600 fa-facebook-f'></i>
            </li>

            <li>
              <i className='fa-brands cursor-pointer text-gray-600 fa-twitter'></i>
            </li>

            <li>
              <i className='fa-brands cursor-pointer text-gray-600 fa-instagram'></i>
            </li>

            <li>
              <i className='fa-brands cursor-pointer text-gray-600 fa-linkedin'></i>
            </li>
          </ul>

          <ul className='flex items-center gap-3'>

            <li>
              <NavLink className={'text-gray-600'} to='/Reg'>Regestir</NavLink>
            </li>

            <li>
              <NavLink className={'text-gray-600'} to='/login'>Login</NavLink>
            </li>

            <li>
              <span className='text-gray-600'>Logout</span>
            </li>
            <Btn>Get started</Btn>
          </ul>
        </div>
      </nav> */}

      <nav className="bg-pink-50 shadow shadow-pink-300 px-2 fixed mb-6">
        <div className="container mx-auto flex items-center justify-between">
          {/* Left Side: Logo & Links */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logobaby} alt="fresh cart" className="w-20" />
              <h1 className="text-pink-300 text-xl font-bold">Baby Guard</h1>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center space-x-6">
            <li>
              <NavLink to="/home" className=" hover:text-pink-600  p-2  text-pink-400 font-semibold bg-white rounded-full shadow-[0_0_10px_rgba(255,182,193,0.6)] border border-pink-200">
                Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/categories" className=" hover:text-pink-600   p-2  text-pink-400 font-semibold bg-white rounded-full shadow-[0_0_10px_rgba(255,182,193,0.6)] border border-pink-200">
                Vacciens
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" className="text-gray-600 hover:text-pink-600   p-2  text-pink-400 font-semibold bg-white rounded-full shadow-[0_0_10px_rgba(255,182,193,0.6)] border border-pink-200">
                Cart
              </NavLink>
            </li>
          </ul>

          {/* Right Side: Socials & Buttons */}
          <div className="hidden md:flex items-center space-x-5">


            <ul className="flex items-center space-x-3">
              {userToken ?
                <>
                  <li><span onClick={handleLogout} className="text-pink-300 cursor-pointer hover:text-pink-400">Logout</span></li>
                  <li><NavLink to="/UpdatePass" className="text-pink-300 hover:text-pink-400">Change Password</NavLink></li>
                </>
                :
                <>
                  <li><NavLink to="/Reg" className="text-pink-300 hover:text-pink-400">Register</NavLink></li>
                  <li><NavLink to="/login" className="text-pink-300 hover:text-pink-400">Login</NavLink></li>
                </>
              }
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
              <li><NavLink to="/cart" className="text-gray-600 hover:text-pink-400" onClick={() => setIsOpen(false)}>Cart</NavLink></li>
              {
                userToken ? 
                <>
                <li><span className="text-gray-600 cursor-pointer hover:text-pink-400 " onClick={handleLogout}>Logout</span></li> 
                <li><NavLink to="/UpdatePass" className="text-pink-300 hover:text-pink-400">Change Password</NavLink></li>
                </>
                :  
                <>
                <li><NavLink to="/Reg" className="text-gray-600 hover:text-pink-400" onClick={() => setIsOpen(false)}>Register</NavLink></li>
                <li><NavLink  to="/login" className="text-gray-600 hover:text-pink-400" onClick={() => {setIsOpen(false) } }>Login</NavLink></li>
                </>
              }
              
              

              {/* <button className="bg-pink-400 text-white px-4 py-2 rounded-lg hover:bg-pink-500 transition">Get Started</button> */}
            </ul>
          </div>
        )}
      </nav>
      <Outlet />
    </>
  )
}

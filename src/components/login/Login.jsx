import { useFormik } from 'formik'
import React, { useState, useContext } from 'react'
import values from './../../../node_modules/lodash-es/values';
import includes from './../../../node_modules/lodash-es/includes';
import * as yup from 'yup';
import { phone } from 'fontawesome';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FallingLines } from 'react-loader-spinner'
import { Circles } from 'react-loader-spinner'
import { authContext } from '../../context/AuthContext';
export default function Login() {

    const [loading, setLoading] = useState(false)
    const { setuserToken } = useContext(authContext)
    const [erorrMsg, setErorrMsg] = useState(null)
    const [succMsg, setSuccMsg] = useState(false)
    const [isClicked, setIsClicked] = useState(false)
    const navigate = useNavigate()
    let user = {
        email: '',
        password: '',
    }
    async function loginUser(values) {
        setLoading(true)
        setIsClicked(true)
        const data = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values).then(function (succ) {
            setLoading(false)
            console.log(succ);
            // congratulations msg
            setSuccMsg(true)
            setuserToken(succ.data.token)
            localStorage.setItem('tkn', succ.data.token)


            setTimeout(() => {
                // navigate('./login')
            }, 2000)

            setIsClicked(false)
            setLoading(false)

        }).catch(function (err) {
            console.log(err.response.data.message);
            // err.response.data.message
            setErorrMsg(err.response.data.message)

            setTimeout(() => {
                setErorrMsg(null)
            }, 2000)

            setIsClicked(false)
            setLoading(false)

        })
    }

    const regFormik = useFormik({
        initialValues: user,
        onSubmit: loginUser,
        validationSchema:
            yup.object().shape(
                {
                    email: yup.string().email('invalid email'),
                    password: yup.string().required('password is required').min(6).max(12),


                }
            )
        ,

    })
    return (
        <div className="wrapper   bg-pink-50 py-70  ">

            <form className="max-w-md mx-auto px-8 " onSubmit={regFormik.handleSubmit} >

            {succMsg ?
                <div className="absolute top-25 p-4 mb-4 mt-10   left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-green-800 rounded-lg text-center bg-green-50 ">
                    welcome back
                </div>
                : null}

            {erorrMsg ?
                <div className="absolute top-25 p-4 mb-4 mt-10 text-red-800 rounded-lg text-center bg-red-50  left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {erorrMsg}
                </div>
                : null}

       


                <div className="relative z-0 w-full mb-5 group">
                    <input value={regFormik.values.email} onBlur={regFormik.handleBlur} onChange={regFormik.handleChange} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                    {regFormik.errors.email && regFormik.touched.email ? <div class="p-4  mt-2 mb-4 text-sm text-red-800 rounded-lg bg-blue-100 dark:bg-blue-100 text-center dark:text-red-400 text-center" role="alert">
                        {regFormik.errors.email}
                    </div> : ''}

                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input value={regFormik.values.password} onBlur={regFormik.handleBlur} onChange={regFormik.handleChange} type="text" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> password</label>
                    {regFormik.errors.password && regFormik.touched.password ? <div class="p-4  mt-2 mb-4 text-sm text-red-800 rounded-lg bg-blue-100 dark:bg-blue-100 text-center dark:text-red-400 text-center" role="alert">
                        {regFormik.errors.password}
                    </div> : ''}
                </div>
              

                <div className='flex justify-center items-center ' >
                    <button type="submit" className="text-white bg-pink-200 hover:bg-pink-200 focus:ring-4 focus:outline-none focus:ring-pink-200 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-pink-400 dark:hover:bg-pink-500 dark:focus:ring-pink-500">{loading ? 'Loading..' : 'Login'}</button>
                    <Link to='/PassSend' className='text-sm text-center w-full '> Forgot password ? </Link>
                </div>
            </form>
        </div>

    )
}

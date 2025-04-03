import { useFormik } from 'formik'
import React, { useState } from 'react'
import values from './../../../node_modules/lodash-es/values';
import includes from './../../../node_modules/lodash-es/includes';
import * as yup from 'yup';
import { phone } from 'fontawesome';
import axios from 'axios';
import { useNavigate , Link} from 'react-router-dom';
// import { FallingLines } from 'react-loader-spinner'
import { Circles } from 'react-loader-spinner'
// import { Link, useNavigate } from 'react-router-dom';


export default function Reg() {
    const [erorrMsg, setErorrMsg] = useState(null)
    const [succMsg, setSuccMsg] = useState(false)
    const [isClicked, setIsClicked] = useState(false)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()



    let user = {
        name: '',
        email: '',
        password: '',
        rePassword: '',
        phone: ''
    }


    async function regestirUser(values) {
        // console.log(values);
        setLoading(true)
        setIsClicked(true)
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
            .then(function (succ) {
                // console.log(data.data.data.message);
                // console.log(data.data.data.token);

                setLoading(false)
                console.log(succ.data.message);
                console.log(succ.data.token);

                // congratulations msg
                setSuccMsg(true)

                setTimeout(() => {
                    navigate('/login')
                }, 2000)

                setIsClicked(false)


            }).catch(function (err) {
                console.log(err.response.data.message);
                // err.response.data.message
                setErorrMsg(err.response.data.message)

                setTimeout(() => {
                    setErorrMsg(null)
                }, 2000)
                setLoading(false)
                setIsClicked(false)

            })









    }

    const regFormik = useFormik({


        initialValues: user,


        onSubmit: regestirUser,






        validationSchema:
            yup.object().shape(
                {
                    name: yup.string().required("name is required").min(3, "minimum must be 3 characters").max(12, "max must be 12 values"),
                    phone: yup.string().required('phone number is req').matches(/^01[0125][0-9]{8}$/),
                    email: yup.string().email('invalid email'),
                    password: yup.string().required('password is required').min(6).max(12),
                    rePassword: yup.string().required('password is required').oneOf([yup.ref('password'), 'pass dont match']),


                }
            )
        ,


    })
    return (
        <div className="wrapper py-7 bg-pink-50">

            




            <form className="max-w-md mx-auto px-8" onSubmit={regFormik.handleSubmit}>

            {succMsg ?
                <div className="p-4 mb-4 text-green-800 rounded-lg text-center bg-gree-50 ">
                    congratulations
                </div>
                : null}

            {erorrMsg ?
                <div className="p-4 mb-4 text-red-800 rounded-lg text-center bg-red-50 ">
                    {erorrMsg}
                </div>
                : null}

                <div className="relative z-0 w-full mb-5 group">
                    <input value={regFormik.values.name} onChange={regFormik.handleChange} onBlur={regFormik.handleBlur} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transdiv -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">name</label>
                    {regFormik.errors.name && regFormik.touched.name ? <div class="p-4  mt-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {regFormik.errors.name}
                    </div> : ''}



                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input value={regFormik.values.email} onBlur={regFormik.handleBlur} onChange={regFormik.handleChange} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                    {regFormik.errors.email && regFormik.touched.email ? <div class="p-4  mt-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {regFormik.errors.email}
                    </div> : ''}

                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input value={regFormik.values.password} onBlur={regFormik.handleBlur} onChange={regFormik.handleChange} type="text" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> password</label>
                    {regFormik.errors.password && regFormik.touched.password ? <div class="p-4  mt-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {regFormik.errors.password}
                    </div> : ''}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input value={regFormik.values.rePassword} onBlur={regFormik.handleBlur} onChange={regFormik.handleChange} type="text" name="rePassword" id="rePassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
                    {regFormik.errors.rePassword && regFormik.touched.rePassword ? <div class="p-4  mt-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {regFormik.errors.rePassword}
                    </div> : ''}
                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input value={regFormik.values.phone} onBlur={regFormik.handleBlur} onChange={regFormik.handleChange} type="text" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm phone</label>
                    {regFormik.errors.phone && regFormik.touched.phone ? <div class="p-4  mt-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {regFormik.errors.phone}
                    </div> : ''}
                </div>


                {/* {isClicked ? <Circles
                    height="40"
                    width="40"
                    color="#0000FF"
                    ariaLabel="circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                /> :
                    <button type="submit" className="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">Submit</button>
                } */}

                <div className='flex justify-center items-center ' >

                    <button type="submit" className="text-white bg-pink-700 hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800">{loading ? 'Loading..' : 'Regester'}</button>



                    <Link to='/login' className='text-sm text-center w-full '> Have account ? </Link>

                </div>


            </form>
        </div>

    )
}

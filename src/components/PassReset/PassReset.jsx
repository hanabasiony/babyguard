import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import values from './../../../node_modules/lodash-es/values';
import includes from './../../../node_modules/lodash-es/includes';
import * as yup from 'yup';
import { phone } from 'fontawesome';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FallingLines } from 'react-loader-spinner'
import { authContext } from '../../context/AuthContext';

export default function PassReset() {

    const { setuserToken } = useContext(authContext)

    const [erorrMsg, setErorrMsg] = useState(null)
    const [succMsg, setSuccMsg] = useState(false)
    const [isClicked, setIsClicked] = useState(false)

    const navigate = useNavigate()



    let user = {
      
        email: '',
        newPassword: '',
      
    
    }


    async function loginUser(values) {
        // console.log(values);
        setIsClicked(true)
        const data = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', values)
        .then(function (succ) {

            console.log(succ);
            // console.log(succ.data.token);
            
            setuserToken(succ.data.token)

            // localStorage.setItem('tkn', succ.data.token)
            // congratulations msg
            // setSuccMsg(true)

            // setTimeout(() => {
                // navigate('./login')
            // }, 2000)

            // setIsClicked(false)


        }).catch(function (err) {
            // console.log(err.response.data.message);
            // err.response.data.message
            // setErorrMsg(err.response.data.message)
            

            setTimeout(() => {
                // setErorrMsg(null)
            }, 2000)

            // setIsClicked(false)

        })

    }

    const regFormik = useFormik({


        initialValues: user,


        onSubmit: loginUser,

        validationSchema:
            yup.object().shape(
                {
                    email: yup.string().email('invalid email'),
                    newPassword: yup.string().required('password is required').min(6).max(12),


                }
            )
        ,


    })
    return (
        <div className="wrapper pt-50 pb-15">

      




            <form className="max-w-md mx-auto" onSubmit={regFormik.handleSubmit}>

   


                <div className="relative z-0 w-full mb-5 group">
                    <input value={regFormik.values.email} onBlur={regFormik.handleBlur} onChange={regFormik.handleChange} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                    {regFormik.errors.email && regFormik.touched.email ? <div class="p-4  mt-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {regFormik.errors.email}
                    </div> : ''}

                </div>
                <div className="relative z-0 w-full mb-5 group">
                    <input value={regFormik.values.newPassword} onBlur={regFormik.handleBlur} onChange={regFormik.handleChange} type="text" name="newPassword" id="newPassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="newPassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> newPassword</label>
                    {regFormik.errors.newPassword && regFormik.touched.newPassword ? <div class="p-4  mt-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {regFormik.errors.newPassword}
                    </div> : ''}
                </div>
                


              
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Reset</button>
                




            </form>
        </div>

    )
}

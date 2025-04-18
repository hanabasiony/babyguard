import { useState } from 'preact/hooks'
import '@fortawesome/fontawesome-svg-core'
import '@fortawesome/react-fontawesome'

import './app.css'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Login from './components/login/Login';
import Notfound from './components/notfound/Notfound'
// import ProtectedRoute from './components/test/test'
import Reg from './components/Reg/Reg'
import Home from './components/home/home'
import Categories from './components/categories/categories'
// import Brands from './components/Brands'
import Brands from './components/Brands/Brands';
import AuthcontextProvider from './context/AuthContext'

// import Test from './components/test/test'

import ProtectedRoute from './components/test/test'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PassSend from './components/PassSend/PassSend'
import VerifyResetCode from './components/verifyResetCode/verifyResetCode'
import PassReset from './components/PassReset/PassReset'
import UpdateLoggedUserPassword from './components/UpdateLoggedUserPassword/UpdateLoggedUserPassword'
import Vacciens from './components/Vacciens/Vacciens'
import PaymentPage from './components/PaymentPage/PaymentPage'
import ChildProfile from './components/ChildProfile/ChildProfile'
import PregnancyTips from './components/pregnancyTips/PregnancyTips'
import ContactUs from './components/ContactUs/ContactUs'
import ProductDetails from './components/ProductDetails/ProductDetails'
import AboutUs from './components/AboutUs/AboutUs'


const router = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { path: 'login', element: <Login /> },
      { path: 'UpdatePass', element: <UpdateLoggedUserPassword/> },
      { path: 'Reg', element: <Reg/> },
      { path: '*', element: <Notfound /> },{
        path: 'home', element:
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
      },
      { path: 'categories', element: <Categories/> },
      { path: 'brands', element: <Brands/> },
      { path: 'PassSend', element: <PassSend/> },
      { path: 'PassSend/VerifyResetCode', element: <VerifyResetCode/> },
      { path: 'PassSend/VerifyResetCode/PassReset', element: <PassReset/> },
      {path: 'vacciens', element:<Vacciens/>},
      {path: 'payment' , element:<ProtectedRoute>
        <PaymentPage/>
      </ProtectedRoute>},
      {path: 'childProfile' , element:<ProtectedRoute>
        <ChildProfile/>
      </ProtectedRoute>},
      { path: 'pregnancyTips', element: <PregnancyTips/> },

      { path: 'contactUs', element: <ContactUs/> },
      { path: 'productDetails/:id', element: <ProtectedRoute>
       <ProductDetails/>
      </ProtectedRoute> },
      {path:'aboutUs' , element: <AboutUs/>},




      

    ]
  }
])

const client = new QueryClient({
  defaultOptions:{
    // refetch
  }
})



export function App() {

  return (
    <>
      <QueryClientProvider client={client}>
        <AuthcontextProvider>

          <RouterProvider router={router} />

        </AuthcontextProvider>
      </QueryClientProvider>
    </>
  )
}

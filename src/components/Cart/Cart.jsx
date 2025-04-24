// import React from 'react'
// import { Trash2, Plus, Minus } from 'lucide-react';

// export default function Cart() {
//   return (
//     <div>

//     </div>
//   )
// }


import React, { useContext } from 'react';
import { Trash, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import LoaderScreen from '../loaderScreen/loaderScreen';
import toast from 'react-hot-toast';

// const babyCartItems = [
//   {
//     id: 1,
//     title: "Baby Onesie - Blue Clouds",
//     price: 250,
//     quantity: 2,
//     image: "/images/onesie.jpg",
//   },
//   {
//     id: 2,
//     title: "Soft Plush Elephant Toy",
//     price: 180,
//     quantity: 1,
//     image: "/images/elephant.jpg",
//   },
//   {
//     id: 3,
//     title: "Organic Baby Lotion",
//     price: 90,
//     quantity: 3,
//     image: "/images/lotion.jpg",
//   },
// ];

const Cart = () => {

    const navigate = useNavigate()
    const { products, totalCartPrice , updateCount ,removeElementFromCrat} = useContext(CartContext)
    // console.log('from cart ', products);

    
    //   const total = babyCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    // function postUserCart(){
    //     setIsLoading(true)
    //     axios.post('http://localhost:8000/api/carts',
    //         { headers:{
    //             Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MDNkYzBkNGFkNmM0YzE0MzAwYTYxNiIsImlhdCI6MTc0NTE1Nzc0NiwiZXhwIjoxNzQ1MTY4NTQ2fQ.Xbr0RDRLMUBUfnR2YRbdP9MNiTXcDhKuH9C6uPUXIsw'
    //         } }
    //     )
    // 

    // thhhhhiiiiiisssss
    // function handleChangeCount() {
    //     axios.post('https://ecommerce.routemisr.com/api/v1/cart',
    //         {
    //             headers: {
    //                 token: user
    //             }
    //         }
    //     )


    //         .then(function (res) {
    //             console.log('res', res.data.data);
    //             console.log('res', res.data.numOfCartItems);
    //             setNumOfCartItems(res.data.numOfCartItems)
    //             // console.log('res', res.data.data.totalCartPrice);
    //             setTotalCartPrice(res.data.data.totalCartPrice)
    //             // console.log('res', res.data.data.products);
    //             setProducts(res.data.data.products)

    //             setIsLoading(false)

    //         })
    //         .catch(function (err) {
    //             // console.log('err',err);

    //         })
    // }

    function handleChangeCount(id, newCount){
        updateCount(id,newCount)
    }

    async function handleDelete(id){
        const isSucces = await removeElementFromCrat(id)
        if(isSucces){
            toast.success('Deleted succesfully')
        }else{
            toast.error('error ')
        }
    }

 

    if(!products){
        return <LoaderScreen/>
    }

    return (
        <div className="max-w-5xl py-30 mx-auto p-6 bg-whitw min-h-screen">

            <p className="text-pink-500 mb-6 text-lg font-medium">
                Total: {totalCartPrice} EGP
            </p>

            {products?.map(product => (
                <div
                    key={product._id}
                    className="flex items-center justify-between bg-white rounded-2xl shadow p-4 mb-4"
                >
                    <div className="flex items-center gap-4">
                        <img
                            src={product.product.imageCover}
                            alt={product.product.title}
                            className="w-20 h-20 rounded-xl object-cover border-2 border-pink-200"
                        />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-700">{product.title}</h3>
                            <p className="text-pink-500 font-medium text-sm">Price: {product.price} EGP</p>
                            <button
                                className="mt-2 flex items-center text-xs text-pink-400 cursor-pointer hover:underline"
                                onClick={() => {handleDelete(product.product._id )}}
                            >
                                <Trash className="w-4 h-4 mr-1" /> Remove
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button onClick={()=> handleChangeCount (product.product._id , product.count + 1) }

                            className="bg-pink-200 cursor-pointer text-pink-800 px-2 py-1 rounded-full hover:bg-pink-300"
                        >
                            <Plus size={16} />
                        </button>
                        <span className="text-md font-semibold text-gray-700">{product.count}</span>
                        <button onClick={()=> handleChangeCount (product.product._id , product.count -  1) }

                            className="bg-pink-200 text-pink-800 px-2 py-1 cursor-pointer rounded-full hover:bg-pink-300"
                        >
                            <Minus size={16} />
                        </button>
                    </div>
                </div>
            ))}

            <div className="mt-6 text-center">
                <button onClick={function () { navigate('/payment') }} className="bg-pink-500 text-white px-6 py-3 rounded-full shadow hover:bg-pink-600 cursor-pointer text-lg font-semibold">
                    Proceed to Checkout
                </button>
            </div>
        </div>
    );
};

export default Cart;
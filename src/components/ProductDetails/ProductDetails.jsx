import React, { useContext } from "react";
import { Star } from "lucide-react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoaderScreen from "../loaderScreen/loaderScreen";
import { CartContext } from "../../context/CartContext";
import toast from "react-hot-toast";

export default function ProductDetalis() {





  const { id } = useParams()
  // const { addProductToCart } = useContext(CartContext)
  const { addProductsToCart, updateCount, products, numOfCartItems } = useContext(CartContext)

  // try
  // const cartItem = products?.find(p => p.product._id === id);

  // orifinal
  // function handleChangeCount(id, newCount) {
  //   updateCount(id, newCount)
  // }

  
  // async function handleChangeCount() {

  //   const res = await updateCount(id, newCount)

  //   if (res) {
  //     console.log('succes');
  //     toast.success('success', { duration: 3000, position: "top-center" })

  //   } else {
  //     console.log('error');
  //     toast.error('error', { duration: 3000, position: "top-center" })

  //   }
  // }


  // function handleAddToCart() {
  //   addProductsToCart(id)
  // }

  async function handleAddToCart() {
    const res = await addProductsToCart(id)



    if (res) {
      console.log('succes');
      toast.success('success', { duration: 3000, position: "top-center" })

    } else {
      console.log('error');
      toast.error('error', { duration: 3000, position: "top-center" })

    }
  }


  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)


  }



  const { data, isError, isLoading } = useQuery({
    queryKey: ["productDetails"],
    queryFn: getProductDetails,
  })



  const ProductDetalisObject = data?.data.data
  console.log(ProductDetalisObject);



  if (isError) {
    return <div>product not found with this id</div>
  }

  if (isLoading) {
    return <LoaderScreen />
  }


  return (
    <div className="bg-whitea py-50">
      <div className="p-6 max-w-5xl mx-auto font-sans">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <img
              src={ProductDetalisObject?.imageCover}
              alt="Soft Cotton Onesie" a
              className="rounded-xl w-[50%]"
            />
            <div className="flex gap-2">



            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-2xl font-semibold">{ProductDetalisObject?.title}</h1>
            <p className="text-sm text-gray-600 mb-2">{ProductDetalisObject?.subcategory.slug}</p>
            <p className="text-xl font-bold mb-2">{ProductDetalisObject?.price}</p>
            <div className="flex items-center text-yellow-400 mb-4">
              {Array.from({ length: ProductDetalisObject?.ratingsAverage || 0 }).map((_, i) => (
                <Star key={i} size={18} fill="currentColor" />
              ))}
              <span className="text-gray-500 ml-2">4.0</span>
            </div>
            <p className="text-gray-700 mb-4">
              {ProductDetalisObject?.escription}
            </p>

            <div className="flex items-center space-x-3 mb-4">
              <button className="px-3 py-1 border rounded cursor-pointer "  >-</button>
              <span>{numOfCartItems}</span>
              <button className="px-3 py-1 border rounded cursor-pointer"  >+</button>
              <button onClick={handleAddToCart} className="bg-pink-400 cursor-pointer text-white px-4 py-2 rounded hover:bg-pink-500">
                Add to Cart
              </button>
            </div>

            <p className="text-sm text-gray-500">Free delivery for orders above EGP 300</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-10">
          <div className="flex space-x-6 border-b border-gray-200 mb-4">
            <button className="pb-2 border-b-2 border-blue-500 text-blue-600 font-medium">Description</button>
            <button className="pb-2 text-gray-500">Features</button>
            <button className="pb-2 text-gray-500">Reviews</button>
            <button className="pb-2 text-gray-500">Related Products</button>
          </div>

          <p className="text-gray-700 mb-6">
            This adorable onesie is made from ultra-soft organic cotton. Designed for comfort and easy
            diaper changes with secure snap buttons.
          </p>

          {/* Features & Reviews */}
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="text-lg font-semibold mb-2">Features</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>100% Organic Cotton</li>
                <li>Machine washable</li>
                <li>Snap closures for easy dressing</li>
                <li>Hypoallergenic fabric</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Reviews</h3>
              <p className="text-gray-700 mb-2">“Super soft and fits perfectly! Will buy more.” – Sarah M.</p>
              <p className="text-gray-700">“Loved the quality, My baby looks so comfy!” – Nour F.</p>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-10">
            <h3 className="text-lg font-semibold mb-4">Related Products</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="border rounded-xl p-4 text-center">
                {/* <img src="/images/blanket.png" alt="Cozy Baby Blanket" className="rounded-lg mb-2" /> */}
                <p>Cozy Baby Blanket</p>
                <p className="font-semibold">EGP 200</p>
              </div>
              <div className="border rounded-xl p-4 text-center">
                {/* <img src="/images/hat.png" alt="Cotton Baby Hat" className="rounded-lg mb-2" /> */}
                <p>Cotton Baby Hat</p>
                <p className="font-semibold">EGP 80</p>
              </div>
              <div className="border rounded-xl p-4 text-center">

                <p>Cotton Prissah</p>
                <p className="font-semibold">EGP 70</p>
              </div>
              <div className="border rounded-xl p-4 text-center">

                <p>Footed Pajamas</p>
                <p className="font-semibold">EGP 170</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  );
};

;
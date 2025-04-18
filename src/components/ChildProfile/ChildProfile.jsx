import React from "react";
import { Calendar, Bell, Plus, Info } from "lucide-react";
import { BabyIcon } from "lucide-react";

export default function ChildDashboard() {
    return (
        <div className="w-full bg-white">
            <div className="p-4 py-40 md:p-8 max-w-7xl mx-auto space-y-6 md:py-40 sm:py-50">

                <div className="flex flex-col md:flex-row items-center justify-between p-6  rounded-2xl shadow bg-white">
                    <div className="flex items-center space-x-4">
                        <img
                            // src={}
                            alt="Profile"
                            className="w-20 h-20 rounded-full"
                        />
                        <div>
                            <h2 className="text-xl font-semibold">Emily Johnson</h2>
                            <p className="text-sm text-gray-500">Age: 18 months &bull; Gender: Female</p>
                        </div>
                    </div>
                    <button className="mt-4 md:mt-0 px-4 py-2 bg-pink-100 text-pink-600 rounded-lg hover:bg-pink-200">
                        <i class="fa-solid fa-pen-to-square"></i>
                        <span className="ms-2"> Edit Profile</span>
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                    <div className="col-span-1 md:col-span-2 bg-white p-4 rounded-2xl shadow space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg">Vaccination Summary</h3>
                            <div className="space-x-2">
                                <button className="px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-gray-200">All</button>
                                <button className="px-3 py-1 text-xs bg-gray-100 rounded hover:bg-gray-200">Upcoming</button>
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-green-600">Latest Taken</p>
                            <p className="text-sm">MMR Vaccine</p>
                            <p className="text-xs text-gray-500">Taken on April 10, 2025</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-yellow-600">Upcoming</p>
                            <p className="text-sm">DPT Booster</p>
                            <p className="text-xs text-gray-500">Scheduled for May 15, 2025</p>
                        </div>
                        <button className="w-full px-4 py-2 bg-blue-50 text-blue-700 rounded hover:bg-blue-100">
                            View Full Vaccination History
                        </button>
                    </div>

                    <div className="bg-white p-4 rounded-2xl shadow space-y-4">
                        <h3 className="font-semibold text-lg">Vaccine Requests</h3>
                        <div className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                            <div>
                                <p className="text-sm font-medium">Hepatitis B Vaccine</p>
                                <p className="text-xs text-gray-500">April 25, 2025 • City Hospital</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 text-xs rounded">Pending</span>
                                <button className="text-red-500 hover:text-red-700">✕</button>
                            </div>
                        </div>
                    </div>


                    <div className="col-span-1 md:col-span-2 bg-white p-4 rounded-2xl shadow space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg">Purchased Products</h3>
                            <a href="#" className="text-sm text-blue-600 hover:underline">View All Orders</a>
                        </div>
                        <div className="p-3 bg-gray-100 rounded-lg flex justify-between items-center">
                            <div>
                                <p className="text-sm font-medium">Baby Formula XYZ</p>
                                <p className="text-xs text-gray-500">Purchased on April 15, 2025</p>
                            </div>
                            <p className="text-sm">Qty: 2</p>
                        </div>
                    </div>

               

                    <div className="bg-white p-4 rounded-2xl shadow">
                        <span className="m-2 "> Quick Actions </span>
                        <div className=" grid grid-cols-2 gap-4 mt-4">

                            <button className="flex items-center justify-center px-4 py-2 bg-pink-100 text-pink-600 rounded hover:bg-pink-200">
                                <Info className="w-4 h-4 mr-2" /> Medical Info
                            </button>
                            <button className="flex items-center justify-center px-4 py-2 bg-blue-100 text-blue-600 rounded hover:bg-blue-200">
                                <Calendar className="w-4 h-4 mr-2" /> Vaccination Calendar
                            </button>
                            <button className="flex items-center justify-center px-4 py-2 bg-purple-100 text-purple-600 rounded hover:bg-purple-200">
                                <Bell className="w-4 h-4 mr-2" /> Reminders
                            </button>
                            <button className="flex items-center justify-center px-4 py-2 bg-green-100 text-green-600 rounded hover:bg-green-200">
                                <Plus className="w-4 h-4 mr-2" /> Add Child
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
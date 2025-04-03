import React from 'react'
import { FallingLines } from 'react-loader-spinner'


export default function LoaderScreen() {
    return (
        <div>
            <div className=" h-screen flex justify-center items-center ">
                <FallingLines
                    color="#4fa94d"
                    width="100"
                    visible={true}
                    ariaLabel="falling-circles-loading"
                />
            </div>
        </div>
    )
}

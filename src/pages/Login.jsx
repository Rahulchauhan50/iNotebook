import React from 'react'
import { Link } from 'react-router-dom'

export default function
    () { 
    return (
        <div>
            <div className={`bg-[url('https://i.ibb.co/VYh6sdW/index.png')] bg-no-repeat bg-cover flex flex-row`}>
                <div className='w-full md:w-1/2'>
                    <div className='h-full min-h-screen bg-[#15202b]'>
                       
                        <div className='md:w-[90%] w-[95%] mx-auto mt-0 pt-[2vh]'>
                            <p className='text-gray-300 my-2 mx-8'>START FOR FREE</p>
                            <p className='text-white my-2 mx-8 md:text-[40px] text-3xl font-semibold'>Login with an account</p>
                            <p className='text-gray-300 my-4 mx-8'>Don't have any account? <Link to='/signup' > <span className='text-blue-600'>Sign up</span></Link></p>
                            <form className='mx-8 w-full mt-8'>

                                <div>

                                </div>
                                <div className='w-[82%]'>
                                    <div className='my-2 py-2' >
                                        <input className='outline-none focus:outline-blue-500 outline-[2px] hover:bg-[#2c3f50] bg-[#22303c] pl-5 w-full h-14 border-none text-white rounded-3xl' placeholder='Email' />
                                    </div>
                                    <div className='my-2 py-2' >
                                        <input className='bg-[#22303c] pl-5 w-full h-14 border-none outline-none hover:bg-[#2c3f50] focus:outline-blue-500 outline-[2px] text-white rounded-3xl' placeholder='Password' />
                                    </div>
                                    <div className='flex my-5 justify-between flex-row'>
                                        <button className='bg-[#22303c] text-white border-none border rounded-3xl h-12 w-[40%]'>Change method</button>
                                        <button className='text-white bg-blue-500 hover:bg-blue-600 border-none border rounded-3xl h-12 w-[40%]'>Log In</button>
                                    </div>
                                    <div className='my-2 py-2' >
                                        <button className='flex justify-center flex-row items-center outline-none focus:outline-blue-500 outline-[2px] bg-[#22303c] hover:bg-[#263949] w-full h-14 border-none text-white rounded-3xl' >
                                            <div className='mx-3' >
                                                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="40px" height="40px">
                                                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                                                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                                                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                                                </svg>
                                            </div>
                                            <span>Log In with Google</span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div style={{ height: "inherit" }} className='md:w-1/2 w-0 bg-gradient-to-r from-[#15202b] to-[#15202b00]'></div>
            </div>
        </div>
    )
}



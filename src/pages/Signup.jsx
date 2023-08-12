import React,{ useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../redux/features/User';
import { useUserSignupMutation } from '../redux/services/UserAuth'
import { useNavigate } from 'react-router-dom'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "./FirebaseConfig"


export default function() { 
    const [SignUPUser, { isLoading }] = useUserSignupMutation();
    const fristNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const cpasswordRef = useRef(null);
    const [isError, setIsError] = useState(false);
    const [match, setmatch] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleSignUp = async (e) => {
        e.preventDefault();
        const fristName = fristNameRef.current?.value;
        const lastName = lastNameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const cpassword = cpasswordRef.current?.value;
        if(password !== cpassword){
            setmatch(false)
            return;
        }
    
        SignUPUser({fristName, lastName, email, password })
          .unwrap()
          .then((data) => {
            if (data?.success === true) {
              setIsError(false)
              dispatch(setUserDetails(data));
              localStorage.setItem("token", data.authToken)
              navigate('/New-Folder/New-note')
            }
          })
          .catch((error) => {
            console.error('Error Authenicationg user');
          });
      }

      const HandleGoogleSignUP = async () => {
        const provider = new GoogleAuthProvider();
    
        try {
          const { user } = await signInWithPopup(firebaseAuth, provider);
          const names = await user?.reloadUserInfo?.displayName?.split(' ')
          SignUPUser({ profileImage: user.reloadUserInfo.photoUrl, fristName: names[0], lastName: names.length>1?names[1]:"" ,email: user.reloadUserInfo.email, password: user.reloadUserInfo.providerUserInfo[0].rawId })
            .unwrap()
            .then((data) => {
              if (data?.success === true) {
                localStorage.setItem("token", data.authToken)
                dispatch(setUserDetails(data))
                navigate('/New-Folder/New-note')
              } else {
                console.log("user already exist")
              }
            })
            .catch((error) => {
              console.error('Error Authenicationg user', error);
              if ("user already exist" === error?.data?.error) {
                // dispatch(setAlert(true))
                // dispatch(setAlertMsg('user already exist SignIn instead'))
              }
            });
        } catch (error) {
          if (error.code === 'auth/cancelled-popup-request') {
            console.log('User canceled the sign-in process.');
          } else {
            console.error('Error signing in:', error);
          }
        }
      };
    

    return (
        <div>
            <div className={`bg-[url('https://i.ibb.co/VYh6sdW/index.png')] bg-no-repeat bg-cover flex flex-row`}>
                <div className='w-full md:w-1/2'>
                    <div className='h-full min-h-screen bg-[#15202b]'>
                       
                        <div className='md:w-[90%] w-[95%] mx-auto mt-0 pt-[2vh]'>
                            <p className='text-gray-300 my-2 mx-8'>START FOR FREE</p>
                            <p className='text-white my-2 mx-8 md:text-[40px] text-3xl font-semibold'>Create a new account</p>
                            <p className='text-gray-300 my-2 mx-8'>Already a Member? <Link to='/login'> <span className='text-blue-600'>Login</span></Link></p>
                            <form onSubmit={handleSignUp} className='justify-center w-full mt-8'>

                                <div className='w-full py-2 my-2 flex gap-2 flex-row justify-between md:justify-start'>
                                    <div className='md:w-[40%] w-[45%]'>
                                        <input minLength={3} required ref={fristNameRef} type='text' name='fristName' className='hover:bg-[#2c3f50] outline-none focus:outline-blue-500 outline-[2px] bg-[#22303c] pl-5 w-full h-14 border-none text-white rounded-3xl' placeholder='Frist Name'></input>
                                    </div>
                                    <div className='md:w-[40%] w-[45%]'>
                                        <input minLength={2} required ref={lastNameRef} type='text' name='lastName' className='hover:bg-[#2c3f50] outline-none focus:outline-blue-500 outline-[2px] bg-[#22303c] pl-5 w-full h-14 border-none text-white rounded-3xl' placeholder='Last Name'></input>
                                    </div>
                                </div>
                                <div>

                                </div>
                                <div className='w-[100%] md:w-[82%] justify-center'>
                                    <div className='my-2 py-2' >
                                        <input required onInput={()=>{setIsError(false)}}  ref={emailRef} type='email' name='email' className={`hover:bg-[#2c3f50] ${isError?"outline outline-red-500 outline-[1px]":"outline-none focus:outline-blue-500 outline-[2px]"}  bg-[#22303c] pl-5 w-full h-14 border-none text-white rounded-3xl`} placeholder='Email' />
                                        {isError && <p className='text-red-500 text-sm mt-1 mb-0 mx-3'>User already exist</p>}
                                        
                                    </div>
                                    <div className='my-2 py-2' >
                                        <input minLength={8} required onInput={()=>{setmatch(true)}} ref={passwordRef} type='password' name='password' className={`hover:bg-[#2c3f50] bg-[#22303c] pl-5 w-full h-14 border-none ${!match?"outline outline-red-500 outline-[1px]":"outline-none focus:outline-blue-500 outline-[2px]"} text-white rounded-3xl`} placeholder='Password' />
                                    </div>
                                    <div className='my-2 py-2' >
                                        <input minLength={8} required onInput={()=>{setmatch(true)}} ref={cpasswordRef} type='password' name='cpassword' className={`hover:bg-[#2c3f50] bg-[#22303c] pl-5 w-full h-14 border-none ${!match?"outline outline-red-500 outline-[1px]":"outline-none focus:outline-blue-500 outline-[2px]"} text-white rounded-3xl`} placeholder='Comfirm Password' />
                                        {!match && <p className='text-red-500 text-sm mt-1 mb-0 mx-3'>Password not matched</p>}
                                    </div>
                                    <div className='flex my-5 justify-between flex-row'>
                                        <button className='bg-[#22303c] text-white border-none border rounded-3xl h-12 md:w-[40%] w-[45%]'>change method</button>
                                        <button onClick={handleSignUp} className='text-white bg-blue-500 hover:bg-blue-600 border-none border rounded-3xl h-12 md:w-[40%] w-[45%]'>
                                        <div className='mx-auto flex justify-center'>
                                           {isLoading &&  <svg class="animate-spin mx-2 w-[20px] text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>}
                                           Create account
                                           </div>
                                        </button>
                                    </div>
                                    <div className='my-2 py-2' >
                                        <button onClick={HandleGoogleSignUP} className='flex justify-center flex-row items-center outline-none focus:outline-blue-500 outline-[2px] bg-[#22303c] hover:bg-[#263949] w-full h-14 border-none text-white rounded-3xl' >
                                            <div className='mx-3' >
                                                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="40px" height="40px">
                                                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                                                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                                                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                                                </svg>
                                            </div>
                                            <span className=''>Sign Up with Google</span>
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

// Import react from react package
import React from 'react'

// Import useRouter to route the path
import { useRouter } from 'next/router'

// Import head from Next head package
import Head from 'next/head'

// Import link from next link package
import Link from 'next/link'

// Import useState from react package
import { useState } from 'react'

// Import react toastify
import { ToastContainer, toast } from "react-toastify";

// Import react toastify CSS
import 'react-toastify/dist/ReactToastify.css';

// Signup component of signup page
const Signup = (props) => {

    
    let router= useRouter()

    // Data variables of Sign up form
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [phoneNo, setPhone] = useState();
    const [password, setPassword] = useState();

    // Handle the change of the form 
    const handleChange = (e) => {
        if (e.target.name == 'firstName') {
            setFirstName(e.target.value);
        } else if (e.target.name == 'lastName') {
            setLastName(e.target.value);
        } else if (e.target.name == 'email') {
            setEmail(e.target.value);
        } else if (e.target.name == 'phoneNo') {
            setPhone(e.target.value);
        } else if (e.target.name == 'password') {
            setPassword(e.target.value);
        }
    }

    // React Toast
    const emailAlreadyExistsToast = () => toast('Email Already Exists...', {
        autoClose: 2000,
        type: 'error'
    })
    const phoneAlreadyExistsToast = () => toast('Phone Number Already Exists...', {
        autoClose: 2000,
        type: 'error'
    })
    const somethingWentWrongToast = () => toast('Some Went Wrong...', {
        autoClose: 2000,
        type: 'error'
    })

    // Handle the submit button and call the Signup API
    const handleSubmit = async (e) => {
        // prevent from the reload of page 
        e.preventDefault();

        props.setProgress(30);

        // Data of sign up form 
        const data = { firstName, lastName, email, phoneNo, password };

        // Call the signup API 
        let res = await fetch('https://eduno.in/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        props.setProgress(80);

        // Respone of above API stores in this variable
        let response = await res.json();

        // Toast on the basis of response of API
        if (response.success == true) {
            // Set the token in local storage of browser
            localStorage.setItem('loginToken', response.token);
            localStorage.setItem('userName', response.userName);
            router.push("https://eduno.in/")
        } else if (response.error == "Phone Number already exists.") {
            phoneAlreadyExistsToast();
        } else if (response.error == "User already exists.") {
            emailAlreadyExistsToast();
        } else {
            somethingWentWrongToast();
        }
    }

    // Return of signup component
    return (

        <>

            {/* Head of the page  */}
            <Head>
                <title>Create your Account | Eduno (Empower yourself with Eduno)</title>
            </Head>

            {/* Toast container to show the toast  */}
            <ToastContainer />

            {/* Main div element */}
            <div>

                {/* background div  */}
                <div className="bg-[#001719] py-6 sm:py-8 lg:py-12">

                    {/* signup div  */}
                    <div className="mx-auto max-w-screen-2xl px-4 md:px-8">

                        {/* Sign up heading  */}
                        <h2 className="mb-4 text-center text-3xl font-bold text-[#a2cc4c] md:mb-8 lg:text-4xl">Sign Up</h2>

                        {/* Form of the sign up page  */}
                        <form onSubmit={handleSubmit} className="mx-auto max-w-lg rounded-lg border border-[#a1cc4c8c]">

                            {/* Input div  */}
                            <div className="flex flex-col gap-4 p-4 md:p-8">

                                {/* First Name input  */}
                                <div>
                                    <label htmlFor="firstName" className="mb-2 inline-block text-sm text-white sm:text-base">First Name</label>
                                    <input value={firstName} onChange={handleChange} id='firstName' name="firstName" placeholder='First Name' className="w-full rounded border bg-gray-300 px-3 py-2 text-black outline-none ring-[#a2cc4c] transition duration-100 focus:ring" required />
                                </div>

                                {/* Last Name input  */}
                                <div>
                                    <label htmlFor="lastName" className="mb-2 inline-block text-sm text-white sm:text-base">Last Name</label>
                                    <input value={lastName} onChange={handleChange} id='lastName' name="lastName" placeholder='Last Name' className="w-full rounded border bg-gray-300 px-3 py-2 text-black outline-none ring-[#a2cc4c] transition duration-100 focus:ring" required />
                                </div>

                                {/* Email Input  */}
                                <div>
                                    <label htmlFor="email" className="mb-2 inline-block text-sm text-white sm:text-base">Email</label>
                                    <input value={email} onChange={handleChange} id='email' name="email" type="email" placeholder='E-mail/G-mail' className="w-full rounded border bg-gray-300 px-3 py-2 text-black outline-none ring-[#a2cc4c] transition duration-100 focus:ring" required />
                                </div>

                                {/* Phone number input  */}
                                <div>
                                    <label htmlFor="phoneNo" className="mb-2 inline-block text-sm text-white sm:text-base">Phone No</label>
                                    <input value={phoneNo} onChange={handleChange} id='phoneNo' name="phoneNo" placeholder='Contact Number' className="w-full rounded border bg-gray-300 px-3 py-2 text-black outline-none ring-[#a2cc4c] transition duration-100 focus:ring" required />
                                </div>

                                {/* Password input  */}
                                <div>
                                    <label htmlFor="password" className="mb-2 inline-block text-sm text-white sm:text-base">Password</label>
                                    <input value={password} onChange={handleChange} id='password' name="password" type="password" placeholder="Password" className="w-full rounded border bg-gray-300 px-3 py-2 text-black outline-none ring-[#a2cc4c] transition duration-100 focus:ring" required />
                                </div>

                                {/* Submit button of sign up page  */}
                                <button className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-[#a1cc4cbd] focus-visible:ring active:bg-gray-600 md:text-base">Create Account </button>

                                {/* Continue with Facebook button  */}
                                <button className="flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-blue-300 transition duration-100 hover:bg-blue-600 focus-visible:ring active:bg-blue-700 md:text-base">
                                    <svg className="h-5 w-5 shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 0C5.37273 0 0 5.37273 0 12C0 18.0164 4.43182 22.9838 10.2065 23.8516V15.1805H7.23764V12.0262H10.2065V9.92727C10.2065 6.45218 11.8996 4.92655 14.7878 4.92655C16.1711 4.92655 16.9025 5.02909 17.2489 5.076V7.82945H15.2787C14.0525 7.82945 13.6244 8.99182 13.6244 10.302V12.0262H17.2178L16.7302 15.1805H13.6244V23.8773C19.4815 23.0825 24 18.0747 24 12C24 5.37273 18.6273 0 12 0Z" fill="white" />
                                    </svg>

                                    Continue with Facebook
                                </button>

                                {/* Continue with google button  */}
                                <button className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-8 py-3 text-center text-sm font-semibold text-gray-800 outline-none ring-gray-300 transition duration-100 hover:bg-gray-100 focus-visible:ring active:bg-gray-200 md:text-base">
                                    <svg className="h-5 w-5 shrink-0" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.7449 12.27C23.7449 11.48 23.6749 10.73 23.5549 10H12.2549V14.51H18.7249C18.4349 15.99 17.5849 17.24 16.3249 18.09V21.09H20.1849C22.4449 19 23.7449 15.92 23.7449 12.27Z" fill="#4285F4" />
                                        <path d="M12.2549 24C15.4949 24 18.2049 22.92 20.1849 21.09L16.3249 18.09C15.2449 18.81 13.8749 19.25 12.2549 19.25C9.12492 19.25 6.47492 17.14 5.52492 14.29H1.54492V17.38C3.51492 21.3 7.56492 24 12.2549 24Z" fill="#34A853" />
                                        <path d="M5.52488 14.29C5.27488 13.57 5.14488 12.8 5.14488 12C5.14488 11.2 5.28488 10.43 5.52488 9.71V6.62H1.54488C0.724882 8.24 0.254883 10.06 0.254883 12C0.254883 13.94 0.724882 15.76 1.54488 17.38L5.52488 14.29Z" fill="#FBBC05" />
                                        <path d="M12.2549 4.75C14.0249 4.75 15.6049 5.36 16.8549 6.55L20.2749 3.13C18.2049 1.19 15.4949 0 12.2549 0C7.56492 0 3.51492 2.7 1.54492 6.62L5.52492 9.71C6.47492 6.86 9.12492 4.75 12.2549 4.75Z" fill="#EA4335" />
                                    </svg>

                                    Continue with Google
                                </button>
                            </div>

                            {/* Have an account section  */}
                            <div className="flex items-center justify-center bg-[#a1cc4c8c] p-4">
                                <p className="text-center text-sm text-black">Have an account? <Link href={'/authentication/signin'} className="text-indigo-200 transition duration-100 hover:text-white active:text-indigo-700">Sign In</Link></p>
                            </div>

                        </form>

                    </div>

                </div>

                <hr />

            </div>

        </>

    )

}

// Export the signup component 
export default Signup
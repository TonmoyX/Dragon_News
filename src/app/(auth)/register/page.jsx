'use client'
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { redirect, RedirectType } from 'next/navigation';
import React from 'react';

const RegisterPage = () => {
    const redirectId = '01'
    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData.entries());
        // console.log(userData);

        const {data, error} = await authClient.signUp.email({
          name : userData.name,      
          email : userData.email,
          password : userData.password,
        });
        if(data.user){
            redirect(`/category/${redirectId}`, RedirectType.push)
        }
    }
    return (
        <div className='flex flex-col mx-auto justify-center mt-20'>
            <form onSubmit={onSubmit}>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <legend className="">Register</legend>

                    <label className="label">Name</label>
                    <input type="text" className="input" name='name' placeholder="Name" />

                    <label className="label">Email</label>
                    <input type="email" className="input" name='email' placeholder="Email" />

                    <label className="label">Password</label>
                    <input type="password" className="input" name='password' placeholder="Password" />
                    <button type='submit' className="btn btn-neutral mt-4">Register</button>

                    <h1 className='mt-4'>You have no account ? <Link href = {'/login'}><span className='text-pink-400 font-bold'>Login</span></Link></h1>
                </fieldset>
            </form>
        </div>
    );
};

export default RegisterPage;
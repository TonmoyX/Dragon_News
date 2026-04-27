'use client'
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import React from 'react';

const LoginPage = () => {
    const redirectId = "01"
    const handleSubmitFunc = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const userData = Object.fromEntries(formData.entries())

        const { data, error } = await authClient.signIn.email({
            email: userData.email,
            password: userData.password,
            callbackURL : `/category/${redirectId}`
        });

    }
    return (
        <div className='flex flex-col mx-auto justify-center mt-20'>
            <form onSubmit={handleSubmitFunc}>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
                    <legend className="">Login</legend>

                    <label className="label">Email</label>
                    <input type="email" className="input" name='email' placeholder="Email" />

                    <label className="label">Password</label>
                    <input type="password" className="input" name='password' placeholder="Password" />
                    <button type='submit' className="btn btn-neutral mt-4">Login</button>

                    <h1 className='mt-4'>You have no account ? <Link href={'/register'}><span className='text-pink-400 font-bold'>Register</span></Link></h1>
                </fieldset>
            </form>
        </div>
    );
};

export default LoginPage;
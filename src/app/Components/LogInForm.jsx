'use client'
import React from 'react';
import SocialLogIn from './SocialLogIn';
import { doCredentialLogin } from '../actions/index';
import { useRouter } from 'next/navigation'
import Link from 'next/link';

const LoginForm = () => {
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formdata = new FormData(e.currentTarget);
    
            // Await the login response
            const response = await doCredentialLogin(formdata);

    
            console.log('this is response in login component =', response);
    
            // Check for error in response
            if (response.error) {
                //router.push('/');
            } else {
                router.push('/Home');
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <div className='container' style={{ height: '400px', width: '200px', backgroundColor: 'lightblue', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <form onSubmit={handleSubmit}>
                    <div style={{ width: '180px', margin:'10px' }}>Name</div>
                    <input style={{ width: '180px', margin:'10px' }} placeholder='Enter Email' type='text' name='email' />
                    <div style={{ width: '180px', margin:'10px' }}>Password</div>
                    <input style={{ width: '180px', margin:'10px' }} placeholder='Enter Password' type='password' name='password' />
                    <button style={{ width: '180px', margin:'10px' }} className='bg-black text-white p-1 rounded-md m-1 text-lg w-40' type="submit" name="action" value="credential">Log In</button>
                </form>
                <hr style={{ borderTop: '1px solid black', width: '100%' }} />
                <SocialLogIn/>
                <hr style={{ borderTop: '1px solid black', width: '100%' }} />
                <Link href='/Signup' style={{ width: '180px', margin:'10px', textAlign: 'center'}} className='bg-black text-white p-1 rounded-md m-1 text-lg w-40'>Sign UP</Link>
            </div>
        </>
    )
}

export default LoginForm

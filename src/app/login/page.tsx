"use client"

import { login} from '@/store/slice/authSlice';
import { useState } from 'react';
import type { RootState } from '@/store/redux';
import { useAppDispatch, useAppSelector } from '@/store/redux'; 



export default function LoginPage() {
    const dispatch = useAppDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {error, status} = useAppSelector((state: RootState) => state.auth);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const credentials = {username, password};
        dispatch(login(credentials));
    };




    
    return (
        <div className='min-h-screen flex  items-center justify-center'>
            <form onSubmit={handleSubmit} className='p-6 bg-white rounded shadow-md'>
                {error && <div className='text-red-500 mb-4'>{error}</div> }
                <input 
                    type="text" 
                    placeholder='username' 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    className='p-2 mb-4 border'
                />
                <input 
                    type="password" 
                    placeholder='password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className='mb-4 p-2 border'
                />
                <button
                    type='submit' disabled={status === 'loading'}>
                    
                      {status === 'loading' ? 'Loading...' : 'Login'}
                    </button>

            </form>
        </div>
    )
}
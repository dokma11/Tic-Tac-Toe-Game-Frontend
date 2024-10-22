import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();

        const credentials = {
            email: email,
            password: password,
        }

        console.log(credentials);

        const res = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        console.log(res);

        if(res.status === 200) {
            toast.success('Logged in successfully!');
            return navigate('/');
        } else {
            toast.error(res.statusText);
        }

    };
    return (
        <>
            <div className='container m-auto max-w-2xl py-24 '>
                <form onSubmit={submitForm}>
                    <h2 className='text-3xl text-center font-semibold mb-6'>Log in</h2>
                    <div className='mb-4'>
                        <label className='block text-gray-700 font-bold mb-2'>
                            Email
                        </label>
                        <input
                            type='text'
                            id='email'
                            name='email'
                            className='border rounded w-full py-2 px-3 mb-2'
                            placeholder='eg. example-mail@gmail.com'
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 font-bold mb-2'>
                            Password
                        </label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            className='border rounded w-full py-2 px-3 mb-2'
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type='submit' className='bg-blue-700 rounded self-center text-2xl text-center font-semibold mb-6'>Log In</button>
                </form>
            </div>
        </>
    );
}

export default LoginPage;
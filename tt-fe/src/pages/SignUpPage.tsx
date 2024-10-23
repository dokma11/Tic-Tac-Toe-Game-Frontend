import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

// mozda da u poljima sa loznikom treba da se stavi recimo ikonica oka kao za zatvaranje i otvaranje
function SignUpPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatedPassword, setRepeatedPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();

        const credentials = {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
        }

        if (credentials.password !== repeatedPassword) return toast.error('Passwords do not match! Please enter matching passwords.');

        const res = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });

        if (res.status !== 200) return toast.error('Unsuccessful sign up attempt: ' + res.statusText);

        const token = await res.text();
        localStorage.setItem('token', token);

        toast.success('Signed up successfully!');
        navigate('/');
        return window.location.reload();
    };
    return (
        <>
            <div className='container m-auto max-w-2xl py-24 '>
                <form onSubmit={submitForm}>
                    <h2 className='text-3xl text-center font-semibold mb-6'>Sign up</h2>
                    <div className='mb-4'>
                        <label className='block text-gray-700 font-bold mb-2'>
                            First name
                        </label>
                        <input
                            type='text'
                            id='firstName'
                            name='firstName'
                            className='border rounded w-full py-2 px-3 mb-2'
                            placeholder='eg. John'
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 font-bold mb-2'>
                            Last name
                        </label>
                        <input
                            type='text'
                            id='lastName'
                            name='lastName'
                            className='border rounded w-full py-2 px-3 mb-2'
                            placeholder='eg. Doe'
                            required
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
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
                    <div className='mb-4'>
                        <label className='block text-gray-700 font-bold mb-2'>
                            Repeat your password
                        </label>
                        <input
                            type='password'
                            id='repeatedPassword'
                            name='repeatedPassword'
                            className='border rounded w-full py-2 px-3 mb-2'
                            required
                            value={repeatedPassword}
                            onChange={(e) => setRepeatedPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Sign up
                    </button>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already have an account?
                        <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">&nbsp;Log in</a>
                    </p>
                </form>
            </div>
        </>
    );
}

export default SignUpPage;

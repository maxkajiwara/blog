import Link from 'next/link'
import { useState } from 'react'

type Props = {
	setCookie: Function
}

const Login = ({ setCookie }: Props) => {
	const [credentials, setCredentials] = useState({ username: '', password: '' })
	const [invalid, setInvalid] = useState(false)

	function handleInput(e: React.FormEvent<HTMLInputElement>) {
		setInvalid(false)

		setCredentials({ ...credentials, [e.currentTarget.name]: e.currentTarget.value })
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		// ! Hardcoded username/password check
		if (credentials.username.toLowerCase() === 'max' && credentials.password === 'pass') {
			// ! Hardcoded login state = true
			setCookie('logged-in', true, { path: '/' })
		} else {
			setInvalid(true)
		}
	}

	return (
		// Adapted from https://dev.to/ayushdev_24/building-a-modal-using-reactjs-and-tailwindcss-38d0
		<div className='flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'>
			<div className='relative w-auto my-6 mx-auto max-w-3xl'>
				<div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
					<div className='flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t '>
						<h3 className='text-3xl font=semibold'>Please log in</h3>
						<Link as={`/`} href='/'>
							<button className='bg-transparent border-0 text-black float-right'>
								<span className='text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full'>
									x
								</span>
							</button>
						</Link>
					</div>
					<div className='relative p-6 flex-auto'>
						<form
							className='bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full'
							onSubmit={(e) => handleSubmit(e)}
						>
							<label className='block text-black text-sm font-bold mb-1'>name</label>
							<input
								className='shadow appearance-none border rounded w-full py-2 px-1 text-black'
								name={'username'}
								value={credentials.username}
								onChange={(e) => handleInput(e)}
								required
							/>
							<label className='block text-black text-sm font-bold mb-1'>password</label>
							<input
								className='shadow appearance-none border rounded w-full py-2 px-1 text-black'
								type={'password'}
								name={'password'}
								value={credentials.password}
								onChange={(e) => handleInput(e)}
								required
							/>
							<div className='flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b'>
								<Link as={`/`} href='/'>
									<div className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 cursor-pointer'>
										Cancel
									</div>
								</Link>
								<input
									className='text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 cursor-pointer'
									type='submit'
									value='Login'
								/>
							</div>
							{invalid && <div className='text-center'>Invalid credentials</div>}
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login

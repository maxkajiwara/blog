type Props = {
	removeCookie: Function
}

const Logout = ({ removeCookie }: Props) => {
	return (
		<div
			className={'w-16 h-8 p-2 ml-auto text-center leading-3 underline cursor-pointer'}
			onClick={() => removeCookie('logged-in', { path: '/' })}
		>
			logout
		</div>
	)
}

export default Logout

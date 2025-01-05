import { Link } from "react-router-dom"

const MainNav = () => {
    return (
        <nav className="bg-blue-800">
            <div className="mx-auto px-4">
                <div className="flex justify-between h-16">
                    <div className="flex items-center gap-4">
                        <Link to={'/'} className="text-2xl font-bold">LOGO</Link>
                        <Link to={'/'}>Home</Link>
                        <Link to={'Shop'}>Shop</Link>
                        <Link to={'Cart'}>Cart</Link>
                    </div>
                    <div className="flex items-center gap-4"> 
                        <Link to={'Register'}>Register</Link>
                        <Link to={'Login'}>Login</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default MainNav

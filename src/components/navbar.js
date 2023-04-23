import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ loggedInUser }) => {
    const location = useLocation();

    return (
        <div className="sidebar">
            <nav>
                <ul>
                    <li>
                        <Link to="/" className={location.pathname === '/' ? 'active-link' : ''}>
                            Home
                        </Link>
                    </li>
                    {!loggedInUser && (
                        <li>
                            <Link
                                to="/login"
                                className={location.pathname === '/login' ? 'active-link' : ''}
                            >
                                Login
                            </Link>
                        </li>
                    )}
                    {loggedInUser && (
                        <li>
                            <Link
                                to="/profile"
                                className={location.pathname === '/profile' ? 'active-link' : ''}
                            >
                                Profile
                            </Link>
                        </li>
                    )}
                    {loggedInUser?.isAdmin === "true" && (
                        <li>
                            <Link
                                to="/admin"
                                className={location.pathname === '/admin' ? 'active-link' : ''}
                            >
                                Admin
                            </Link>
                        </li>
                    )}
                    {/* Add more links as needed */}
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
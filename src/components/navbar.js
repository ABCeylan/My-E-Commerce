import { NavLink, Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Profile from '../components/pages/profile';
import Admin from '../components/pages/adminProfile';

const Navbar = ({ loggedInUser }) => {

    // Check if the logged-in user is an admin
    const isAdmin = loggedInUser && loggedInUser.isAdmin;


    return (
        <div className="app">
            {/* Add the new sidebar structure */}
            <div className="sidebar">
                <nav>
                    <ul>
                        <li>
                            <NavLink to="/" activeClassName="active-link" exact>
                                Home
                            </NavLink>
                        </li>
                        {(
                            <li>
                                <NavLink to="/profile" activeClassName="active-link">
                                    Profile
                                </NavLink>
                            </li>
                        )}
                        {(
                            <li>
                                <NavLink to="/admin" activeClassName="active-link">
                                    Admin
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>

            {/* Rest of your components and Routes */}
            {/* Add new Route for Profile and Admin */}
            <Routes>
                {/* Other routes */}
                <Route
                    path="/profile"
                    element={loggedInUser ? <Profile /> : <Navigate to="/" />}
                />
                <Route
                    path="/admin"
                    element={isAdmin ? <Admin /> : <Navigate to="/" />}
                />
            </Routes>
        </div>
    );
};

export default Navbar;

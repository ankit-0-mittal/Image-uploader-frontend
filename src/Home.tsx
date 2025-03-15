
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Welcome to the Image Management App</h1>
            <nav>
                <ul>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/upload">Upload Image</Link></li>
                </ul>
            </nav>
        </div>
    );
};

export default Home;

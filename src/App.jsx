import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import UploadImage from './UploadImage';
import Home from './Home';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/"  element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/upload" element={<UploadImage />} />
            </Routes>
        </Router>
    );
};

export default App;

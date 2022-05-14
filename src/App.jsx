import React from 'react';
import Sidebar from './components/Sidebar';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Home from './pages/Home';
import Lists from './pages/Lists';
import Search from './pages/Search';

const currentUser = {
    id: 1101,
    firstName: 'Steve',
    lastName: 'Wozniak',
    photoUrl: 'account.jpeg'
}


const App = () => {
    const navigate = useNavigate();
    return (
        <div className="App">
            <Sidebar user={currentUser} goToPage={navigate} />
            <div className="app-content">
                <Routes>
                    <Route exact path="/" element={<Home/>}/>
                    <Route exact path="/lists" element={<Lists/>}/>
                    <Route exact path="/search" element={<Search/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../utils/authContext.jsx'
import AdminAnime from './adminAnime.jsx';
import AdminSubmission from './adminSubmission.jsx';
import AdminUsers from './adminUsers.jsx';

function Admin() {

const {authInfo} = useContext(AuthContext);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentSelection, setCurrentSelection] = useState('');
    const [currentComponent, setCurrentComponent] = useState(<AdminAnime/>);
    const navigate = useNavigate();

    const checkPermissions = () => {
        if (!authInfo || !authInfo.username || !authInfo.email) {
          console.log('No valid authInfo, redirecting...');
          setIsLoggedIn(false);
          navigate('/');
        } else {
          console.log('User is logged in:', authInfo);
          setIsLoggedIn(true);
        }
      };

    useEffect(() => {checkPermissions();
        }, [authInfo]);

        if (!isLoggedIn) {
            return <p>Redirecting to login...</p>;
    }

    const renderComponent = (page) => {
        if (page === 'users') {
            setCurrentComponent(<AdminUsers />);
        } else if (page === 'anime') {
            setCurrentComponent(<AdminAnime />);
        } else if (page === 'submission') {
            setCurrentComponent(<AdminSubmission />);
        }
    }

    return(
        <div className='admin'>
            <div className='admin-nav'>
                <button className='admin-nav-tab' onClick={()=> renderComponent('users')}>Users</button>
                <button className='admin-nav-tab' onClick={()=> renderComponent('anime')}>Animes</button>
                <button className='admin-nav-tab' onClick={()=> renderComponent('submission')}>Submissions</button>
            </div>
            <div className='admin-control'>
                {currentComponent}
            </div>



        </div>

    )

}

export default Admin;
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../utils/authContext.jsx'

function Submission() {

    const {authInfo} = useContext(AuthContext);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkPermissions = () => {
        if (!authInfo || !authInfo.username || !authInfo.email) {
          console.log('No valid authInfo, redirecting...');
          setIsLoggedIn(false);
          navigate('/home');
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
    

    return(
        <div className='submission'>
            <div className='submission-header'>
                <h1 className='submission-welcome submission-text'>Welcome, {authInfo.username}!</h1>
                <p className='submission-welcome-description submission-text'>This is the submission page where you can add new animes to our database or add characters and images to the existing animes in our database!</p>
                <h2 className='submission-rules-reminder submission-text'>PLEASE READ THE RULES FOR SUBMISSIONS BEFORE CONTINUING</h2>
            </div>
            <div className='submission-rules'>

            </div>
            <div className='submission-main'>

            </div>
            
        </div>
    )

}

export default Submission;
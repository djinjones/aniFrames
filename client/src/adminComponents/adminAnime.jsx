import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../utils/authContext'


function AdminAnime() {

    const [newAnime, setNewAnime] = useState(false);
    const [animeList, setAnimeList] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const { authInfo } = useContext(AuthContext);
    const userPermissions = authInfo.adminType;
    console.log(userPermissions, ' adminType AdminAnime:11');

    const handleAddNewAnime = async () => {
        try {
            const response = await axios.create()
        } catch (error) {
            
        }
    }

    const handleUpdateAnime = async () => {
        try {
            const response = await axios.post()
        } catch (error) {
            
        }
    }

    const initialFetch = async () => {
        setLoading(true); // Set loading to true before making the request
        try {
          const response = await axios.get('/api/anime/animes');
          console.log('Fetched animes:', response.data);
    
          if (!response.data || response.data.length === 0) {
            setMessage('No anime data in the database!');
            return;
          }
    
          setAnimeList(response.data); // Set the fetched anime data in state
        } catch (error) {
          console.error('Error fetching anime:', error);
          setMessage('Failed to fetch anime data.');
        } finally {
          setLoading(false); // Set loading to false after request completes
        }
      };

    useEffect(() => {
        initialFetch(); // Call initialFetch when the component mounts
      }, []);
    
      const handleAnimeSearch = (event) => {
        const userInput = event.target.value.toLowerCase();
        const filteredAnime = animeList.filter((anime) =>
          anime.name.toLowerCase().includes(userInput)
        );
        setAnimeList(filteredAnime); // Update the list with filtered results
      };


      if (loading) {
        return <p>Loading anime data...</p>; // Display loading message while fetching
      }

    

      return (
        <div className="admin-anime">
          <div className="anime-search anime-item">
            <p>Search our database to update an anime!</p>
            <input
              placeholder="search for an anime"
              className="anime-search-input"
              onChange={(e) => handleAnimeSearch(e)}
            />
          {/* <-- This div closes the "anime-search" section */}
      
          <div className="anime-list anime-item">
            {animeList.length > 0 ? (
              animeList.map((anime) => (
                <div key={anime._id} className="anime-result">
                  <h3>{anime.titles}</h3>
                  <p>{anime.characters.join(', ')}</p>
                </div>
              ))
            ) : (
              <p>What an empty database you have!</p>
            )}
          </div> </div>
      
          <div className="admin-anime-form">
            {/* Form for adding or updating anime */}
          </div>
        </div>
      );
      

}

export default AdminAnime;
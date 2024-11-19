import CharacterQuiz from "./characterQuiz";
import frameQuiz from "./frameQuiz";
import { useState, useEffect } from "react";
import About from './about';
import News from './News';
import DailyQuiz from './dailyQuiz';
import { Link } from 'react-router-dom';

function Home() {

    // return statement needs to inclue options to select the type of quiz, news, about
    return(
        <div className="home">
            
            <div className="mid">
                <div className="welcome-box mid-box">
                    <h2>Welcome to AniFrames</h2>
                    <p>The infinte anime gusser!</p>
                </div>
                <div className="mid-box mid-button comming-soon">
                    <a>Daily Quiz</a>
                </div>
                <div className="mid-box mid-button">
                    <a>Frames Quiz</a>
                </div>
                <div className="mid-box mid-button">
                    <Link to="/character">Character Quiz</Link>
                </div>
                <div className="mid-box mid-button comming-soon">
                    <a>News</a>
                </div>
                <div className="mid-box mid-button">
                    <a>About</a>
                </div>
            </div>
            
            
        </div>
    )

}

export default Home;
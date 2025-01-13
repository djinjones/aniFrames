
import { Link } from 'react-router-dom';

function Home() {

    // return statement needs to inclue options to select the type of quiz, news, about
    return(
        <div className="home">
            
            <div className="mid">
                <div className='mid-content'>
                    <div className="welcome-box mid-box">
                        <h2>Welcome to AniFrames</h2>
                        <p>The infinte anime gusser!</p>
                    </div>
                    <div className="mid-box mid-button coming-soon">
                        <Link to="/daily">Daily Quiz</Link>
                    </div>
                    <div className="mid-box mid-button coming-soon">
                        <Link to="/frame">Frames Quiz</Link>
                    </div>
                    <div className="mid-box mid-button">
                        <Link to="/character">Character Quiz</Link>
                    </div>
                    <div className="mid-box mid-button coming-soon">
                        <Link to="/news">News</Link>
                    </div>
                    <div className="mid-box mid-button">
                        <Link to="/about">About</Link>
                    </div>
                    <div className='mid-box mid-button coming-soon'>
                        <Link to="/submission">Submissions</Link>
                    </div>
                </div>
            </div>
            
            
        </div>
    )

}

export default Home;
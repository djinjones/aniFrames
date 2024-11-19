import quizData from '../../charNames.json';
import { useEffect, useState } from 'react';

function CharacterQuiz() {
    const [gameInProgress, setGameInProgress] = useState(false);
    const [currentRound, setCurrentRound] = useState(0);
    const [currentScore, setCurrentScore] = useState(0)
    const [animeTitles, setAnimeTitles] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        if (!quizData || quizData.length === 0) {
            console.error("Quiz data is empty or undefined");
            return;
        }
    
        const allTitles = [];
        const allCharacters = new Set();
        quizData.forEach(anime => {
            const animeData = Object.values(anime)[0];
            if (animeData && animeData.titles) {
                const titles = [...animeData.titles.alternate];
                allTitles.push(...titles);
            }
            if (animeData && animeData.characters) {
                Object.keys(animeData.characters).forEach(character => {
                    allCharacters.add(character);
                });
            }
        });
        setAnimeTitles(allTitles);
        setCharacters(Array.from(allCharacters));
    }, []);
    

    const getRandomAnimeData = (usedCharacters) => {
        const randomAnime = quizData[Math.floor(Math.random() * quizData.length)];
        const animeName = Object.keys(randomAnime)[0];
        const animeData = randomAnime[animeName];
    
        const titles = animeData.titles.alternate; // Use only alternate titles
    
        const characters = animeData.characters;
        const characterNames = Object.keys(characters).filter(name => !usedCharacters.has(name));
    
        if (characterNames.length === 0) return null; // No more unique characters available
    
        const randomCharacterName = characterNames[Math.floor(Math.random() * characterNames.length)];
        const characterData = characters[randomCharacterName];
    
        const imageUrl = characterData.imageUrl || 'placeholder-image-url.jpg';
    
        return {
            title: animeName,
            characterName: randomCharacterName,
            userCharacterName: '', // Store user input
            alternateNames: characterData.alternateNames || [], // Include alternate character names
            imageUrl: imageUrl,
            correctAnime: titles, // Store all alternate titles for validation
            filteredTitles: [],
            filteredCharacters: [],
            isValidTitle: false,
            isValidCharacter: false,
        };
    };
    
    
    

    function handleStartGame() {
        setGameInProgress(true);
        const newCards = [];
        const usedCharacters = new Set(); // Initialize the usedCharacters set

        // Generate unique cards
        while (newCards.length < 4) {
            const animeData = getRandomAnimeData(usedCharacters);
            if (animeData) {
                newCards.push(animeData);
                usedCharacters.add(animeData.characterName); // Add to the set to track used characters
            } else {
                break; // No more unique characters available
            }
        }

        setCards(newCards);
        console.log('New Cards:', newCards);
    }

    function handleTitleInput(event, index) {
        const userInput = event.target.value.toLowerCase();
    
        const allAlternateTitles = cards[index]?.correctAnime || [];
    
        const filtered = animeTitles.filter(title =>
            title.toLowerCase().includes(userInput)
        );
    
        const updatedCards = [...cards];
        updatedCards[index] = {
            ...updatedCards[index],
            selectedTitle: userInput,
            filteredTitles: filtered,
            isValidTitle: allAlternateTitles
                .map(title => title.toLowerCase())
                .includes(userInput), // Validate input
        };
    
        setCards(updatedCards);
    }
    
    
    
    
    
    function handleCharacterInput(event, index) {
        const userInput = event.target.value.toLowerCase();
    
        // Combine all main and alternate character names
        const allCharacterNames = characters.concat(
            ...cards.flatMap(card => card.alternateNames)
        );
    
        // Filter all character names based on user input
        const filtered = allCharacterNames.filter(character =>
            character.toLowerCase().includes(userInput)
        );
    
        const updatedCards = [...cards];
        updatedCards[index] = {
            ...updatedCards[index],
            userCharacterName: userInput,
            filteredCharacters: filtered,
            isValidCharacter: filtered.includes(userInput)
        };
    
        setCards(updatedCards);
    }
    

    function handleGameEnd() {
        setGameInProgress(false);
        setCurrentRound(0);
    }

    function nextRound() {
        const newCards = [];
        const usedCharacters = new Set();
    
        while (newCards.length < 4) {
            const animeData = getRandomAnimeData(usedCharacters);
            if (animeData) {
                newCards.push(animeData);
                usedCharacters.add(animeData.characterName);
            }
    
            // If no more unique characters are available but less than 4 cards are generated,
            // we need to relax the uniqueness condition and allow duplicates if needed.
            if (newCards.length < 4 && usedCharacters.size === characters.length) {
                // Reset usedCharacters to allow duplicates for remaining cards
                usedCharacters.clear();
            }
        }
    
        setCards(newCards); // Update the state with the new set of cards
        setCurrentRound((prevRound) => prevRound + 1); // Increment the current round
    }
    
    function handleSubmit() {
        const updatedCards = cards.map(card => {
            const correctTitles = (card.correctAnime || []) // Use correctAnime for titles
                .filter(Boolean)
                .map(title => title.toLowerCase());
    
            const correctCharacterNames = (card.alternateNames || [])
                .filter(Boolean)
                .map(name => name.toLowerCase());
    
            const userTitle = card.selectedTitle?.toLowerCase() || '';
            const userCharacter = card.userCharacterName?.toLowerCase() || '';
    
            const isTitleCorrect = correctTitles.includes(userTitle);
            const isCharacterCorrect = correctCharacterNames.includes(userCharacter);
    
            return {
                ...card,
                isTitleCorrect,
                isCharacterCorrect,
                showCorrectAnswer: true,
                correctTitles: correctTitles.map(title => title.charAt(0).toUpperCase() + title.slice(1)),
                correctCharacterNames: correctCharacterNames.map(name => name.charAt(0).toUpperCase() + name.slice(1)),
            };
        });
    
        setCards(updatedCards); // Update state with new card data

        correctCount();
    }

    function correctCount() {
        // Calculate the number of correct answers
        const correctAnswers = cards.reduce((count, card) => {
            const isCorrect = card.isTitleCorrect && card.isCharacterCorrect;
            return count + (isCorrect ? 1 : 0);
        }, 0);
    
        // Update the score state
        setCurrentScore(prevScore => prevScore + correctAnswers);
    
        return correctAnswers;
    }
    

    return (
        <div className='quiz'>
            <div className='image-container'>
                {cards.map((card, index) => (
                    <div className={`card card${index + 1}`} key={index}>
                        <img 
                            alt='character-image' 
                            src={card.imageUrl || 'placeholder-image-url.jpg'}
                            className='card-image card-element'
                        />
                        <input
                            placeholder='character name'
                            className='card-element'
                            value={card.userCharacterName || ''}
                            onChange={(e) => handleCharacterInput(e, index)}
                            list={`filtered-characters-${index}`}
                        />

                        <datalist id={`filtered-characters-${index}`}>
                            {card.filteredCharacters && card.filteredCharacters.map((character, i) => (
                                <option key={i} value={character}></option>
                            ))}
                        </datalist>
                        {card.showCorrectAnswer && (
                            <div className='correct-answer-container'>
                                <div className='correct-answer'>
                                    {card.isCharacterCorrect ? (
                                        <span className='correct'>{(card.correctCharacterNames || []).join(', ')}</span>
                                    ) : (
                                        <span className='incorrect'>{(card.correctCharacterNames || []).join(', ')}</span>
                                    )}
                                </div>
                            </div>
                        )}

                        <input
                            placeholder='anime title'
                            className='card-element'
                            value={card.selectedTitle || ''}
                            onChange={(e) => handleTitleInput(e, index)}
                            list={`filtered-titles-${index}`}
                        />
                        <datalist id={`filtered-titles-${index}`}>
                            {card.filteredTitles && card.filteredTitles.map((title, i) => (
                                <option key={i} value={title}></option>
                            ))}
                        </datalist>

                        {card.showCorrectAnswer && (
                            <div className='correct-answer-container'>
                                <div className='correct-answer'>
                                    {card.isTitleCorrect ? (
                                        <span className='correct'>{(card.correctTitles || []).join(', ')}</span>
                                    ) : (
                                        <span className='incorrect'>{(card.correctTitles || []).join(', ')}</span>
                                    )}
                                </div>
                            </div>
                        )}
                        
                    </div>
                ))}
            </div>
            <div className='quiz-info-box'>
            {gameInProgress ? (
                <>
                    <div className='score' id='score-id'>Score: {currentScore}</div>
                    <button className='next-question-btn' onClick={nextRound}>Next Question</button>
                    <button className='submit-btn' onClick={handleSubmit}>Submit Answers</button>
                </>
            ) : (
                <button className='start-game-btn' onClick={handleStartGame}>Start Game</button>
            )}
            </div>
        </div>
    );
    
}

export default CharacterQuiz;



/* OLD original code for using jikan v4

const [currentScore, setCurrentScore] = useState(0);
    const [newGame, setNewGame] = useState(false);
    const [currentId, setCurrentId] = useState();
    const [currentRound, setCurrentRound] = useState(1);
    const [titleEnglish, setTitleEnglish] = useState(''); // State for English title
    const [titleJapanese, setTitleJapanese] = useState(''); // State for Japanese title
    const [currentScene, setCurrentScene] = useState();
    const [title, setTitle] = useState();
    const [hasGuessed, setHasGuessed] = useState(false);
    // Function to handle fetching random anime
    async function handleGetRandomAnime() {
        try {

            let data;  // Declare a variable to hold the anime data
            let rank = Infinity; // Initialize rank to a large number to start the loop
            let count = 0

        // Keep calling Query.getRandomAnime() until we find one with rank < 4000
            while (rank >= 4000 && count < 10) {
                const response = await Query.getRandomAnime(); // Ensure this returns a promise
                data = response.data;
                rank = data.popularity; // Set the rank from the API response
                count ++
                // Log the rank for debugging
                console.log('Trying anime with rank:', rank, 'count: ', count);
        }


            ////////////////////////////////////////////////
            // const response = await Query.getRandomAnime(); // Ensure this returns a promise
            // const data = response.data;
            // let rank = data.popularity;
            // Set the state for titles and ID
            setCurrentId(data.mal_id);
            setTitleEnglish(data.title_english || '');
            setTitleJapanese(data.title_japanese || '');
            setTitle(data.title || '');
            console.log('rank: ', data.rank, 'popularity: ', data.popularity, 'score: ', data.score )
            // Fetch the scene using the ID from the response, without waiting for state update
            const sceneResponse = await Query.getAnimeScene(data.mal_id);
            const scene = sceneResponse.data[0].jpg.large_image_url;
            
            // Update the scene state
            setCurrentScene(scene);

            // Log the data directly
            console.log('current ID: ', data.mal_id, 'title: ', data.title, 'title english: ', data.title_english, 'title japanese: ', data.title_japanese);
        } catch (error) {
            console.error('Error fetching random anime:', error);
        }
    }

    useEffect(() => {
        // Fetch random anime when component mounts (optional)
    }, []); // Empty dependency array means this runs once on mount

    return (
        <div className="quiz">
            {currentScene && <img src={currentScene} alt="Anime Scene" />}
            <p>{title}</p>
            <p>{titleEnglish}</p>
            <p>{titleJapanese}</p>
            <button className='start-game-button' onClick={handleGetRandomAnime}>Start Game</button>
        </div>
    );

*/
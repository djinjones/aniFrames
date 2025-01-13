
function About({ handleOpenModal }) {

    return(
        <div className="about-page">
            <div className="about-section">
                <h2 className="about-h2">What is AniFrames?</h2>
                <p className="about-p">AniFrames is the ultimate trivia app designed for anime lovers to test their knowledge and challenge their friends. With a growing library of over 250 anime titles, the app offers engaging quizzes that cover iconic characters and memorable scenes. Whether you're a casual viewer or a seasoned otaku, AniFrames provides a fun way to explore and celebrate your favorite shows. Compete with friends to see who knows the most about anime, or play solo to sharpen your trivia skills. With regularly updated content and a variety of quiz modes, AniFrames ensures there's always something new to discover. Dive into the world of anime and prove your expertise with AniFrames!</p>

                

                <p className="about-recommendation">We recomend streaming the game to your friends on discord so everyone can all play together!</p>
            </div>
            <div className="about-section">
                <h2 className="about-h2">Who made this website?</h2>
                <p className="about-p">My name is Dan and I made this website as a fun project to hone my skills. I am a web developer from the United States and I love anime and manga. I want to make apps that people can enjoy and contribute to. This is my first solo project I've done outside of school and I am very proud of my hard work. I decided on a trivia game because my friends and I love to play trivia games over discord on nights when we all have nothing going on. </p>
                
                <p className="about-p">I created my own database of animes with character info, anime info and images for both. This was quite a task because A lot of things needed to be entered in manually to maintain high quality images and informaiton. I plan to create a public api for this in the future, but while maintaining this project, I also have another trivia game that I am very excited about working on, so the api is on the back burner for now. Thanks for reading this, I really hope you enjoy this website.</p>

                <p className="about-recommendation">I would also like to make a disclaimer that I have no affiliaiton with <a className="aniguesser" href="https://aniguessr.com">AniGuesser</a> but I love their app and it is what inspired me to make this one! (obviously) </p>
            </div>
            <div className="about-section">
                <h2 className="about-h2">Want to add to our database?</h2>
                <p className="about-p">We encourage you to contribute to AniFrames! To get started, simply create an account by clicking <a href="#" onClick={() => handleOpenModal('signup')}>here</a>. Once you're signed in, head to the homepage and click on the "Contribute to Database" button, or press <a>here</a> to go directly to the contribution page. There, you can add image URLs for characters or anime titles to help expand our growing library.</p>

                <p className="about-p">All submissions will be reviewed by an admin to ensure they meet our standards for high-quality images, accurate titles, and clean media. Please note that NSFW images or non-anime-related content will be rejected, and submitting inappropriate content may result in your account being flagged. To maintain fairness and quality, we limit submissions to 15 per user per hour.</p>

                <p className="about-p">Your contributions are invaluable in making AniFrames a richer and more engaging platform for anime fans. Thank you for helping us create the best experience possible!</p>
            </div>
        </div>
    )
}

export default About;
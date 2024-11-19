import { useEffect, useState } from "react";
import Agreement from "./agreement" 
import Modal from "./modal"
import githubIcon from '../assets/github-mark-white.png';
import linkedInIcon from '../assets/In-White-128.png';

function Footer({ hasLoggedIn }) {
    const [displayAgreement, setDisplayAgreement] = useState(false);

   

    const handleModalOpen = () => {
        setDisplayAgreement(true);
    };

    const handleModalClose = () => {
        setDisplayAgreement(false);
    };

    return (
        <div className="footer">
            <p className="user-acknowledgement">
                By continuing to use the Website, you acknowledge that you have read, understood, and agree to the terms of this 
                <span>
                    {" "}
                    <a className="UA-link" onClick={handleModalOpen}>User Agreement</a>
                </span>
            </p>
            <div className="contact-links">
                <a className="link" href="https://github.com/djinjones/aniFrames" target="_blank" rel="noopener noreferrer">
                    <img src={githubIcon} alt="Github" style={{ width: '30px', height: '30px' }} />
                </a>
                <a className="link" href="https://www.linkedin.com/in/djinjones/" target="_blank" rel="noopener noreferrer">
                    <img src={linkedInIcon} alt="LinkedIn" style={{ width: '30px', height: '30px' }} />
                </a>
            </div>
            
            <Modal show={displayAgreement} onClose={handleModalClose}>
                <h2>User Agreement</h2>
                <p>
                    By accessing or using this Website, you agree to comply with and be bound by the following terms and conditions...
                    
                </p>
                <Agreement/>
            </Modal>
        </div>
    )
}

export default Footer;
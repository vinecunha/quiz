import React, { useState, useEffect } from 'react';
import './Footer.css';

export default function Navigator() {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div id="footer">            
            <p>Developed by @vinecunha with <span style={{color: '#61dbfb', fontWeight: 'bolder'}}>React</span></p>
            <div class="footer-line">
                <a href="https://www.twitter.com/vinecunha1" class="px-1 link-secondary" target="blank" data-bs-toggle="tooltip" data-bs-placement="left" title="My personal Twitter profile">Twitter</a> |
                <a href="https://linkedin.com/in/vcmartins" class="px-1 link-secondary" target="blank" data-bs-toggle="tooltip" data-bs-placement="top" title="My Linkedin profile">Linkedin</a> |
                <a href="https://github.com/vinecunha" class="px-1 link-secondary" target="blank" data-bs-toggle="tooltip" data-bs-placement="top" title="My Github profile">GitHub</a> |
                <a href="https://wa.me/5521979820741?text=Olá,%20Vinicius%20Cunha%20Martins!%20Vi%20seu%20currículo%20online.%20Podemos%20conversar?" class="px-1 link-secondary" target="blank" data-bs-toggle="tooltip" data-bs-placement="top" title="Send me a message on Whatsapp">Whatsapp</a> |
                <a href="mailto:vcunha@id.uff.br" class="px-1 link-secondary" data-bs-toggle="tooltip" data-bs-placement="top" title="Send me an email">E-mail</a>
            </div>
        </div>
    );
}

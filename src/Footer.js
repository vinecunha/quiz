import React, { useState, useEffect } from 'react';
import './Footer.css';

export default function Footer() {
    return (
        <div className="position-absolute bottom-0 container-fluid">            
            <p className='text-center m-0'>Developed by @vinecunha with <span style={{color: '#61dbfb', fontWeight: 'bolder'}}>React</span> and styled with <span style={{color: '#6610f2', fontWeight:'bolder'}}>Bootstrap</span></p>
            <div class="d-flex flex-row justify-content-center align-items-center mb-2">
                <a href="https://www.twitter.com/vinecunha1" class=" mx-1 link-secondary" target="blank">Twitter</a> |
                <a href="https://linkedin.com/in/vcmartins" class=" mx-1 link-secondary" target="blank">Linkedin</a> |
                <a href="https://github.com/vinecunha" class=" mx-1 link-secondary" target="blank">GitHub</a> |
                <a href="https://wa.me/5521979820741?text=Olá,%20Vinicius%20Cunha%20Martins!%20Vi%20seu%20currículo%20online.%20Podemos%20conversar?" class=" mx-1 link-secondary" target="blank">Whatsapp</a> |
                <a href="mailto:vcunha@id.uff.br" class=" mx-1 link-secondary">E-mail</a>
            </div>
        </div>
    );
}

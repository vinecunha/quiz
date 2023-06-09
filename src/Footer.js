import React, { useState, useEffect } from 'react';
import './Footer.css';

export default function Footer() {
    return (
        <div className="position-absolute bottom-0 container-fluid">            
            <p className='text-center m-0'>Developed by @vinecunha with React and styled with Bootstrap</p>
            <div class="d-flex flex-row justify-content-center align-items-center mb-2">
                <a href="https://linkedin.com/in/vcmartins" class=" mx-1 link-secondary" target="blank">Linkedin</a> |
                <a href="https://github.com/vinecunha" class=" mx-1 link-secondary" target="blank">GitHub</a> |
                <a href="mailto:vcunha@id.uff.br" class=" mx-1 link-secondary">E-mail</a>
            </div>
        </div>
    );
}

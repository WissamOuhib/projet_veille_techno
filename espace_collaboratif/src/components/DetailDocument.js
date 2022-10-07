import { useState } from "react";

import '.././potato.css';

export default function DetailDocument() {

    return ( 
    <div>
        <h1 className="potato">Détail document</h1>

            <button>Sauvegarder</button>
            <button>Proposer solution</button>

        {/* <iframe 
        src="http://infolab.stanford.edu/pub/papers/google.pdf#toolbar=0&navpanes=0&scrollbar=0" 
        style={{width:600 +'px',height:500 +'px'}} 
        scrolling="auto"
        frameBorder="0"></iframe> */}

        <iframe 
        src=  'http://localhost/api_veille_techno/archive/veille.pdf'
        style={{width:600 +'px',height:500 +'px'}} 
        scrolling="auto"
        frameBorder="0"></iframe>

        <div>
        <h1>Liste des solutions</h1>
        </div>

    </div>
            
    )
}
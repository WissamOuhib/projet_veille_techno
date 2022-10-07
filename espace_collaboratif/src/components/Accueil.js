import {Link} from 'react-router-dom';

export default function Accueil() {
    return (
        
    <div>
        <h1>page d' Accueil</h1>
        <nav>
          <ul>
            <li>
              <Link to="document/list">Liste documents</Link>
            </li>
            <li>
              <Link to="document/add">Ajouter document</Link>
            </li>
          </ul>
        </nav>
    </div>
        
    )
}
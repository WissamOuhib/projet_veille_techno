import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import './App.css';
import AddDocument from './components/AddDocument';
import ListDocuments from './components/ListDocuments';

function App() {
  return (
    <div className="App">

      <h5>Hello espace collaboratif patate</h5>

      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Liste documents</Link>
            </li>
            <li>
              <Link to="document/add">Ajouter document</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route index element={<ListDocuments />} />
          <Route path="document/add" element={<AddDocument />} />
          {/* <Route path="document/:id/edit" element={<EditDocument />} /> */}
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

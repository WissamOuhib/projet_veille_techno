import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import './App.css';
import Accueil from './components/Accueil';
import AddDocument from './components/AddDocument';
import DetailDocument from './components/DetailDocument';
import ListDocuments from './components/ListDocuments';

function App() {
  return (
    
    <div className="App">

      <BrowserRouter>

      <Link to="/">Accueil</Link>

        <Routes>
          <Route index element={<Accueil />} />
          <Route path="document/list" index element={<ListDocuments />} />
          <Route path="document/add" element={<AddDocument />} />
          <Route path="document/list/:id/detail" element={<DetailDocument />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

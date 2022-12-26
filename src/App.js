import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Accueil from './components/Accueil';
import Read from './components/Read';
import Login from './components/Login';


function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route index element={<Login/>} />
          <Route path="accueil/:id/read" element={<Read/>} />
          <Route path="accueil" element={<Accueil/>} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import BreedsList from './pages/BreedsList';
import BreedDetail from './pages/BreedDetail';
import NotFound from './pages/NotFound';

function App() {
  
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/breeds" element={<BreedsList />} />
            <Route path="/breeds/:breed" element={<BreedDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

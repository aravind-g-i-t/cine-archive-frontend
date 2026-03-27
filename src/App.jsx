
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import FavouritesPage from './pages/FavouritesPage'
import HomePage from './pages/HomePage'
import MovieDetailPage from './pages/MovieDetailsPage'

function App() {

  return (
    <div className="app">
      <Navbar />
 
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/favourites" element={<FavouritesPage />} />
          <Route path="/movie/:imdbID" element={<MovieDetailPage/>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

import './App.css'
import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Footer from './components/Footer/Footer'
import Login from './components/Login/Login'
import ReservationHistory from './components/ReservationHistory/ReservationHistory'
import Register from './components/Register/Register'
import UserProfile from './components/UserProfile/UserProfile'
import Reservation from './components/Reservation/Reservation'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppReducer from './reducers/AppReducer'
import { useReducer } from 'react'
import AppContext from './components/AppContext'

function App() {
  const initialState = { user: null, reservations: [] }
  const [state, dispatch] = useReducer(AppReducer, initialState)
  return (
    <BrowserRouter>
      <AppContext.Provider value={{ state, dispatch }}>
        <div>
          <div id="top">
            <Header />

            <Routes>
              {/* Route to landing page */}
              <Route path="/" element={<Hero />} />

              {/* Route to login page */}
              <Route path="/login" element={<Login />} />

              {/* Route to register page */}
              <Route path="/register" element={<Register />} />

              {/* Route to user profile page */}
              <Route path="/userProfile" element={<UserProfile />} />

              {/* Route to reservation form page */}
              <Route path="/reservation" element={<Reservation />} />

              {/* Route to reservation history page */}
              <Route
                path="/reservationHistory"
                element={<ReservationHistory />}
              />

              {/* Unhandled Route */}
              <Route
                path="/*"
                element={
                  <div className="error-route container">Page Not Found</div>
                }
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </AppContext.Provider>
    </BrowserRouter>
  )
}

export default App

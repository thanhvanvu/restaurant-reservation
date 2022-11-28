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
import { useCallback, useEffect, useReducer } from 'react'
import AppContext from './components/AppContext'
import axios from 'axios'

function App() {
  const initialState = { user: null, reservations: [] }
  const [state, dispatch] = useReducer(AppReducer, initialState)

  const checkCurrentUser = useCallback(async () => {
    try {
      // get token from localStorage
      const token = localStorage.getItem('token')
      const option = {
        method: 'get',
        url: '/api/v1/auth',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await axios(option)
      // console.log(response)

      if (response.data.data.user) {
        const user = response.data.data.user
        dispatch({ type: 'CURRENT_USER', payload: user })
      }
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    console.log('abc')
    checkCurrentUser()
  }, [checkCurrentUser])
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

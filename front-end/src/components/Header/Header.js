import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import imageToRender from '../../../src/assets/images/logo_rou.png'
import AppContext from '../AppContext'
import './Header.css'

export default function Header() {
  // useContext: to get the DISPATCH from AppContext
  const { state, dispatch } = useContext(AppContext)

  // get user information in state
  const { user } = state

  const signOut = () => {
    // alert
    let confirmSignout = window.confirm('Are you sure to sign out?')
    if (confirmSignout) {
      // remove token
      localStorage.removeItem('token')

      // set user to null
      dispatch({ type: 'CURRENT_USER', payload: null })
    } else {
      // do nothing
    }
  }

  return (
    <header id="top-bar" className="container has-two-col">
      <h1>
        <Link to="/">
          <img src={imageToRender} alt="" />
        </Link>
      </h1>
      <div className="inline">
        <ul id="menu" className="inline-list">
          {user ? (
            <>
              <li id="name">
                <Link to="/userProfile">Hello, {user.userName}</Link>
              </li>
              <li>
                <Link to="/reservationHistory">Reservation History</Link>
              </li>
              <li onClick={signOut}>
                <Link to="/">Sign Out</Link>
              </li>
              <li
                className="reservation"
                onClick={() => {
                  window.location.reload()
                }}
              >
                <Link to="/reservation">Reservation</Link>
              </li>
            </>
          ) : (
            <>
              <li className="reservation">
                <Link to="/reservation">Reservation</Link>
              </li>
              <li className="reservation">
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>

        <ul id="social">
          <li>
            <img src="image/social/fb.png" alt="" />
          </li>
          <li>
            <img src="image/social/tw.png" alt="" />
          </li>
          <li>
            <img src="image/social/youtube.png" alt="" />
          </li>
          <li>
            <img src="image/social/instagram.png" alt="" />
          </li>
        </ul>
      </div>
    </header>
  )
}

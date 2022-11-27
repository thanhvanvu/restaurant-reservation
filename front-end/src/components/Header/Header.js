import React from 'react'
import { Link } from 'react-router-dom'
import imageToRender from '../../../src/assets/images/logo_rou.png'
import './Header.css'

export default function Header() {
  return (
    <header id="top-bar" className="container has-two-col">
      <h1>
        <Link to="/">
          <img src={imageToRender} alt="" />
        </Link>
      </h1>
      <div className="inline">
        <ul id="menu" className="inline-list">
          <li id="name">
            <Link to="/userProfile">Hello</Link>
          </li>

          <li>
            <Link to="/reservationHistory">Reservation History</Link>
          </li>

          <li>
            <Link to="/">Sign Out</Link>
          </li>

          <li className="reservation">
            <Link to="/reservation">Reservation</Link>
          </li>

          <li className="reservation">
            <Link to="/login">Login</Link>
          </li>
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

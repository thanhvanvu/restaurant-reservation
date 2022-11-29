import React from 'react'
import './Footer.css'
import imageToRender from '../../../src/assets/images/logo_rou.png'

export default function Footer() {
  return (
    <footer>
      <div id="footer-wraper" className="container">
        <div id="subcribe">
          <h1>
            <img src={imageToRender} alt="" />
          </h1>

          <p>
            Fectetur adipisicing elit, sed do eius mod tempor Lorem ipsum dolor
            sit amet, con sectetur adipisicing elitt ut labore.
          </p>
        </div>

        <div id="about">
          <h2>About</h2>
          <ul>
            <li>
              <p>Abou Us</p>
            </li>
            <li>
              <p>Service</p>
            </li>
            <li>
              <p>Our Story</p>
            </li>
            <li>
              <p>Success</p>
            </li>
            <li>
              <p>Support</p>
            </li>
          </ul>
        </div>

        <div id="service">
          <h2>Service</h2>
          <ul>
            <li>
              <p>Development</p>
            </li>
            <li>
              <p>Maintanance</p>
            </li>
            <li>
              <p>Consultancy</p>
            </li>
            <li>
              <p>Design</p>
            </li>
          </ul>
        </div>

        <div id="get-in-touch">
          <h2>Get in Touch</h2>
          <ul>
            <li>
              <p>
                <img src="image/footer/address.png" alt="" />
                <span id="content1">University of Houston</span>
                <span id="content2">Houston, Texas 77204</span>
              </p>
            </li>
            <li>
              <p>
                <img src="image/footer/mail.png" alt="" />
                uh@cougarnet.uh.edu
              </p>
            </li>
            <li>
              <p>
                <img src="image/footer/phone.png" alt="" />
                (713) 743-2255
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div id="follow-us" className="container inline">
        <h2>Follow Us</h2>
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
    </footer>
  )
}

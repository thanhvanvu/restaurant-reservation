import './Login.css'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div id="hero" className="container has-two-col">
      <div id="login">
        <form id="login-form">
          <div id="form-name">
            <h2>Login Form</h2>
          </div>

          <div id="id-password-submit">
            <div id="error-massage">Error:</div>

            <div id="email">
              <input type="email" name="email" placeholder="Email" required />
            </div>

            <div id="password">
              <input name="password" placeholder="Password" required />
              <span id="show-password">Show</span>
            </div>

            <div id="signin">
              <button type="submit"> Sign In</button>
            </div>

            <div id="signup">
              <p>New to ROU?</p>
              <Link to="/register">Create an account</Link>
            </div>
          </div>
        </form>
      </div>

      <div id="hero-right">
        <img src="image/background1/people.png" alt="" />
      </div>
    </div>
  )
}

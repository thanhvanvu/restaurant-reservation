import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import AppContext from '../AppContext'
import { useContext, useState } from 'react'

export default function Login() {
  // useContext: to get the DISPATCH from AppContext
  const { dispatch } = useContext(AppContext)

  //#region --- Get User Input ---
  // initial state is empty
  const [userInput, setUserInput] = useState({ email: '', password: '' })
  const onChangeHandler = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value })
  }
  //#endregion

  const navigate = useNavigate()

  const [errorMessage, setErrorMessage] = useState(null)

  const onSubmitHandler = async (e) => {
    try {
      // prevent page will refresh
      e.preventDefault()

      const options = {
        method: 'post',
        url: '/api/v1/auth/login',
        data: userInput,
      }

      const response = await axios(options)

      console.log(response)
      // get TOKEN, userName
      const user = response.data.data

      // save TOKEN in localstorage
      localStorage.setItem('token', user.token)

      // Use DISPATCH to update the initial state
      dispatch({
        type: 'CURRENT_USER',
        payload: user,
      })

      // Navigate to homepage after login
      navigate('/')
    } catch (error) {
      setErrorMessage(error.response.data.message)
    }
  }

  //#region --- Show/Hide password---
  const [passwordShown, setPasswordShown] = useState(false)
  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }
  //#endregion

  return (
    <div id="hero" className="container has-two-col">
      <div id="login">
        <form id="login-form" onSubmit={onSubmitHandler}>
          <div id="form-name">
            <h2>Login Form</h2>
          </div>

          <div id="id-password-submit">
            {errorMessage && <div id="error-massage">{errorMessage}</div>}

            <div id="email">
              <input
                type="email"
                name="email"
                value={userInput.email}
                onChange={onChangeHandler}
                placeholder="Email"
                required
              />
            </div>

            <div id="password">
              <input
                type={passwordShown ? 'text' : 'password'}
                name="password"
                value={userInput.password}
                onChange={onChangeHandler}
                placeholder="Password"
                required
              />
              <span
                id="show-password"
                onClick={togglePassword}
                className="prevent-select"
              >
                {passwordShown ? 'Hide' : 'Show'}
              </span>
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

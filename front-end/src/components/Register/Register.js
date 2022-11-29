import './Register.css'
import axios from 'axios'
import AppContext from '../AppContext'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router'

export default function Register() {
  // useContext: to get the DISPATCH from AppContext
  const { dispatch } = useContext(AppContext)

  //#region --- Get User Input ---
  // initial state is empty
  const [userInput, setUserInput] = useState({
    name: '',
    email: '',
    password: '',
  })

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
        url: '/api/v1/auth/register',
        data: userInput,
      }

      const response = await axios(options)
      console.log(response)

      // get TOKEN, userName
      const { token, userName, userId, mailing_address } = response.data.data
      // save TOKEN in localstorage
      localStorage.setItem('token', token)

      // Use DISPATCH to update the initial state
      dispatch({
        type: 'CURRENT_USER',
        payload: { userName, userId, mailing_address },
      })

      //Navigate to homepage after login
      navigate('/')
    } catch (error) {
      console.log(error)
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
      <div id="register">
        <form id="register-form" onSubmit={onSubmitHandler}>
          <div id="form-name">
            <h2>Register Form</h2>
          </div>

          <div id="id-password-submit">
            {errorMessage &&
              // Check if errorMessage is an array or not ?
              (Array.isArray(errorMessage) ? (
                errorMessage.map((error) => (
                  <div className="error-message">{error}</div>
                ))
              ) : (
                // if not array
                <div className="error-message">{errorMessage}</div>
              ))}

            <div id="full-name">
              <input
                type="text"
                name="name"
                value={userInput.name}
                onChange={onChangeHandler}
                placeholder="Full Name"
              />
            </div>

            <div id="email">
              <input
                type="email"
                name="email"
                value={userInput.email}
                onChange={onChangeHandler}
                placeholder="Email"
              />
            </div>

            <div id="password">
              <input
                type={passwordShown ? 'text' : 'password'}
                name="password"
                value={userInput.password}
                onChange={onChangeHandler}
                placeholder="Password"
              ></input>

              <span
                id="show-password"
                onClick={togglePassword}
                className="prevent-select"
              >
                {passwordShown ? 'Hide' : 'Show'}
              </span>
            </div>

            <div id="register">
              <button type="submit"> Create Account</button>
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

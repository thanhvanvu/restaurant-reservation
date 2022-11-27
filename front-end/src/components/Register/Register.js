import './Register.css'

export default function Register() {
  return (
    <div id="hero" className="container has-two-col">
      <div id="register">
        <form id="register-form">
          <div id="form-name">
            <h2>Register Form</h2>
          </div>

          <div id="id-password-submit">
            <div className="error-message">Error:...</div>

            <div id="full-name">
              <input type="text" name="name" placeholder="Full Name" />
            </div>

            <div id="email">
              <input type="email" name="email" placeholder="Email" />
            </div>

            <div id="password">
              <input
                type="password"
                name="password"
                placeholder="Password"
              ></input>

              <span id="show-password">Show</span>
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

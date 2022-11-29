import './Reservation.css'
import { useContext, useState } from 'react'
import axios from 'axios'
import AppContext from '../AppContext'
export default function ReservationItem() {
  const { dispatch } = useContext(AppContext)
  const [cardInformation, setCardInformation] = useState(false)
  const [guestInformation, setGuestInformation] = useState(false)
  const [dateTimeCard, setDateTimeCard] = useState(true)
  const [greeting, setGreeting] = useState(false)
  const [reservationInput, setReservationInput] = useState({
    name: '',
    email: '',
    phone_number: '',
    date: '',
    time: '',
    total_guest: '',
  })

  const nextButton = () => {
    setGuestInformation(true)
    setDateTimeCard(false)
  }

  const backButton = () => {
    setGuestInformation(false)
    setDateTimeCard(true)
  }

  const onChangeHandler = (e) => {
    setReservationInput({
      ...reservationInput,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmitHandler = async (e) => {
    try {
      // prevent page will refresh
      e.preventDefault()

      window.confirm('Are you sure to reserve the table ?')

      const token = localStorage.getItem('token')
      const option = {
        method: 'post',
        url: '/api/v1/reservations/reservation',
        data: reservationInput,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }

      const response = await axios(option)
      const { reservation } = response.data.data
      console.log(reservation)
      dispatch({
        type: 'CREATE_ONE_RESERVATION',
        payload: { ...reservation },
      })

      setGreeting(true)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      {greeting === false && (
        <form id="reservation-form" onSubmit={onSubmitHandler}>
          <div id="form-name">
            <h2>Reservation Form</h2>
          </div>

          <div id="information">
            {dateTimeCard === true && (
              <div id="date-time-card">
                <div id="date-time" className="two-rows">
                  <div id="date">
                    <label>Date</label>
                    <input
                      type="Date"
                      id="date"
                      name="date"
                      value={reservationInput.date}
                      onChange={onChangeHandler}
                      required
                    />
                  </div>
                  <div id="time">
                    <label>Time</label>
                    <select
                      type="text"
                      id="time"
                      name="time"
                      placeholder="HH : MM"
                      value={reservationInput.time}
                      onChange={onChangeHandler}
                      required
                    >
                      <option disabled selected value="">
                        choose...
                      </option>
                      <option>10:00</option>
                      <option>11:00</option>
                      <option>12:00</option>
                      <option>13:00</option>
                      <option>15:00</option>
                      <option>16:00</option>
                      <option>17:00</option>
                      <option>18:00</option>
                      <option>19:00</option>
                      <option>20:00</option>
                    </select>
                  </div>
                </div>

                {cardInformation ?? (
                  <div id="card-information">
                    <p>
                      Your payment is secure. Your card details will only be
                      shared with us.
                    </p>
                    <div id="name-number" className="two-rows">
                      <div id="card-name">
                        <label>Card Holder Name</label>
                        <input
                          type="text"
                          id="card-name"
                          name="card-name"
                          placeholder="Enter Card Holder Name"
                          required
                        />
                      </div>

                      <div id="card-number">
                        <label>Card Number</label>
                        <input
                          type="number"
                          id="card-number"
                          name="card-number"
                          placeholder="Enter Card Number"
                          required
                        />
                      </div>
                    </div>
                    <div className="two-rows">
                      <div id="expiration-date">
                        <label>Expiration Date</label>
                        <input
                          type="number"
                          id="expiration-date"
                          name="expiration-date"
                          placeholder="MM / YY"
                          required
                        />
                      </div>

                      <div id="security-code">
                        <label>Security Code</label>
                        <input
                          type="number"
                          id="security-code"
                          name="security-code"
                          placeholder="3 or 4 digits"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div
                  className={`${
                    reservationInput.date === '' || reservationInput.time === ''
                      ? 'disabled'
                      : 'reservation-button'
                  }`}
                >
                  <button
                    onClick={nextButton}
                    className="prevent-select"
                    disabled={
                      reservationInput.date === '' ||
                      reservationInput.time === ''
                    }
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {guestInformation === true && (
              <div id="guest-information">
                <div className="two-rows">
                  <div id="full-name">
                    <label>Full Name</label>
                    <input
                      type="text"
                      id="full-name"
                      name="name"
                      placeholder="Enter Full Name"
                      value={reservationInput.name}
                      onChange={onChangeHandler}
                      required
                    />
                  </div>
                  <div id="phone-number">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      id="phone-number"
                      name="phone_number"
                      placeholder="123-456-7890"
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                      value={reservationInput.phone_number}
                      maxLength="12"
                      onChange={onChangeHandler}
                      required
                    />
                  </div>
                </div>
                <div className="two-rows">
                  <div id="email-address">
                    <label>Email Address</label>
                    <input
                      type="email"
                      id="email-address"
                      name="email"
                      placeholder="Enter Email Address"
                      value={reservationInput.email}
                      onChange={onChangeHandler}
                      required
                    />
                  </div>

                  <div id="total-guest">
                    <label>Total Guest</label>
                    <input
                      type="number"
                      id="total-guest"
                      name="total_guest"
                      placeholder="Enter Total Guest"
                      value={reservationInput.total_guest}
                      onChange={onChangeHandler}
                      max="20"
                      required
                    />
                  </div>
                </div>
                <div className="cancel-submit">
                  <button type="button" onClick={backButton}>
                    Back
                  </button>
                  <button type="submit">Submit</button>
                </div>
              </div>
            )}
          </div>
        </form>
      )}

      {greeting === true && (
        <h1 id="greeting">
          Thank you {reservationInput.name} for the reservation!
        </h1>
      )}
    </div>
  )
}

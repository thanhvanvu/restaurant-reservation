import './Reservation.css'
import { useCallback, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import AppContext from '../AppContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowTrendUp } from '@fortawesome/free-solid-svg-icons'
import { reservationCapacity } from '../../actions/reservationCapacity'
import 'font-awesome/css/font-awesome.min.css'

export default function ReservationItem() {
  const { state, dispatch } = useContext(AppContext)
  const { user, reservations } = state
  const [cardInformation, setCardInformation] = useState(false)
  const [guestInformation, setGuestInformation] = useState(false)
  const [dateTimeCard, setDateTimeCard] = useState(true)
  const [greeting, setGreeting] = useState(false)
  const [timeAvailability] = useState(reservationCapacity)
  const [updatedTime, setUpdatedTime] = useState({})
  const [reservationInput, setReservationInput] = useState({
    name: '',
    email: '',
    phone_number: '',
    date: '',
    time: '',
    total_guest: null,
  })
  const [todayReservations, setTodayReservations] = useState({})

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

  // Function to get all reservations
  const getAllReservations = useCallback(async () => {
    try {
      const option = {
        method: 'get',
        url: '/api/v1/reservations/reservationHistory',
      }

      const response = await axios(option)
      const reservations = response.data.data.reservations
      // console.log(reservations)

      // Use DISPATCH to update the initial state
      dispatch({ type: 'GET_ALL_RESERVATIONS', payload: reservations })
    } catch (error) {
      console.log(error)
    }
  }, [dispatch])
  useEffect(() => {
    getAllReservations()
  }, [getAllReservations])

  // Function to get today reservations
  const getTodayReservations = () => {
    const todayReservation = reservations.filter((reservation) => {
      const d = new Date(reservation.date)
      const formattedDate =
        d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + (d.getDate() + 1)
      return formattedDate === reservationInput.date
    })
    return todayReservation
  }

  useEffect(() => {
    // get today reservations
    const todayReserves = getTodayReservations()
    setTodayReservations(todayReserves)

    // update maximum capacity after new day
    timeAvailability.forEach((time) => {
      time.seatLeft = time.capacity
    })

    // update seat left
    for (const today of todayReserves) {
      for (const time of timeAvailability) {
        if (time.time === today.time) {
          time.seatLeft -= today.total_guest
          break
        }
      }
    }

    console.log(todayReserves)
  }, [reservationInput.date]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    for (const time of timeAvailability) {
      if (time.seatLeft - reservationInput.total_guest < 0) {
        time.isAvailable = false
      } else {
        time.isAvailable = true
      }
    }

    const updatedTime = timeAvailability.filter((time) => {
      return time.isAvailable === true
    })
    setUpdatedTime(updatedTime)
  }, [reservationInput.total_guest]) // eslint-disable-line react-hooks/exhaustive-deps

  // Submit button
  const onSubmitHandler = async (e) => {
    try {
      // prevent page will refresh
      e.preventDefault()

      window.confirm('Are you sure to reserve the table ?')

      let option = {}

      if (user === null) {
        option = {
          method: 'post',
          url: '/api/v1/reservations/reservation',
          data: reservationInput,
          headers: {
            Authorization: '',
          },
        }
      } else {
        const token = localStorage.getItem('token')
        option = {
          method: 'post',
          url: '/api/v1/reservations/reservation',
          data: reservationInput,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      }

      const response = await axios(option)
      const { reservation } = response.data.data
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
                <div id="date">
                  <label>Date</label>
                  <input
                    className="prevent-select"
                    type="Date"
                    id="date"
                    name="date"
                    value={reservationInput.date}
                    onChange={onChangeHandler}
                    required
                    // min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div
                  id="guest-time"
                  className="two-rows"
                  style={{ marginTop: 15 }}
                >
                  <div id="total-guest">
                    <label>Total Guest</label>
                    <select
                      disabled={reservationInput.date === ''}
                      type="text"
                      id="total-guest"
                      name="total_guest"
                      value={reservationInput.total_guest}
                      onChange={onChangeHandler}
                      required
                    >
                      <option disabled selected value="">
                        choose...
                      </option>
                      <option value={1}>1 Guest</option>
                      <option value={2}>2 Guests</option>
                      <option value={3}>3 Guests</option>
                      <option value={4}>4 Guests</option>
                      <option value={5}>5 Guests</option>
                      <option value={6}>6 Guests</option>
                      <option value={7}>7 Guests</option>
                      <option value={8}>8 Guests</option>
                      <option value={9}>9 Guests</option>
                      <option value={10}>9+ Guests</option>
                    </select>
                  </div>

                  <div id="time">
                    <label>Time</label>
                    <select
                      disabled={reservationInput.total_guest === null}
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
                      {Object.keys(updatedTime).map((time) => (
                        <option>{updatedTime[time].time}</option>
                      ))}
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
                <div className="two-rows" style={{ marginTop: 0 }}>
                  <div id="full-name" style={{ marginTop: 0 }}>
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
                  <div id="phone-number" style={{ marginTop: 0 }}>
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
                </div>
                <div className="cancel-submit">
                  <button type="button" onClick={backButton}>
                    Back
                  </button>
                  <button type="submit">Reserve Now</button>
                </div>
              </div>
            )}

            <p id="total-booked">
              <FontAwesomeIcon icon={faArrowTrendUp} /> Booked {''}
              {todayReservations.length} times today
            </p>
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

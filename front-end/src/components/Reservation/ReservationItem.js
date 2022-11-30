import './Reservation.css'
import InputMask from 'react-input-mask'
import { useCallback, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import AppContext from '../AppContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowTrendUp,
  faUnlockKeyhole,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons'
import { reservationCapacity, holiday } from '../../actions/initalData'
import 'font-awesome/css/font-awesome.min.css'

export default function ReservationItem() {
  const { state, dispatch } = useContext(AppContext)
  const { user, reservations } = state
  const [cardInformation, setCardInformation] = useState({
    isHoliday: false,
    holidayName: '',
    gretting: '',
  })
  const [guestInformation, setGuestInformation] = useState(false)
  const [greeting, setGreeting] = useState(false)
  const [updatedTime, setUpdatedTime] = useState({})
  const [reservationInput, setReservationInput] = useState({
    name: '',
    email: '',
    phone_number: '',
    date: '',
    time: '',
    total_guest: null,
    credit_card: {
      card_number: '',
      card_name: '',
      security_code: '',
      expiration_date: '',
      billing_address: '',
    },
  })
  const [todayReservations, setTodayReservations] = useState({})
  const [overPeople, setOverPeople] = useState(false)
  const timeAvailability = reservationCapacity
  const holidayDate = holiday

  const nextButton = () => {
    console.log('abc')

    if (cardInformation.isHoliday === false) {
      setGuestInformation(true)
      return
    }
    if (
      cardInformation.isHoliday === true &&
      reservationInput.credit_card.card_number &&
      reservationInput.credit_card.card_name &&
      reservationInput.credit_card.security_code &&
      reservationInput.credit_card.expiration_date &&
      reservationInput.credit_card.billing_address
    ) {
      console.log(reservationInput.credit_card.card_number)
      console.log(reservationInput.credit_card.card_name)
      console.log(reservationInput.credit_card.security_code)
      console.log(reservationInput.credit_card.expiration_date)
      console.log(reservationInput.credit_card.billing_address)

      setGuestInformation(true)
      return
    }
  }

  const backButton = () => {
    setGuestInformation(false)
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
    // set initial data if user pick another date
    setReservationInput({
      name: '',
      email: '',
      phone_number: '',
      date: reservationInput.date,
      time: '',
      total_guest: null,
      credit_card: {
        card_number: '',
        card_name: '',
        security_code: '',
        expiration_date: '',
        billing_address: '',
      },
    })

    // track the holiday
    const sliceDate = reservationInput.date.slice(5)
    for (const date in holidayDate) {
      if (sliceDate === holidayDate[date].date) {
        setCardInformation({
          isHoliday: true,
          holidayName: holidayDate[date].name,
          gretting: holidayDate[date].greeting,
        })
        break
      } else {
        setCardInformation({
          isHoliday: false,
          holidayName: '',
          gretting: '',
        })
      }
    }

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
        console.log(time.time, today.time)
        if (time.time === today.time) {
          time.seatLeft -= today.total_guest
          break
        }
      }
    }

    console.log(todayReserves)
  }, [reservationInput.date]) // eslint-disable-line react-hooks/exhaustive-deps

  // update time availability after guests number picked
  useEffect(() => {
    if (reservationInput.total_guest > 9) {
      setOverPeople(true)
      return
    } else {
      setOverPeople(false)
    }

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
            {guestInformation === false && (
              <div id="date-time-card">
                <div className="two-rows">
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
                </div>

                {reservationInput.total_guest != null && (
                  <div id="time">
                    {overPeople === true && (
                      <p id="large-party-warning">
                        <FontAwesomeIcon
                          icon={faCircleExclamation}
                          style={{ marginRight: 10 }}
                        />
                        Unfortunately, your party is too large to make an online
                        reservation. We recommend contacting the restaurant
                        directly.
                      </p>
                    )}

                    {overPeople === false &&
                      Object.keys(updatedTime).map((time) => (
                        <button
                          type="button"
                          key={time}
                          id="time"
                          name="time"
                          onClick={(e) => {
                            setReservationInput({
                              ...reservationInput,
                              [e.target.name]: e.target.innerHTML,
                            })
                            nextButton()
                          }}
                        >
                          {updatedTime[time].time}
                        </button>
                      ))}
                  </div>
                )}

                {cardInformation.isHoliday === true && (
                  <div id="card-information">
                    <div id="warning">
                      <p>
                        <FontAwesomeIcon
                          icon={faCircleExclamation}
                          style={{ marginRight: 10 }}
                        />
                        {cardInformation.gretting} Please note that we will
                        assess a fee of 10.00 USD if you do not show up on{' '}
                        {reservationInput.date}
                      </p>
                    </div>

                    <p>
                      <FontAwesomeIcon
                        icon={faUnlockKeyhole}
                        style={{ marginRight: 5 }}
                      />{' '}
                      Your payment is secure. Your card details will only be
                      shared with us.
                    </p>
                    <div id="name-number" className="two-rows">
                      <div id="card-name">
                        <label>Card Holder Name</label>
                        <input
                          type="string"
                          id="card-name"
                          name="card_name"
                          placeholder="Enter Card Holder Name"
                          required
                          value={reservationInput.credit_card.card_name}
                          onChange={(e) => {
                            setReservationInput({
                              ...reservationInput,
                              credit_card: {
                                ...reservationInput.credit_card,
                                [e.target.name]: e.target.value,
                              },
                            })
                          }}
                        />
                      </div>

                      <div id="card-number">
                        <label>Card Number</label>
                        <InputMask
                          type="string"
                          mask="9999 9999 9999 9999"
                          id="card-number"
                          name="card_number"
                          placeholder="Enter Card Number"
                          value={reservationInput.credit_card.card_number}
                          onChange={(e) => {
                            setReservationInput({
                              ...reservationInput,
                              credit_card: {
                                ...reservationInput.credit_card,
                                [e.target.name]: e.target.value,
                              },
                            })
                          }}
                          required
                        />
                      </div>
                    </div>
                    <div id="expriration-security-code" className="two-rows">
                      <div id="expiration-date">
                        <label>Expiration Date</label>
                        <input
                          type="month"
                          id="expiration-date"
                          name="expiration_date"
                          placeholder="MM / YY"
                          value={reservationInput.credit_card.expiration_date}
                          onChange={(e) => {
                            setReservationInput({
                              ...reservationInput,
                              credit_card: {
                                ...reservationInput.credit_card,
                                [e.target.name]: e.target.value,
                              },
                            })
                          }}
                          required
                        />
                      </div>

                      <div id="security-code">
                        <label>Security Code</label>
                        <InputMask
                          type="tel"
                          mask="9999"
                          id="security-code"
                          name="security_code"
                          placeholder="3 or 4 digits"
                          value={reservationInput.credit_card.security_code}
                          onChange={(e) => {
                            setReservationInput({
                              ...reservationInput,
                              credit_card: {
                                ...reservationInput.credit_card,
                                [e.target.name]: e.target.value,
                              },
                            })
                          }}
                          required
                        />
                      </div>
                    </div>
                    <div id="billing-address">
                      <label>Billing Address</label>
                      <div>
                        <input
                          type="text"
                          id="billing_address"
                          name="billing_address"
                          style={{ marginTop: 0 }}
                          value={reservationInput.credit_card.billing_address}
                          onChange={(e) => {
                            setReservationInput({
                              ...reservationInput,
                              credit_card: {
                                ...reservationInput.credit_card,
                                [e.target.name]: e.target.value,
                              },
                            })
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* <div
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
                </div> */}
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
                    <InputMask
                      type="tel"
                      mask="(999)-999-9999"
                      id="phone-number"
                      name="phone_number"
                      placeholder="(___)-___-___"
                      value={reservationInput.phone_number}
                      // maxLength="12"
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
              <FontAwesomeIcon
                icon={faArrowTrendUp}
                style={{ marginRight: 5 }}
              />{' '}
              Booked {''}
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

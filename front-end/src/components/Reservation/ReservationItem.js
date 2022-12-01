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
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons'
import { reservationCapacity, holiday } from '../../actions/initalData'
import 'font-awesome/css/font-awesome.min.css'
import { Link } from 'react-router-dom'

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
      card_name: '',
      card_number: '',
      security_code: '',
      expiration_date: '',
      billing_address: '',
    },
    preferredDinner: '',
  })
  const [todayReservations, setTodayReservations] = useState({})
  const [overPeople, setOverPeople] = useState(false)
  const [clickShowError, setClickShowError] = useState(false)
  const timeAvailability = reservationCapacity
  const holidayDate = holiday
  const errorCheck = {
    card_name: false,
    card_number: false,
    security_code: false,
    expiration_date: false,
    billing_address: false,
  }

  const nextButton = () => {
    if (cardInformation.isHoliday === false) {
      setGuestInformation(true)
      return
    }
    console.log(cardInformation.isHoliday)
    console.log(reservationInput.credit_card.card_number.length)
    console.log(reservationInput.credit_card.card_name)
    console.log(reservationInput.credit_card.security_code.length)
    console.log(reservationInput.credit_card.expiration_date)
    console.log(reservationInput.credit_card.billing_address)
    if (
      cardInformation.isHoliday === true &&
      reservationInput.credit_card.card_number.length === 19 &&
      reservationInput.credit_card.card_name &&
      reservationInput.credit_card.security_code.length === 4 &&
      reservationInput.credit_card.expiration_date &&
      reservationInput.credit_card.billing_address
    ) {
      setGuestInformation(true)
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

  // set initial data if user pick another date
  useEffect(() => {
    setClickShowError(false)
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

    // console.log(todayReserves)
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

  // function to set the same address from the profile
  const setSameAddress = (e) => {
    if (user === null) {
      return
    }

    const address =
      user.mailing_address.address +
      ' ' +
      user.mailing_address.city +
      ' ' +
      user.mailing_address.state +
      ' ' +
      user.mailing_address.zipcode
    if (e.target.checked === true) {
      setReservationInput({
        ...reservationInput,
        credit_card: {
          ...reservationInput.credit_card,
          billing_address: address,
        },
      })
    } else {
      setReservationInput({
        ...reservationInput,
        credit_card: {
          ...reservationInput.credit_card,
          billing_address: '',
        },
      })
    }
  }

  // function to create the preffered dinner #
  const preferredDinner = (length) => {
    let result = ''
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }
  // Submit button
  const onSubmitHandler = async (e) => {
    try {
      // prevent page will refresh
      e.preventDefault()

      const dinnerPreferred = preferredDinner(5).toUpperCase()
      setReservationInput({
        ...reservationInput,
        preferredDinner: dinnerPreferred,
      })

      // if they cancel, do nothing
      if (window.confirm('Are you sure to reserve the table ?')) {
        console.log('true')
      } else {
        return
      }

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

  for (const info in reservationInput.credit_card) {
    if (reservationInput.credit_card[info] === '') {
      errorCheck[info] = true
    } else {
      errorCheck[info] = false
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
                            setClickShowError(true)
                            setReservationInput({
                              ...reservationInput,
                              [e.target.name]: e.target.innerHTML,
                            })

                            nextButton(e)
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
                        <label>Card Holder Name*</label>

                        {clickShowError === true &&
                          errorCheck.card_name === true && (
                            <span className="card-error">
                              <FontAwesomeIcon
                                icon={faTriangleExclamation}
                                style={{ marginRight: 5 }}
                              />
                              Please fill out this field
                            </span>
                          )}

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
                        <label>Card Number*</label>
                        {clickShowError === true &&
                          errorCheck.card_number === true && (
                            <span className="card-error">
                              <FontAwesomeIcon
                                icon={faTriangleExclamation}
                                style={{ marginRight: 5 }}
                              />
                              Please fill out this field
                            </span>
                          )}
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
                        <label>Expiration Date*</label>
                        {clickShowError === true &&
                          errorCheck.expiration_date === true && (
                            <span className="card-error">
                              <FontAwesomeIcon
                                icon={faTriangleExclamation}
                                style={{ marginRight: 5 }}
                              />
                              Please fill out this field
                            </span>
                          )}
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
                        <label>Security Code*</label>
                        {clickShowError === true &&
                          errorCheck.security_code === true && (
                            <span className="card-error">
                              <FontAwesomeIcon
                                icon={faTriangleExclamation}
                                style={{ marginRight: 5 }}
                              />
                              Please fill out this field
                            </span>
                          )}
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
                      <label>Billing Address*</label>
                      <label id="label-checkbox">
                        <input
                          type="checkbox"
                          id="checkbox"
                          onClick={setSameAddress}
                        />
                        Same as profile address
                      </label>

                      {clickShowError === true &&
                        errorCheck.billing_address === true && (
                          <span className="card-error">
                            <FontAwesomeIcon
                              icon={faTriangleExclamation}
                              style={{ marginRight: 5 }}
                            />
                            Please fill out this field
                          </span>
                        )}
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
        <>
          {user ? (
            <>
              <h1 className="greeting">
                Thank you {reservationInput.name} for the reservation!
              </h1>
              <h1 className="greeting" style={{ fontSize: 30, marginTop: 20 }}>
                Here is your preferred dinner:{' '}
                {reservationInput.preferredDinner}
              </h1>
            </>
          ) : (
            <>
              <h1 className="greeting">
                Thank you {reservationInput.name} for the reservation!
              </h1>
              <h3 className="greeting" style={{ fontSize: 20 }}>
                Looks like you are not our member, please join us{' '}
                <Link to="/register" style={{ color: 'blue' }}>
                  here
                </Link>
              </h3>
            </>
          )}
        </>
      )}
    </div>
  )
}

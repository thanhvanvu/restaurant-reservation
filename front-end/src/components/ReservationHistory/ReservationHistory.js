import './ReservationHistory.css'
import ReservationHistoryItem from './ReservationHistoryItem'
import axios from 'axios'
import { useCallback, useContext, useEffect } from 'react'
import AppContext from '../AppContext'

export default function ReservationHistory() {
  // useContext: to get the STATE, DISPATCH from AppContext
  const { state, dispatch } = useContext(AppContext)
  const { reservations, user } = state

  // function to get all reservations
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

  // when refreshing or moving from another component
  // run getAllReservations automatically
  useEffect(() => {
    getAllReservations()
  }, [getAllReservations])

  const newResevertions = reservations.map((reservation) => {
    if (reservation.customer === null) {
      return { ...reservation, isUser: false }
    } else {
      if (reservation.customer.name === user.userName) {
        return { ...reservation, isUser: true }
      } else {
        return { ...reservation }
      }
    }
  })

  // console.log(newResevertions)
  return (
    <div id="hero" className="container">
      <div id="form-reservation">
        <div id="form-name">
          <h2>Restaurant Reservation History</h2>
        </div>

        <div id="information">
          <table>
            <thead className="reservation-history-labels">
              <tr>
                <th scope="col" className="customer">
                  Customer Name
                </th>
                <th scope="col" className="email">
                  Email
                </th>
                <th scope="col" className="phone">
                  Phone Number
                </th>
                <th scope="col" className="date">
                  Date
                </th>
                <th scope="col" className="time">
                  Time
                </th>
                <th scope="col" className="totalGuest">
                  Total Guest
                </th>
              </tr>
            </thead>
            {newResevertions.map(
              (reservation) =>
                reservation.isUser && (
                  <ReservationHistoryItem
                    reservation={reservation}
                    key={reservation._id}
                  />
                )
            )}
          </table>
        </div>
      </div>
    </div>
  )
}

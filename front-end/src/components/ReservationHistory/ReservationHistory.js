import './ReservationHistory.css'
import ReservationHistoryItem from './ReservationHistoryItem'
import AdminReservationHistory from './ReservationHistoryItem'
import axios from 'axios'
import { useCallback, useContext, useEffect, useState } from 'react'
import AppContext from '../AppContext'

export default function ReservationHistory() {
  // useContext: to get the STATE, DISPATCH from AppContext
  const { state, dispatch } = useContext(AppContext)
  const { reservations, user } = state
  const [dateHistory, setDateHistory] = useState({
    date: '',
  })
  const [todayHistoryASC, setTodayHistoryASC] = useState([])
  const [todayHistoryDESC, setTodayHistoryDESC] = useState([])
  const [sort, setSort] = useState('1')

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

  // when date picked, get reservation and sort
  useEffect(() => {
    // get today Date from all reservations
    const todayHistory = reservations
      .filter((reservation) => {
        const d = new Date(reservation.date)
        const formattedDate =
          d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + (d.getDate() + 1)
        return formattedDate === dateHistory.date
      })
      .map((today) => {
        if (today.time === '10:00 AM') {
          return { ...today, number: 0 }
        } else if (today.time === '11:00 AM') {
          return { ...today, number: 1 }
        } else if (today.time === '12:00 PM') {
          return { ...today, number: 2 }
        } else if (today.time === '13:00 PM') {
          return { ...today, number: 3 }
        } else if (today.time === '14:00 PM') {
          return { ...today, number: 4 }
        } else if (today.time === '15:00 PM') {
          return { ...today, number: 5 }
        } else if (today.time === '16:00 PM') {
          return { ...today, number: 6 }
        } else if (today.time === '17:00 PM') {
          return { ...today, number: 7 }
        } else if (today.time === '18:00 PM') {
          return { ...today, number: 8 }
        } else if (today.time === '19:00 PM') {
          return { ...today, number: 9 }
        } else {
          return { ...today, number: 10 }
        }
      })

    // sort will sort the original object, so to shallow-copied object, need to use spread syntax [...object]
    const sortedTodayHistoryASC = [...todayHistory].sort(
      (reservation1, reservation2) =>
        reservation1.number - reservation2.number ||
        reservation1.total_guest - reservation2.total_guest
    )
    setTodayHistoryASC(sortedTodayHistoryASC)

    console.log(sortedTodayHistoryASC)

    const sortedTodayHistoryDESC = [...todayHistory].sort(
      (reservation1, reservation2) =>
        reservation2.number - reservation1.number ||
        reservation2.total_guest - reservation1.total_guest
    )
    setTodayHistoryDESC(sortedTodayHistoryDESC)

    console.log(sortedTodayHistoryDESC)
  }, [dateHistory.date]) // eslint-disable-line react-hooks/exhaustive-deps

  const newResevertions = reservations.map((reservation) => {
    if (reservation.customer === null) {
      return { ...reservation, isUser: false }
    } else {
      if (user === null) {
        return {}
      } else {
        if (reservation.customer.name === user.userName) {
          return { ...reservation, isUser: true }
        } else {
          return { ...reservation }
        }
      }
    }
  })

  return (
    <div id="hero" className="container">
      <div id="form-reservation">
        <div id="form-name">
          {user ? (
            user.isAdmin === true && (
              <>
                <input
                  type="Date"
                  name="date"
                  id="date-history"
                  className="prevent-select"
                  value={dateHistory.date}
                  onChange={(e) => {
                    setDateHistory({ [e.target.name]: e.target.value })
                  }}
                />
                <select
                  id="sort"
                  value={sort}
                  name="sort"
                  onChange={(e) => {
                    setSort(e.target.value)
                  }}
                  placeholder="Sort"
                >
                  <option disabled selected value="">
                    Sort
                  </option>
                  <option value={1}>Time: Earliest first</option>
                  <option value={2}>Time: Latest first</option>
                </select>
              </>
            )
          ) : (
            <></>
          )}

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
            {user ? (
              user.isAdmin === true ? (
                <>
                  {sort === '1' &&
                    todayHistoryASC.map((reservation) => (
                      <AdminReservationHistory
                        reservation={reservation}
                        key={reservation._id}
                      />
                    ))}
                  {sort === '2' &&
                    todayHistoryDESC.map((reservation) => (
                      <AdminReservationHistory
                        reservation={reservation}
                        key={reservation._id}
                      />
                    ))}
                </>
              ) : (
                <>
                  {newResevertions.map(
                    (reservation) =>
                      reservation.isUser && (
                        <ReservationHistoryItem
                          reservation={reservation}
                          key={reservation._id}
                        />
                      )
                  )}
                </>
              )
            ) : (
              <></>
            )}
          </table>
        </div>
      </div>
    </div>
  )
}

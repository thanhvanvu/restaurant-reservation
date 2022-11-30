import React from 'react'

export default function ReservationHistoryItem({ reservation }) {
  let formattedDate = ''
  if (reservation.date) {
    const d = new Date(reservation.date)
    const date = d.getDate() + 1

    // Since getMonth() returns month from 0-11 not 1-12
    const month = d.getMonth() + 1

    const year = d.getFullYear()

    formattedDate = date + '/' + month + '/' + year
  } else {
    formattedDate = ''
  }

  return (
    <tbody>
      <tr className="reservation-items">
        <td>{reservation.name}</td>
        <td>{reservation.email}</td>
        <td>{reservation.phone_number}</td>
        <td>{formattedDate}</td>
        <td>{reservation.time}</td>
        <td>{reservation.total_guest}</td>
      </tr>
    </tbody>
  )
}

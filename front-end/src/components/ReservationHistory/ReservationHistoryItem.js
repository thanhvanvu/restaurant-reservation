import React from 'react'

export default function ReservationHistoryItem({ reservation }) {
  return (
    <tbody>
      <tr className="reservation-items">
        <td>{reservation.name}</td>
        <td>{reservation.email}</td>
        <td>{reservation.phone_number}</td>
        <td>{reservation.date}</td>
        <td>{reservation.time}</td>
        <td>{reservation.total_guest}</td>
      </tr>
    </tbody>
  )
}

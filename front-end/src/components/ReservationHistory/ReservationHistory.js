import './ReservationHistory.css'
import ReservationHistoryItem from './ReservationHistoryItem'

export default function ReservationHistory() {
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
            <ReservationHistoryItem />
          </table>
        </div>
      </div>
    </div>
  )
}

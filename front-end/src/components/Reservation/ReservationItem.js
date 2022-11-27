export default function ReservationItem() {
  return (
    <div>
      <form id="reservation-form">
        <div id="form-name">
          <h2>Reservation Form</h2>
        </div>
        <div id="information">
          <div id="full-name">
            <label>Full Name</label>
            <input
              type="text"
              id="full-name"
              name="full-name"
              placeholder="Enter Full Name"
              required
            />
          </div>

          <div id="email-address">
            <label>Email Address</label>
            <input
              type="text"
              id="email-address"
              name="email-address"
              placeholder="Enter Email Address"
              required
            />
          </div>

          <div id="date">
            <label>Date</label>
            <input
              type="date"
              id="date"
              name="date"
              placeholder="yyyy-mm-dd"
              required
            />
          </div>

          <div id="time-total-guest">
            <div id="time">
              <label>Time</label>
              <input
                type="text"
                id="time"
                name="time"
                placeholder="HH : MM"
                required
              />
            </div>

            <div id="total-guest">
              <label>Total Guest</label>
              <input
                type="number"
                id="total-guest"
                name="total-guest"
                placeholder="Total Guest"
                required
              />
            </div>
          </div>

          <div id="reservation-submit">
            {/* <button
              type="button"
              // onClick={priceCalulated}
              // className={!buttonDisable ? 'button-disabled' : 'button'}
              // disabled={!buttonDisable}
            >
              Get Quote
            </button> */}

            <button
              type="submit"
              // className={submitButton ? 'button' : 'button-disabled'}
              // disabled={!submitButton}
            >
              Reserve
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

import React, { useContext, useState } from 'react'
import axios from 'axios'
import AppContext from '../AppContext'

export default function UserProfileItem({ user }) {
  const { dispatch } = useContext(AppContext)
  const [openEditForm, setOpenEditForm] = useState(false)
  const userAddress = user.mailing_address

  console.log(user)
  const [userProfileInput, setUserProfileInput] = useState({
    name: user.userName,
    preferred_payment: user.preferred_payment,

    mailing_address: {
      address: userAddress.address,
      city: userAddress.city,
      state: userAddress.state,
      zipcode: userAddress.zipcode,
    },
  })

  // function to update userProfile
  const updateCurrentUser = async (e) => {
    try {
      const option = {
        method: 'put',
        url: `/api/v1/auth/userProfile/${user.userId}`,
        data: userProfileInput,
      }

      // send request to server
      await axios(option)

      // Update the USER state
      dispatch({
        type: 'UPDATE_CURRENT_USER',
        payload: { ...userProfileInput },
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div id="profile-wrap">
      {openEditForm === false && (
        <>
          <div id="user-profile">
            <form className="profile-form">
              <div id="form-name">
                <h2>User Profile</h2>
              </div>

              <div id="information">
                <div id="profile-wrap">
                  <div id="name">
                    <label>Full Name</label>

                    <p>{user.userName}</p>
                  </div>

                  <div id="address1">
                    <label>Address</label>
                    <p>{userAddress.address}</p>
                  </div>

                  <div id="city-state-zip">
                    <div id="city">
                      <label>City</label>
                      <p>{userAddress.city}</p>
                    </div>

                    <div id="state">
                      <label>State</label>
                      <p>{userAddress.state}</p>
                    </div>

                    <div id="zipcode">
                      <label>Zip code</label>
                      <p>{userAddress.zipcode}</p>
                    </div>
                  </div>

                  <div className="payment-point">
                    <div className="preferred-payment">
                      <label>Preferred Payment</label>
                      <p>{user.preferred_payment}</p>
                    </div>
                    <div className="earned-point">
                      <label>Earned point</label>
                      <p>0</p>
                      <label>(Based on $ spent: $1 is 1 point)</label>
                    </div>
                  </div>
                </div>

                <div id="profile-edit">
                  <span onClick={() => setOpenEditForm(true)}>Edit</span>
                </div>
              </div>
            </form>
          </div>
        </>
      )}

      {/* When user click Edit button */}
      {openEditForm && (
        <>
          <div id="profile-edit " className="fade-in">
            <form className="profile-form" onSubmit={updateCurrentUser}>
              <div id="form-name">
                <h2>Update Information</h2>
              </div>

              <div id="information">
                <div id="edit-wrap">
                  <div id="name">
                    <label>Full Name</label>

                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter Name"
                      value={userProfileInput.name}
                      onChange={(e) => {
                        setUserProfileInput({
                          ...userProfileInput,
                          [e.target.name]: e.target.value,
                        })
                      }}
                      required
                    />
                  </div>

                  <div id="address1">
                    <label>Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      placeholder="Enter Address"
                      value={userProfileInput.mailing_address.address}
                      onChange={(e) => {
                        setUserProfileInput({
                          ...userProfileInput,
                          mailing_address: {
                            ...userProfileInput.mailing_address,
                            [e.target.name]: e.target.value,
                          },
                        })
                      }}
                      required
                    />
                  </div>

                  <div id="city-state-zip">
                    <div id="city">
                      <label>City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        placeholder="Enter City"
                        value={userProfileInput.mailing_address.city}
                        onChange={(e) => {
                          setUserProfileInput({
                            ...userProfileInput,
                            mailing_address: {
                              ...userProfileInput.mailing_address,
                              [e.target.name]: e.target.value,
                            },
                          })
                        }}
                        required
                      />
                    </div>

                    <div id="state">
                      <label>State</label>
                      <select
                        id="state"
                        name="state"
                        value={userProfileInput.mailing_address.state}
                        onChange={(e) => {
                          setUserProfileInput({
                            ...userProfileInput,
                            mailing_address: {
                              ...userProfileInput.mailing_address,
                              [e.target.name]: e.target.value,
                            },
                          })
                        }}
                        required
                      >
                        <option selected disabled value="">
                          Choose...
                        </option>
                        <option>AA</option>
                        <option>AE</option>
                        <option>AK</option>
                        <option>AL</option>
                        <option>AP</option>
                        <option>AR</option>
                        <option>AZ</option>
                        <option>CA</option>
                        <option>CO</option>
                        <option>CT</option>
                        <option>DC</option>
                        <option>DE</option>
                        <option>FL</option>
                        <option>HI</option>
                        <option>ID</option>
                        <option>IL</option>
                        <option>IN</option>
                        <option>IA</option>
                        <option>KS</option>
                        <option>KY</option>
                        <option>LA</option>
                        <option>ME</option>
                        <option>MD</option>
                        <option>MA</option>
                        <option>MI</option>
                        <option>MN</option>
                        <option>MS</option>
                        <option>MO</option>
                        <option>MT</option>
                        <option>NE</option>
                        <option>NV</option>
                        <option>NH</option>
                        <option>NJ</option>
                        <option>NM</option>
                        <option>NY</option>
                        <option>NC</option>
                        <option>ND</option>
                        <option>OH</option>
                        <option>OK</option>
                        <option>OR</option>
                        <option>PA</option>
                        <option>RI</option>
                        <option>SC</option>
                        <option>SD</option>
                        <option>TN</option>
                        <option>TX</option>
                        <option>UT</option>
                        <option>VT</option>
                        <option>VA</option>
                        <option>WA</option>
                        <option>WV</option>
                        <option>WI</option>
                        <option>WY</option>
                      </select>
                    </div>

                    <div id="zipcode">
                      <label>Zip code</label>
                      <input
                        type="text"
                        id="zipcode"
                        name="zipcode"
                        placeholder="Enter Zip code"
                        minLength="5"
                        maxLength="5"
                        value={userProfileInput.mailing_address.zipcode}
                        onChange={(e) => {
                          setUserProfileInput({
                            ...userProfileInput,
                            mailing_address: {
                              ...userProfileInput.mailing_address,
                              [e.target.name]: e.target.value,
                            },
                          })
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div className="payment-point">
                    <div className="preferred-payment">
                      <label>Preferred Payment</label>
                      <select
                        className="preferred-payment"
                        name="preferred_payment"
                        value={userProfileInput.preferred_payment}
                        onChange={(e) => {
                          setUserProfileInput({
                            ...userProfileInput,
                            [e.target.name]: e.target.value,
                          })
                        }}
                        required
                      >
                        <option selected disabled value="">
                          Choose...
                        </option>
                        <option>Cash</option>
                        <option>Check</option>
                        <option>Credit Card</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div id="profile-submit" className="cancel-submit">
                  <button type="submit">Update</button>
                  <button onClick={() => setOpenEditForm(false)} type="button">
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  )
}

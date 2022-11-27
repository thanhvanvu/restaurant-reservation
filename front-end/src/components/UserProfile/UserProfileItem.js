import React, { useState } from 'react'

export default function UserProfileItem() {
  const [openEditForm, setOpenEditForm] = useState(false)
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

                    <p>Thanh</p>
                  </div>

                  <div id="address1">
                    <label>Address 1</label>
                    <p>address</p>
                  </div>

                  <div id="city-state-zip">
                    <div id="city">
                      <label>City</label>
                      <p>city</p>
                    </div>

                    <div id="state">
                      <label>State</label>
                      <p>state</p>
                    </div>

                    <div id="zipcode">
                      <label>Zip code</label>
                      <p>77075</p>
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
            <form className="profile-form">
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
                      required
                    />
                  </div>

                  <div id="address1">
                    <label>Address 1</label>
                    <input
                      type="text"
                      id="address1"
                      name="address1"
                      placeholder="Enter Address 1"
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
                        required
                      />
                    </div>

                    <div id="state">
                      <label>State</label>
                      <select id="state" name="state">
                        <option selected>Choose...</option>
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
                        <option>GA</option>
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
                        required
                      />
                    </div>
                  </div>
                </div>

                <div id="profile-submit">
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

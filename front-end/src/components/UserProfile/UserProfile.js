import { useContext } from 'react'
import './UserProfile.css'
import UserProfileItem from './UserProfileItem'
import AppContext from '../AppContext'

export default function UserProfile() {
  const { state } = useContext(AppContext)
  const { user } = state
  return (
    <div id="hero" className="container">
      <div id="profile-wrap">
        {user && <UserProfileItem user={user} key={user.userId} />}
      </div>
    </div>
  )
}

import React from 'react'
import UserProfile from '../components/UserProfile'

const Profile = ({user}) => {
  return (
    <>
    <UserProfile user={user} />
    </>
  )
}

export default Profile
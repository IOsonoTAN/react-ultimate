import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import UsersContext from '../../../contexts/UsersContext'

const Logout: React.FC = () => {
  const { setAccessToken, setRefreshToken, setIsLoggedIn } = useContext(UsersContext)

  setAccessToken('')
  setRefreshToken('')
  setIsLoggedIn(false)

  return <Redirect to="/login" />
}

export default Logout
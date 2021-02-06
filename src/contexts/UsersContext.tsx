import React, { useEffect, useState, createContext } from 'react'

export interface UsersContextProps { 
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  user: object
  setUser: React.Dispatch<React.SetStateAction<object>>
  accessToken: string
  setAccessToken: React.Dispatch<React.SetStateAction<string>>
  refreshToken: string
  setRefreshToken: React.Dispatch<React.SetStateAction<string>>
}

const UsersContext = createContext({} as UsersContextProps)

export const UsersProvider: React.FunctionComponent = (props) => {
  const isLoggedInKey = 'isLoggedIn'
  const userObjectKey = 'user'
  const accessTokenKey = 'accessToken'
  const refreshTokenKey = 'refreshToken'

  const isLoggedInLocal = localStorage.getItem(isLoggedInKey)
  const userObjectInLocal = localStorage.getItem(userObjectKey)
  const accessTokenInLocal = localStorage.getItem(accessTokenKey)
  const refreshTokenInLocal = localStorage.getItem(refreshTokenKey)

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(isLoggedInLocal ? JSON.parse(isLoggedInLocal) : false)
  const [user, setUser] = useState<object>(userObjectInLocal ? JSON.parse(userObjectInLocal) : {})
  const [accessToken, setAccessToken] = useState<string>(accessTokenInLocal ? JSON.parse(accessTokenInLocal) : '')
  const [refreshToken, setRefreshToken] = useState<string>(refreshTokenInLocal ? JSON.parse(refreshTokenInLocal) : '')

  useEffect(() => {
    localStorage.setItem(isLoggedInKey, JSON.stringify(isLoggedIn))
  }, [isLoggedIn])

  useEffect(() => {
    if (user) {
      localStorage.setItem(userObjectKey, JSON.stringify(user))
      return
    }
    localStorage.removeItem(userObjectKey)
  }, [user])

  useEffect(() => {
    localStorage.setItem(accessTokenKey, JSON.stringify(accessToken))
  }, [accessToken])

  useEffect(() => {
    localStorage.setItem(refreshTokenKey, JSON.stringify(refreshToken))
  }, [refreshToken])

  return (
    <UsersContext.Provider
      value={
        {
          isLoggedIn,
          setIsLoggedIn,
          user,
          setUser,
          accessToken,
          setAccessToken,
          refreshToken,
          setRefreshToken
        }
    }>
      {props.children}
    </UsersContext.Provider>
  )
}

export default UsersContext
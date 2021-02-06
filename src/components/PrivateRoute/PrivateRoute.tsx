import * as jwt from 'jsonwebtoken'
import { useContext, useEffect } from 'react'
import { message } from 'antd'
import { Redirect, Route, RouteProps } from 'react-router-dom'

import { getCurrentTimestamp } from '../../utils/datetime'
import UsersContext from '../../contexts/UsersContext'
import { requestRefrestToken } from '../../hooks/users'

interface TokenDecoded {
  aud: string
  exp: number
  iat: number
}
const getTokenExp = (token: string): number => {
  const payload = jwt.decode(token)
  const { exp }: TokenDecoded = Object(payload)

  return exp
}

interface PrivateRouteProps extends RouteProps {
  component: any
}
const PrivateRoute = ({ component: Component, ...rest }: PrivateRouteProps) => {
  const {
    isLoggedIn,
    accessToken,
    refreshToken,
    setIsLoggedIn,
    setAccessToken,
    setRefreshToken
  } = useContext(UsersContext)

  const accessTokenExp = getTokenExp(accessToken)

  const tryRequestRefrestToken = async () => {
    const tokens = await requestRefrestToken(refreshToken)
    console.log(tokens)
    setAccessToken(tokens.accessToken)
    setRefreshToken(tokens.refreshToken)
    return
  }

  const currentTimestamp = getCurrentTimestamp()

  useEffect(() => {
    /**
     * Check current timestamp with access token exp
     * if token expired wil set to be unauthorized user
     */
    if (currentTimestamp > accessTokenExp) {
      message.error('Session has expired')
      setAccessToken('')
      setRefreshToken('')
      setIsLoggedIn(false)
      return
    }

    /**
     * Check if access token will expired in 30 seconds
     * will try to refrest token from backend
     */
    const needTryToRefreshToken = ((accessTokenExp - currentTimestamp) < 30)
    if (needTryToRefreshToken) {
      tryRequestRefrestToken()
    }
  })

  return (
    <Route {...rest} render={
      (props) => (
        isLoggedIn ? <Component {...props} /> : <Redirect to='/login' />
      )
    } />
  )
}

export default PrivateRoute
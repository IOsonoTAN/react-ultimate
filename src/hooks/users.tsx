import axios from 'axios'
import config from '../config'

const { backendUrl } = config

interface LoginApiResponseValues {
  accessToken: string
  refreshToken: string
}

const handleResponseError = (error: any) => {
  if (error.response && error.response.data && error.response.data.error) {
    throw error.response.data.error
  }
  throw error
}

export const requestUserLogin = async (username: string, password: string): Promise<LoginApiResponseValues> => {
  const data: LoginApiResponseValues = await axios
    .post(`${backendUrl}/users/login`, {
      username,
      password
    })
    .then(({ data }) => data)
    .catch(error => handleResponseError(error))

  return data
}

export const requestRefrestToken = async (refreshToken: string): Promise<LoginApiResponseValues> => {
  const data: LoginApiResponseValues = await axios
    .post(`${backendUrl}/users/refresh-token`, {
      refreshToken
    })
    .then(({ data }) => data)
    .catch(error => handleResponseError(error))

  return data
}

export const requestRevokeRefreshToken = async (refreshToken: string): Promise<boolean> => {
  /**
   * @TODO create new request to revoke refresh token to backend
   */
  return true
}
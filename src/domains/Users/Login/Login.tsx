import React, { useContext } from 'react'
import { Button, Divider, Form, Input, message, Space } from 'antd'
import { RouteComponentProps } from 'react-router-dom'
import UsersContext from '../../../contexts/UsersContext'
import { requestUserLogin } from '../../../hooks/users'

interface LoginFormSubmitValues {
  username: string
  password: string
}

const UsersLogin: React.FC<RouteComponentProps<any>> = ({ history }) => {
  const { setAccessToken, setRefreshToken, setIsLoggedIn } = useContext(UsersContext)

  const [formLogin] = Form.useForm()

  const handleSubmit = async (values: LoginFormSubmitValues) => {
    try {
      const data = await requestUserLogin(values.username, values.password)

      message.success('Login Successful')
      setAccessToken(data.accessToken)
      setRefreshToken(data.refreshToken)
      setIsLoggedIn(true)

      return history.push('/')
    } catch (error) {
      const refCode = error.refCode ?? ''

      message.error(`${error.message} ${refCode ? ` (${refCode})` : ''}`)
      setAccessToken('')
      setRefreshToken('')
      setIsLoggedIn(false)
      formLogin.resetFields()
    }
  }

  return (
    <Form
      form={formLogin}
      layout="vertical"
      name="formLogin"
      className="content-login"
      onFinish={handleSubmit}
      onReset={() => formLogin.resetFields()}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Divider />
        <Space>
          <Button type="primary" htmlType="submit">
            Sign In
          </Button>
          <Button htmlType="reset">
            Reset form
          </Button>
          <Button onClick={
            () => (
              formLogin.setFieldsValue({
                username: 'IOsonoTAN',
                password: '1212312121'
              })
            )
          }>
            Auto fill
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}

export default UsersLogin
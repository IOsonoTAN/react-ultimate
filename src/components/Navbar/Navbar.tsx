import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Space, Typography, Divider } from 'antd'
import { If, Else, Then } from 'react-if'

import UsersContext from '../../contexts/UsersContext'

const Navbar: React.FC = () => {
  const { isLoggedIn } = useContext(UsersContext)

  return (
    <If condition={isLoggedIn}>
      <Then>
        <Space split={<Divider type="vertical" />}>
          <Link to="/" component={Typography.Link}>Homepage</Link>
          <Link to="/logout" component={Typography.Link}>Logout</Link>
        </Space>
      </Then>
      <Else>
        <Link to="/login" component={Typography.Link}>Login</Link>
      </Else>
    </If>
  )
}

export default Navbar
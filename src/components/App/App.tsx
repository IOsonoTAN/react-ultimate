import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Layout } from 'antd'

import './App.css'
import PrivateRoute from '../PrivateRoute'
import DomainHome from '../../domains/Home'
import DomainUsersLogin from '../../domains/Users/Login'
import DomainUsersLogout from '../../domains/Users/Logout'
import DomainPageNotFound from '../../domains/PageNotFound'

import ContextProvider from '../../contexts'
import Navbar from '../Navbar'

const { Header, Content } = Layout

const App: React.FunctionComponent = () => (
  <ContextProvider>
    <BrowserRouter>
      <Header>
        <Navbar />
      </Header>
      <Content className="content-main">
        <Switch>
          <Route exact path='/login' component={DomainUsersLogin} />
          <PrivateRoute exact path='/' component={DomainHome} />
          <PrivateRoute exact path='/logout' component={DomainUsersLogout} />
          <Route exact path='*' component={DomainPageNotFound} />
        </Switch>
      </Content>
      </BrowserRouter>
  </ContextProvider>
)

export default App

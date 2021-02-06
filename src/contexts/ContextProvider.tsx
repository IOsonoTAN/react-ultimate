import React from 'react'

import { UsersProvider } from './UsersContext'

const providers = [
  UsersProvider
]

const ContextProvider = (...components: React.FC[]): React.FC => {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      return ({ children }): JSX.Element => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        )
      }
    },
    ({ children }) => <>{children}</>,
  )
}

export default ContextProvider(...providers)

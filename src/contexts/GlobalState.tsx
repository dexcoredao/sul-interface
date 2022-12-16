import { createContext, useReducer, FC } from 'react'
import Reducer from './Reducer'
import { Action, State } from './types'

const initialState: State = {
  connectWallet: {
    open: false,
  },
}

export const GlobalContext = createContext<{
  state: State
  dispatch: React.Dispatch<Action>
}>({
  state: initialState,
  dispatch: () => null,
})

interface GlobalProps {
  children?: React.ReactNode
}
// @ts-ignore
export const GlobalProvider: FC<GlobalProps> = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState)

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )
}

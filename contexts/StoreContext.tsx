import React, { useState, useEffect, useContext, createContext, useReducer } from "react";

export interface UserData {
	username: string;
	uuid: string;
	walletAddress?: string;
  bets?: any[]
}

export const StoreContext = React.createContext({})

const initialState: UserData = { username: '', uuid: '', }
export enum StoreActionType {
  SetStoreData = 'setStoreData',
  RemoveStoreData = 'removeStoreData',
}

interface IAction {
  type: StoreActionType
  payload: UserData
}

const reducer: React.Reducer<{}, IAction> = (state, action) => {
  switch (action.type) {
    case StoreActionType.SetStoreData:
      return {
        username: action.payload.username,
        uuid: action.payload.uuid,
		walletAddress: action.payload.walletAddress
      }
    case StoreActionType.RemoveStoreData:
      return {
        username: initialState.username,
        uuid: initialState.uuid,
        walletAddress: initialState.walletAddress,
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

export const StoreProvider = ({ children }: any) => {
  let localState = null
  if (typeof window !== 'undefined' && window.localStorage.getItem('userInfo')) {
    localState = JSON.parse(window.localStorage.getItem('userInfo') || '')
  }
  const [state, dispatch] = useReducer(reducer, localState || initialState)

  useEffect(() => {
    window.localStorage.setItem('userInfo', JSON.stringify(state))
  }, [state])

  return <StoreContext.Provider value={[state, dispatch]}>{children}</StoreContext.Provider>
}

// useContext hook - export here to keep code for global Store state
// together in this file, allowing user info to be accessed and updated
// in any functional component using the hook
export const useStore: any = () => useContext(StoreContext)

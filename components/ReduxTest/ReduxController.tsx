'use client'

import React from 'react'
import type { RootState } from "@/redux/store"
import { useDispatch, useSelector } from "react-redux"
import { onDemo } from '@/redux/store'

const ReduxController = () => {
  const reduxCount = useSelector((state: RootState) => state.reduxData.reduxCount)
  const dispatch = useDispatch()
  return (
    <React.Fragment>
      <button className="text-1xl font center" onClick={()=>{ dispatch(onDemo( reduxCount+1))} }> count </button>
    </React.Fragment>
  )
}

export default ReduxController

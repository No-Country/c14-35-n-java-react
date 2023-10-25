'use client'

import React from 'react'

import type { RootState } from "@/redux/store"
import { useSelector } from "react-redux"

const ReduxView = () => {
  const reduxMessaje = useSelector((state: RootState) => state.reduxData.reduxMessage)
  const reduxCount = useSelector((state: RootState) => state.reduxData.reduxCount)
  return (
    <h1 className="mt-10 -mb-6 text-1xl font text-center">
      { `${reduxMessaje} ${reduxCount}` }
    </h1>
  )
}

export default ReduxView
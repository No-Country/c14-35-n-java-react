import React from 'react'

const LoadMessage = () => {
  return (
    <div className="mt-16 flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 border-t-4 border-indigo-600 border-solid rounded-full animate-spin"></div>
        <div className="mt-10 mb-10 text-indigo-600  text-lg font-semibold"> { 'Cargando...' }  </div>
      </div>
    </div>
  )
}

export default LoadMessage

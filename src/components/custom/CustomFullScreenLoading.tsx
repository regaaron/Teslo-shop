import React from 'react'

export const CustomFullScreenLoading = () => {
  return (
    //crear un spinner de carga con tailwindcss y que ocupe toda la pantalla
    <div className='flex items-center justify-center h-screen w-screen'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900'></div>
    </div>
  )
}

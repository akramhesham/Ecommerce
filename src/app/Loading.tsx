import React from 'react'
import { BeatLoader } from 'react-spinners'

export default function Loading() {
  return (
    <div className='flex justify-center items-center h-[90%]'>
      <BeatLoader
        color='#0aad0a'/>
    </div>
  )
}

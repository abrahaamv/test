import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PDFComponent from './PDFComponent'
import object_status from './maried_with_kids'

function App() {

  return (
    <>
      <PDFComponent datas={object_status} />
    </>
  )
}

export default App

import React from 'react'
import Header from './sections/Header'
import Footer from './sections/Footer'

interface Props{
    children: React.ReactNode
}

const LandingLayout:React.FC<Props> = ({children}) => {
  return (
    <>
        <Header/>
        {children}
        <Footer/>
    </>
  )
}

export default LandingLayout
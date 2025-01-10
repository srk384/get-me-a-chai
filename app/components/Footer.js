import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div>
        <footer className='bg-slate-800 text-white text-center p-4 text-sm md:tedxt-base'>
            <p>GetMeAChai &copy; {currentYear}</p>
        </footer>
    </div>
  )
}

export default Footer
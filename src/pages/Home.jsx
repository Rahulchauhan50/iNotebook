import React from 'react'
import Navbar from '../components/Navbar'
import Folder from '../components/Folder'
import Files from '../components/Files'
import Editor from '../components/Editor'
import Createpopup from '../components/Createpopup'
import Deletepopup from '../components/Deletepopup'


export default function () {

  return (
    <div className='min-h-screen '>
      <div style={{position: "sticky", top:"0px",zIndex:"10"}}>
        <Navbar/>
      </div>
      <div className='absolute'>
      <Createpopup/>
      <Deletepopup/>
      </div>
      <div className='flex flex-col md:flex-row'>
        <div className='flex flex-col md:flex-row md:w-[50%] w-full'>
        <div className='md:w-1/2 w-full bg-slate-800 md:h-screen'>
            <Folder/>
        </div>
        <div className='md:w-1/2 w-full bg-slate-800 md:h-screen'>
            <Files/>
        </div>
        </div>
        <div className='md:w-[55%] overflow-y-auto mt-8 md:mt-0 w-full bg-slate-800 md:h-screen'>
          <Editor/>
        </div>
      </div>
    </div>
  )
}

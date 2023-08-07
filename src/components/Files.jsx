import React from 'react'
import { BsSearch } from "react-icons/bs";
import { FaTrashCan } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { setOpen, setDelete, setCreate } from '../redux/features/User';


export default function Files() {
  const dispatch = useDispatch();

  return (
    <div className='mx-4 pb-3 h-fit bg-slate-700 my-2 md:my-0 md:h-[88vh] rounded-xl flex flex-col'>
      <div className='hover:border-2 hover:border-[#4da9ffc5] border-2 border-transparent h-12 px-4 my-4 mx-4 flex-row flex items-center bg-[#15202b63] rounded-2xl'>
        <BsSearch color='white' />
        <input placeholder='Search' className='bg-transparent text-white outline-none h-[45px] w-full pl-4' />
      </div>
      <div className='overflow-y-scroll no-scrollbar' >
        {
          [0, 1, 2, 3, 4, 5, 6, 7, 8].map((e) => {
            return <div key={e} className=' flex-col flex border-2 border-transparent items-start my-2 mx-4 p-4 hover:border-2 hover:border-[#c4dbf1c5] cursor-pointer bg-[#15202be1] rounded-2xl'>
              <div className='w-full flex-row flex items-center justify-between'><p className='text-white text-xl'>New Note</p><div onClick={() => {dispatch(setOpen(true)); dispatch(setDelete(true) )}} className='bg-slate-700 hover:border hover:border-slate-400 items-center flex justify-center h-7 w-7 rounded-full'>
                <FaTrashCan size={15} color='white' />
              </div>
              </div>
              <p className='text-gray-300'>12:53 P.M</p>
              <p className='text-gray-500 my-1'>Rahul is very good and intelligent...</p>
            </div>
          })
        }

      </div>
    </div>
  )
}

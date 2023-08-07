import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { setOpen, setDelete, setCreate } from '../redux/features/User';


export default function Createpopup() {
  const dispatch = useDispatch();
  const { open, deleteNote, create } = useSelector((state) => state.UserAuth);

  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="absolute z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-[0.65] transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div style={{ alignItems: "center" }} className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-slate-500 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
               {
                deleteNote &&  <>
                <div className="bg-slate-500 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-200 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon className="h-6 w-6 text-red-800" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title as="h3" className="text-base leading-6 text-black font-semibold">
                      Delete "New Note"
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-950">
                        Are you sure you want to Delete your <pan className='font-semibold'>"New Note"</pan>? Your note will be permanently
                        removed. This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            
              <div className="bg-slate-500 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  onClick={() => {dispatch(setOpen(false));dispatch(setDelete(false))}}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full border-none outline-none justify-center rounded-md bg-slate-800 text-gray-200 px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-900 sm:mt-0 sm:w-auto"
                  onClick={() => {dispatch(setOpen(false));dispatch(setDelete(false))}}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
                </>
               }

                 {
                   create &&  <form className='flex flex-col justify-center mt-4'>

                   <div className='my-1 items-center py-1 w-full flex justify-center' >
                     <p className='text-[18px] mx-3 w-[23%] font-serif'>Select Folder:</p>
                     <select className='hover:bg-[#2c3f50e5] w-[60%] outline-none focus:outline-blue-500 outline-[2px] bg-[#22303c57] pl-5 h-12 border-none text-white rounded-3xl' name="cars" id="cars">
                       <option className='rounded-3xl' value="volvo">Volvo</option>
                       <option className='rounded-3xl' value="saab">Saab</option>
                       <option className='rounded-3xl' value="mercedes">Mercedes</option>
                       <option className='rounded-3xl' value="audi">Audi</option>
                     </select>
                     </div>
                     
                     <div className='my-1 items-center py-1 w-full flex justify-center'>
                     <p className='text-[18px] mx-3 w-[23%] font-serif'>Title:</p>
                       <input className='hover:bg-[#2c3f50b0] items-center w-[60%] outline-none focus:outline-blue-500 outline-[2px] bg-[#22303c57] pl-5 h-12 border-none text-white rounded-3xl' placeholder='Title' />
                     </div>
                     
                     <div className='my-1 items-center py-1 w-full flex justify-center'>
                     <p className='text-[18px] mx-3 w-[23%] font-serif'>Description:</p>
                       <input className='hover:bg-[#2c3f50b0] items-center w-[60%] outline-none focus:outline-blue-500 outline-[2px] bg-[#22303c57] pl-5 h-12 border-none text-white rounded-3xl' placeholder='Description' />
                     </div>
                    
                     
   
                     <div className='flex justify-end w-[90%] mx-auto my-4'>
                     <button
                       type="button"
                       className="inline-flex mx-4 w-full justify-center rounded-md bg-slate-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto"
                       onClick={() => {dispatch(setOpen(false));dispatch(setCreate(false))}}
                     >Cancel
                     </button>
                     <button
                       type="button"
                       className="inline-flex mx-4 w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:w-auto"
                       onClick={() => {dispatch(setOpen(false));dispatch(setCreate(false))}}
                     >Create
                     </button>
                     
                     </div>
                   </form>
                 }
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

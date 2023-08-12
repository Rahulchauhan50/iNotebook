import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { SetCreate, setNotexist } from '../redux/features/User'
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { useAddNoteMutation } from '../redux/services/UserData'

export default function Createpopup(){
  const dispatch = useDispatch()
  const { Create, Notexist } = useSelector((state) => state.UserAuth);
  const cancelButtonRef = useRef(null)
  const [addNote, { isLoading: addNoteLoading }] = useAddNoteMutation();
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  const handleAddNote = (e) => {
    e.preventDefault();
    console.log(descriptionRef)
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;

    addNote({ folderName: Create.name, title, description })
      .unwrap()
      .then((data) => {
        if (data?.success === true) {
          console.log("folder Delete successfully")
          dispatch(SetCreate({ open: false, name: null }))
        }
      })
      .catch((error) => {
        console.log("some error occured", error)
        if(error.data === "Note already exist"){
          dispatch(setNotexist(true))
        }
      });
  }

  return (
    <Transition.Root show={Create.open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => { dispatch(SetCreate({ open: false, name: null })) }}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-[0.5] transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-slate-300 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
               
                <div className="w-full h-full">
                  <form onSubmit={handleAddNote} className="bg-slate-300 shadow-md rounded px-8 pt-6 mb-4">
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" for="text">
                        Title
                      </label>
                      <input onInput={()=>{dispatch(setNotexist(false))}} required ref={titleRef} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Title" />
                      {Notexist && <p className="text-red-500 text-xs italic">Note Already exist , Title must be unique</p>}
                      
                    </div>
                    <div className="mb-6">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Description
                      </label>
                      <input required ref={descriptionRef} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Description" />
                    </div>
                    <div className="flex items-center justify-between">
                      <button type="submit" onClick={handleAddNote} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        {
                          addNoteLoading ? <svg className="animate-spin mx-auto w-[45px] -ml-1 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg> : "Create"
                        }
                      </button>
                      <button onClick={()=>{dispatch(SetCreate({ open: false, name: null }))}} className="inline-block align-baseline font-bold text-lg text-blue-500 hover:text-blue-800">
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}










import React,{useState} from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiSolidEdit } from "react-icons/bi";
import { FaTrashCan } from "react-icons/fa6";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { setOpen, setDelete, setCreate } from '../redux/features/User';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
export default function Dropdown({handleRenameFolder}) {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
      };
    
  return (
    <Menu as="div" className="relative ml-3">
    <Menu.Button>
     <BsThreeDotsVertical  onClick={toggleDropdown} className='mx-2 text-slate-400 hover:text-white' />
     </Menu.Button>
  
     <Transition
         as={Fragment}
         enter="transition ease-out duration-100"
         enterFrom="transform opacity-0 scale-95"
         enterTo="transform opacity-100 scale-100"
         leave="transition ease-in duration-75"
         leaveFrom="transform opacity-100 scale-100"
         leaveTo="transform opacity-0 scale-95"
       >
         <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-slate-600 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
           <Menu.Item>
             {({ active }) => (
               <a
                 onClick={handleRenameFolder}
                 className={classNames(active ? 'bg-gray-100' : '', 'flex flex-row px-4 py-2 text-sm hover:bg-slate-800 bg-slate-700 rounded-md mx-2 text-gray-200 my-1')}
               >
                <BiSolidEdit className='mr-2' size={20}/>
                 Remane folder
               </a>
             )}
           </Menu.Item>
           <Menu.Item>
             {({ active }) => (
               <a
                 href="#"
                 className={classNames(active ? 'bg-gray-100' : '', 'flex flex-row px-4 py-2 text-sm hover:bg-slate-800 bg-slate-700 rounded-md mx-2 text-gray-200 my-1')}
               >
                <FaTrashCan className='mr-2' size={17}/>
                 Delete Folder
               </a>
             )}
           </Menu.Item>
           <Menu.Item>
             {({ active }) => (
               <a
               onClick={() => {dispatch(setOpen(true));dispatch(setCreate(true))}}
                 className={classNames(active ? 'bg-gray-100' : '', 'flex flex-row px-4 py-2 text-sm hover:bg-slate-800 bg-slate-700 rounded-md mx-2 text-gray-200 my-1')}
               >
                <AiOutlinePlus className='mr-2' size={17} />
                 Add note
               </a>
             )}
           </Menu.Item>
         </Menu.Items>
       </Transition>
       </Menu>
  )
}


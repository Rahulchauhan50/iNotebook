import React,{ useRef, useState } from 'react'
import { BsFolder2, BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import Dropdown from './Dropdown';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setOpen, setDelete, setCreate } from '../redux/features/User';

export default function Folder() { 
    const dispatch = useDispatch();
    const divRef = useRef(null);
    const [contentEditable, setContentEditable] = useState(false);

    const handleRenameFolder = (id) => {
        if(document.getElementById(id)){
            console.log(document.getElementById(id))
            document.getElementById(id).contentEditable = true;
            const range = document.createRange();
            range.selectNodeContents(document.getElementById(id));
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

    const handleCreateFolder = () => {
        if (divRef.current) {
            setContentEditable(true);
            console.log(divRef.current)
            divRef.current.focus();
            // Create a range to select the text
            const range = document.createRange();
            range.selectNodeContents(divRef.current);
            
            // Remove any previous selections
            const selection = window.getSelection();
            selection.removeAllRanges();
            
            // Add the new range to the selection
            selection.addRange(range);
            divRef.current.click()
        }
      };

      const handleOnBlur = (id) => {
        document.getElementById(id).contentEditable = false;
      }
    
      const handleBlur = () => {
        console.log(divRef.current.innerText)
        setContentEditable(false);
    };
 
  return (
    <div>
        <div className='mx-4 pt-3  overflow-y-scroll overflow-x-clip no-scrollbar pb-3 h-fit flex flex-col bg-slate-700 my-2 md:my-0 md:h-[88vh] rounded-xl' >
            {
                [1].map((e)=>{
                   return <div key={e} className='cursor-pointer justify-between h-14 mx-2 flex-row flex items-center hover:bg-[#15202b79] hover:border-2 hover:border-[#c4dbf1c5]  bg-[#15202b] rounded-2xl my-1'>
                <div className='flex flex-row items-center h-14'>
                <BsFolder2 className='mx-3' size={35} color='#aaaa89' />
                <p onKeyDown={(event)=>{event.keyCode === 13 && handleOnBlur(`folder${e}`)}} id={`folder${e}`} onBlur={()=>{handleOnBlur(`folder${e}`)}} className='text-white outline-none h-14 w-[150px] py-[14px] items-center flex'>Folder name</p>
                </div>
                <Dropdown handleRenameFolder={()=>{handleRenameFolder(`folder${e}`)}}/>
            </div>
                })
            }

            <div onClick={handleCreateFolder} className='cursor-pointer h-14 mx-2 flex-row flex items-center hover:bg-[#15202b79] hover:border-2 hover:border-[#c4dbf1c5] bg-[#15202b] rounded-2xl my-1'>
                {contentEditable?
                    <BsFolder2 className='mx-3' size={35} color='#aaaa89' />:
                    <AiOutlinePlus className='mx-3' size={35} color='#aaaa89' />
                }
                <p onKeyDown={(event)=>{event.keyCode === 13 && handleBlur()}} contentEditable={contentEditable} ref={divRef} onBlur={handleBlur} className={`${contentEditable?"text-white":"text-gray-500"} outline-none h-14 w-[80%] py-[14px] items-center flex`}>
                    {contentEditable?"New Folder":"Create Folder"}
                </p>
            </div>
        </div>
    </div>
  )
}

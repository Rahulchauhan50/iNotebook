import React, { useEffect, useState } from 'react'
import { BsFolder2 } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import Dropdown from './Dropdown';
import { useSelector } from 'react-redux';
import { useGetDataQuery } from '../redux/services/UserData';
import { useAddFolderMutation, useRenameFolderMutation } from '../redux/services/UserData';
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom';


export default function Folder() {
    const { folder } = useParams();
    const { data, refetch } = useGetDataQuery();
    const [addFolder, { isLoading: addFolderLoading }] = useAddFolderMutation();
    const [renameFolder] = useRenameFolderMutation();
    const [update, setupdate] = useState(null)
    const { Msg } = useSelector((state) => state.UserAuth);


    const [contentEditable, setContentEditable] = useState(false);

    const handleFolder = (id) => {
        if(id === 'create'){
            setContentEditable(true)
        }
        
        if (document.getElementById(id)) {
            console.log(document.getElementById(id))
            document.getElementById(id).contentEditable = true;
            const range = document.createRange();
            range.selectNodeContents(document.getElementById(id));
            const selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }

    const handleBlur = (id) => {
        setContentEditable(false);
        document.getElementById(id).contentEditable = false;
        if(document.getElementById(id).innerText===""){
            setContentEditable(false);
            return;
        }
        if (id === 'create') {
            document.getElementById(id).contentEditable = false;
            addFolder({ folderName: document.getElementById(id).innerText })
                .unwrap()
                .then((data) => {
                    if (data?.success === true) {
                        console.log("folder added successfully")
                        setupdate(data.action)                    }
                })
                .catch((error) => {
                    console.log("some error occured",error)
                });
        } else {
            document.getElementById(id).contentEditable = false;
            renameFolder({ oldFolderName: folder, newFolderName: document.getElementById(id).innerText })
                .unwrap()
                .then((data) => {
                    if (data?.success === true) {
                        console.log("folder added successfully")
                        setupdate(data.action)
                    }
                })
                .catch((error) => {
                    console.log("some error occured",error)
                })

        }

    }
    useEffect(() => {
       refetch();
    }, [update,Msg.open,refetch])

    return (
        <div>
            <div className='mx-4 pt-3 overflow-y-scroll overflow-x-clip no-scrollbar pb-3 h-fit flex flex-col bg-slate-700 my-2 md:my-0 md:h-[88vh] rounded-xl' >
                {
                    data?.length > 0 && data[0].folders.map((element) => {
                        return <Link onClick={() => {localStorage.setItem("folder", element?.folderName) }} key={element?.folderName} to={`/${element?.folderName}`} >
                            <div className={`cursor-pointer justify-between h-14 mx-2 flex-row flex items-center ${folder?.replace(/-/g, " ") === element?.folderName ? "bg-[#15202b79] border-2 border-[#c4dbf1c5]" : ""} hover:bg-[#15202b79] hover:border-2 hover:border-[#c4dbf1c5]  bg-[#15202b] rounded-2xl my-1`}>
                                <div className='flex flex-row items-center h-14'>
                                    <BsFolder2 className='mx-3' size={35} color='#aaaa89' />
                                    <p onKeyDown={(event) => { event.keyCode === 13 && handleBlur(`folder${element?.folderName}`) }} id={`folder${element?.folderName}`} onBlur={() => { handleBlur(`folder${element?.folderName}`) }} className='text-white outline-none h-14 w-[150px] py-[14px] items-center flex'>{element?.folderName}</p>
                                </div>
                                <Dropdown folderName={element?.folderName} handleFolder={() => { handleFolder(`folder${element?.folderName}`) }} />
                            </div>
                        </Link>
                    })
                }

                <div onClick={() => { handleFolder(`create`) }} className='cursor-pointer h-14 mx-2 flex-row flex items-center hover:bg-[#15202b79] hover:border-2 hover:border-[#c4dbf1c5] bg-[#15202b] rounded-2xl my-1'>
                    {contentEditable && <BsFolder2 className='mx-3' size={35} color='#aaaa89' /> }
                    {(addFolderLoading && !contentEditable) && <svg class="animate-spin mx-[20px] w-[20px] text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    }
                    {(!contentEditable && !addFolderLoading ) && <AiOutlinePlus className='mx-3' size={35} color='#aaaa89' />}

                    <p id='create' onKeyDown={(event) => { event.keyCode === 13 && handleBlur(`create`) }} contentEditable={contentEditable} className={`${contentEditable ? "text-white" : "text-gray-500"} outline-none h-14 w-[80%] py-[14px] items-center flex`}>
                        {contentEditable ? "New Folder" : "Create Folder"}
                    </p>
                </div>
            </div>
        </div>
    )
}

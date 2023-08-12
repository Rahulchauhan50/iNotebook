import React, { useEffect, useState } from 'react'
import { BsSearch } from "react-icons/bs";
import { FaTrashCan } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { useNotesMutation, useSearchNotesMutation } from '../redux/services/UserData';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SetMsg } from '../redux/features/User'
import loading from '../assets/loading.gif'

export default function Files() {
  const dispatch = useDispatch();
  const { Create, Msg } = useSelector((state) => state.UserAuth);
  const [notes, setNotes] = useState([])
  const { folder, note } = useParams()
  const [fetchNotes, { isLoading }] = useNotesMutation();
  const [fetchSearchNotes, { isLoading:fetchSearchNotesLoading }] = useSearchNotesMutation();

  const handleFetchNotes = () => {
    const folderName = folder?.replace(/-/g," ")
    fetchNotes({folderName})
    .unwrap()
    .then((data) => {
      if (data?.success === true) {
        setNotes(data?.notes)
        console.log(data?.notes)
      }
    })
    .catch((error) => {
      console.error(error);
    });
  }

  const handleSearchNotes = (value) => {
    console.log(value)
    const folderName = folder?.replace(/-/g," ")
    fetchSearchNotes({folderName, titleSubstring:value})
    .unwrap()
    .then((data) => {
      if (data?.success === true) {
        console.log(data?.matchingNotes)
        setNotes(data?.matchingNotes)
      }
    })
    .catch((error) => {
      console.error(error);
      setNotes([])
    });
  }

  useEffect(()=>{
    handleFetchNotes()
    // eslint-disable-next-line
  },[folder,Create,Msg])
  const date =(timestamp)=>{
    const date = new Date(timestamp);
    const currentDate = new Date();
    const timeDifference = currentDate - date;
    if(Math.ceil(timeDifference/1000) < 60)  {
      return "just now"
    }
   
    let milliseconds = timeDifference;
    const millisecondsInSecond = 1000;
    const millisecondsInMinute = millisecondsInSecond * 60;
    const millisecondsInHour = millisecondsInMinute * 60;
    const millisecondsInDay = millisecondsInHour * 24;

    const days = Math.floor(milliseconds / millisecondsInDay);
    milliseconds %= millisecondsInDay;
    const hours = Math.floor(milliseconds / millisecondsInHour);
    milliseconds %= millisecondsInHour;
    const minutes = Math.floor(milliseconds / millisecondsInMinute);

    const formattedTime = [];
    if (days > 0) {
        formattedTime.push(`${days} day${days > 1 ? 's' : ''}`);
    }
    if (hours > 0) {
        formattedTime.push(`${hours} hour${hours > 1 ? 's' : ''}`);
    }
    if (minutes > 0) {
        formattedTime.push(`${minutes} minute${minutes > 1 ? 's ago' : ' ago'}`);
    }

    console.log(formattedTime)
    return formattedTime.join(', ')
   
  }

  return (
    <div className='mx-4 pb-3 h-fit bg-slate-700 my-2 md:my-0 md:h-[88vh] rounded-xl flex flex-col'>
      <div className='hover:border-2 hover:border-[#4da9ffc5] border-2 border-transparent h-12 px-4 my-4 mx-4 flex-row flex items-center bg-[#15202b63] rounded-2xl'>
        <BsSearch color='white' />
        <input onChange={(event)=>handleSearchNotes(event.target.value)} placeholder='Search' className='bg-transparent text-white outline-none h-[45px] w-full pl-4' />
      </div>
      <div className='overflow-y-scroll no-scrollbar' >
        {(fetchSearchNotesLoading || isLoading) && <div className='w-full justify-center flex h-80 items-center' ><img alt='loading' className='h-10 w-10' src={loading} /></div>}
        {
         (notes.length !== 0 && !(fetchSearchNotesLoading || isLoading)) && notes.map((e) => (
             <Link onClick={() => {localStorage.setItem("note", e?.title) }} key={e?.title} to={`/${localStorage.getItem('folder')}/${e?.title}`} >
            <div key={e} className={`flex-col flex border-2 items-start my-2 mx-4 p-4 ${note?.replace(/-/g," ")===e?.title?"border-[#c4dbf1c5]":"border-transparent"} hover:border-[#c4dbf1c5] cursor-pointer bg-[#15202be1] rounded-2xl`}>
              <div className='w-full flex-row flex items-center justify-between'><p className='text-white text-xl'>{e?.title}</p><div onClick={()=>{dispatch(SetMsg({open:true,name:e?.title,message:"Note"}))}} className='bg-slate-700 hover:border hover:border-slate-400 items-center flex justify-center h-7 w-7 rounded-full'>
                <FaTrashCan size={15} color='white' />
              </div>
              </div>
              <p className='text-gray-500 my-2'>{e?.description.slice(0,25)}...</p>
              <p className='text-gray-300 mt-2'>{date(e?.date)}</p>
            </div>
            </Link>)
          )}
          {(notes.length === 0 && !(fetchSearchNotesLoading || isLoading)) && <div className='text-slate-400 w-full my-10 flex justify-center'>No notes</div>}

      </div>
    </div>
  )
}

import React, { useEffect, useRef, useState } from 'react';
import { BsTypeUnderline, BsTypeBold, BsTypeItalic } from "react-icons/bs";
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useNotesMutation, useAddNoteContentMutation } from '../redux/services/UserData';
import notesvg from '../assets/Notesvg.svg'

const Editor = () => {
  const { Create, Msg } = useSelector((state) => state.UserAuth);

  const editorRef = useRef(null);
  const [isBold, setIsBold] = useState(false)
  const [isItalic, setIsItalic] = useState(false)
  const [isUnderline, setIsUnderline] = useState(false)
  const [isRed ,setIsRed] =useState(false)
  const [isgreen ,setIsGreen] =useState(false)
  const [isBlue ,setIsBlue] =useState(false)
  const { folder, note } = useParams();
  const [fetchNotes] = useNotesMutation();
  const [addNotesContent] = useAddNoteContentMutation();

  const handleFetchNotes = () => {

    const folderName = folder?.replace(/-/g," ")
    fetchNotes({folderName})
    .unwrap()
    .then((data) => {
      if (data?.success === true) {
        document.getElementById('editor').innerHTML= data?.notes.filter(element=>element.title===note)[0].content
      }
    })
    .catch((error) => {
      console(error);
    });
  }

  const handleSave = () => {
    if(document.getElementById('editor')){
        const value = document.getElementById('editor').innerHTML
        addNotesContent({ folderName:folder, title:note, content:value })
                .unwrap()
                .then((data) => {
                    if (data?.success === true) {
                        console.log("content added successfully")
                        // setupdate(data.action) 
                      }
                })
                .catch((error) => {
                    console.log("some error occured",error)
                });
    }
}

  const handleFormat = (command, value = null) => {
    if(command==='bold'){
        document.execCommand('bold');
        setIsBold(!isBold);
        return;
    }
    else if(command==='italic'){
        document.execCommand('italic');
        setIsItalic(!isItalic);
        return;
    }
    else if(command==='underline'){
        document.execCommand('underline');
        setIsUnderline(!isUnderline);
        return;
    }
    else if(command==="foreColor"){
        if(value==='red' && !isRed){
            document.execCommand(command, false, value);
            setIsRed(true)
            return
        }
        else if(value==='green' && !isgreen){
            document.execCommand(command, false, value);
            setIsGreen(true)
            return
        }
        else if(value==='blue' && !isBlue){
            document.execCommand(command, false, value);
            setIsBlue(true)
            return
        }
        document.execCommand('foreColor', false, 'black');
        setIsRed(false)
        setIsGreen(false)
        setIsBlue(false)

    }
  };
  useEffect(()=>{
    handleFetchNotes()
    // eslint-disable-next-line
  },[note,Create, Msg])

  return (
    <div>
      <div className="flex space-x-4 mb-4">

    <div className='flex w-full flex-col md:flex-row items-center justify-between'>
        <div className='mx-4 my-4 md:my-0'>
            <button className='md:mx-2 mx-[15px]' onClick={() => handleFormat('foreColor', "red")}>
                <div style={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3), 0 4px 30px rgba(0, 0, 0, 0.3)", borderRadius: "30px"}} className='hover:bg-red-500 border-slate-100 border p-2 rounded-2xl hover:border-2 bg-red-600 h-8 w-8'></div>
            </button>
            <button className='md:mx-2 mx-[15px]' onClick={() => handleFormat('foreColor', "blue")}>
                <div style={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3), 0 4px 30px rgba(0, 0, 0, 0.3)", borderRadius: "30px"}} className='hover:bg-blue-500 border-slate-100 border p-2 rounded-2xl hover:border-2 bg-blue-600 h-8 w-8'></div>
            </button>
            <button className='md:mx-2 mx-[15px]' onClick={() => handleFormat('foreColor', "green")}>
                <div style={{ boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3), 0 4px 30px rgba(0, 0, 0, 0.3)", borderRadius: "30px"}} className='hover:bg-green-500 border-slate-100 border p-2 rounded-2xl hover:border-2 bg-green-600 h-8 w-8'></div>
            </button>

        </div>
        
        <div className='mx-4 mb-4 md:mb-0'>
            <button className='mx-2' onClick={() => handleFormat('bold')}>
                <div className={`p-2 border-slate-500 hover:border-2 hover:border-[#c4dbf1c5] hover:bg-[#15202b8f] border-2 rounded-xl ${isBold?"bg-slate-400":"bg-slate-900"} bg-[#15202b59]`}>
                <BsTypeBold color={`${isBold?"":"rgb(148 163 184 / var(--tw-bg-opacity))"}`} size={20}/>
                </div>
            </button>
            <button className='mx-2' onClick={() => handleFormat('italic')}>
            <div className={`p-2 border-slate-500 hover:border-2 hover:border-[#c4dbf1c5] hover:bg-[#15202b8f] border-2 rounded-xl ${isItalic?"bg-slate-400":"bg-slate-900"} bg-[#15202b59]`}>
                <BsTypeItalic color={`${isItalic?"":"rgb(148 163 184 / var(--tw-bg-opacity))"}`} size={20}/>
            </div>
            </button>
            <button className='mx-2' onClick={() => handleFormat('underline')}>
            <div className={`p-2 border-slate-500 hover:border-2 hover:border-[#c4dbf1c5] hover:bg-[#15202b8f] border-2 rounded-xl ${isUnderline?"bg-slate-400":"bg-slate-900"} bg-[#15202b59]`}>
                <BsTypeUnderline color={`${isUnderline?"":"rgb(148 163 184 / var(--tw-bg-opacity))"}`} size={20}/>
            </div>
            </button>
        </div>
        <button onClick={handleSave} className='mb-2 md:mb-0 hover:border-2 hover:border-[#c4dbf1c5] hover:bg-[#15202b8f] mx-6 bg-slate-900 border border-slate-500 text-white h-10 md:w-20 w-40 rounded-xl'>Save</button>
    </div>

      </div>
     { note? <div className="border h-[78vh] mx-2 bg-slate-300 text-lg rounded-xl mb-20 md:mb-0 md:mr-4">
       <div className='w-full'>
        <div style={{height: "60px",borderRadius: "12px 12px 0px 0px"}} className='items-center w-full flex flex-row justify-between bg-slate-600 rounded-3xl m-0'>
                <p className='items-center h-full flex mx-4 text-2xl font-semibold text-slate-200'>Tittle: {note}</p>

        </div>
        <div
          onKeyUp={handleSave}
            id='editor'
            ref={editorRef}
            contentEditable
            className="border-none p-6 mx-0 text-lg outline-none h-[200px]"
        >
        </div>
       </div>
      </div>:<div className='flex h-[78vh] justify-center items-center'><img alt='' className='h-full w-full' src={notesvg} /></div>

     }
    </div>
  );
};

export default Editor;

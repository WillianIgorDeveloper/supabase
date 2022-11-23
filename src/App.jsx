import { PaperPlane } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

export const App = () => {

   const [coments, setComents] = useState([])

   const getDatabase = async function  () {
      const { data, error } = await supabase
      .from('coments')
      .select('*')
      setComents(data)
   }

   const scroll = () => {
      window.scrollTo(0, 100);
   }

   useEffect(()=>{
      window.scrollTo(0, document.body.scrollHeight);
      getDatabase()
   },[])

   const handleNewComent = async (event) => {
      event.preventDefault();

      if (event.target.coment.value != "") {
         await supabase.from('coments')
         .insert([
            { content: event.target.coment.value },
         ])
   
         event.target.coment.value = ""
         
         getDatabase()
         
         window.scrollTo(0, document.body.scrollHeight);
      }
   }

   return (
      <div className='flex flex-col pb-14'>
         <div className='p-6 flex flex-col gap-7'>
            {
               coments.map(element => {
                  return (
                     <p className='p-3 bg-nord-frost-1 rounded-lg text-nord-polarNight-1 font-medium' key={element.id}>{element.content}</p>
                  )
               })
            }
         </div>

         <form onSubmit={handleNewComent} method='POST' className='bg-nord-frost-2 p-2 flex fixed bottom-0 left-0 w-full'>
            <label htmlFor="coment" className='hidden'>Deixe o seu comentário!</label>
            <input type="text" name="coment" id="coment" className='flex-1 bg-nord-snowStorm-1 rounded text-nord-polarNight-1 px-4 focus:outline-none text-lg' />
            <button type='submit' className='p-2 text-2xl animate-bounce'><PaperPlane /></button>
         </form>
      </div>
   )
}
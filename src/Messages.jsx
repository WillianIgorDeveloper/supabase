import { PaperPlane } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'

export const Messages = ({ session }) => {


   const [username, setUsername] = useState(null)
   const [website, setWebsite] = useState(null)
   const [avatar_url, setAvatarUrl] = useState(null)
 
   const getProfile = async () => {

      const { user } = session
      
      const { data, error, status } = await supabase
      .from('profiles')
      .select(`username, website, avatar_url`)
      .eq('id', user.id)
      .single()
   }



   const [comentarys, setComentarys] = useState([])

   const getDatabase = async function  () {
      const { data, error } = await supabase
      .from('coments')
      .select('*')

      setComentarys(data)

      setTimeout(() => {
         window.scrollTo(0, (document.body.scrollHeight + 1000));
      }, 100)
   }

   const handleNewComent = async (event) => {
      event.preventDefault();

      if (event.target.coment.value != "") {
         await supabase.from('coments')
         .insert([
            { content: event.target.coment.value, user_id: session.user.id, user_email: session.user.email },
         ])
   
         event.target.coment.value = ""
         
         getDatabase()
      }
   }

   useEffect(()=>{
      getDatabase()
      getProfile()
      supabase.channel('coments')
      .on(
         'postgres_changes', 
         { event: 'INSERT', schema: 'public', table: 'coments' },
         (payload) => {
            getDatabase()
         }
      )
      .subscribe()
   },[])
   
   return(
      <div className='flex flex-col pb-14'>
         <div className='p-6 flex flex-col gap-7'>
            {
               comentarys.map(element => {
                  return (
                     <div key={element.id}>
                        <p>{element.user_email}</p> 
                        <p className='p-3 bg-nord-frost-1 rounded-lg text-nord-polarNight-1 font-medium' >{element.content}</p>
                     </div>
                  )
               })
            }
         </div>

         <form onSubmit={handleNewComent} method='POST' className='bg-nord-frost-2 p-2 flex fixed bottom-0 left-0 w-full'>
            <label htmlFor="coment" className='hidden'>Deixe o seu comentário!</label>
            <textarea name="coment" id="coment" rows="1" cols="1" resi className='resize-none flex-1 bg-nord-snowStorm-1 rounded text-nord-polarNight-1 py-2 px-4 focus:outline-none text-lg' />
            <button type='submit' className='p-2 text-2xl animate-bounce'><PaperPlane /></button>
         </form>
      </div>
   )
}
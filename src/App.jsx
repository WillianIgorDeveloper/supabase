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

   useEffect(()=>{
      getDatabase()
   },[])

   const handleNewComent = async (event) => {
      event.preventDefault();

      await supabase.from('coments')
      .insert([
         { content: event.target.coment.value },
      ])

      getDatabase()
   }

   return (
      <>
         <h1>Wellcome!</h1>
         <form onSubmit={handleNewComent}>
            <label htmlFor="coment">Deixe o seu comentário!</label>
            <input type="text" name="coment" id="coment" />
            <button type='submit'>Enviar comentário</button>
         </form>

         <div>
            <h2>Comentários:</h2>
            {
               coments.map(element => {
                  return (
                     <p key={element.id}>{element.content}</p>
                  )
               })
            }
         </div>
      </>
   )
}
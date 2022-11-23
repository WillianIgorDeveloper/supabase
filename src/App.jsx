import { createClient } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

export const App = () => {

   const supabaseUrl = "https://gyzcxhkyewpynpskfzxu.supabase.co"
   const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd5emN4aGt5ZXdweW5wc2tmenh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjkyMTE5MjUsImV4cCI6MTk4NDc4NzkyNX0.T1sXBjjprKuHYNjyUdzoA45SU7g2juPCVewGSEBoiUw"
   const supabase = createClient(supabaseUrl, supabaseKey)

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
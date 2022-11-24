import { useEffect, useState } from 'react'
import { Login } from './Login'
import { Messages } from './Messages'
import { supabase } from './supabaseClient'

export const App = () => {

   const [session, setSession] = useState(null)

   useEffect(() => {
     supabase.auth.getSession().then(({ data: { session } }) => {
       setSession(session)
     })
 
     supabase.auth.onAuthStateChange((_event, session) => {
       setSession(session)
      })

   }, [])


   return (
      <>
         { 
            !session
            ? <Login />
            : <Messages session={session} />
         }
      </>
   )
}
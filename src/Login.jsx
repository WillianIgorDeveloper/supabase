import { useState } from "react"
import { supabase } from "./supabaseClient"

export const Login = () => {

   const [sended, setSended] = useState(false)

   const handleEmail = async (event) => {

      event.preventDefault()

      const email = event.target.email.value

      setSended(true)

      await supabase.auth.signInWithOtp({ email })

   }

   return (
      <div className="h-screen flex justify-center items-center flex-col gap-5">
         {
            sended 
            ? <h1>Verifique sua caixa de e-mail para liberar o acesso!</h1>
            : (
               <>
                  <h1>Cadastre o seu E-mail</h1>
                  <form onSubmit={handleEmail} className="flex flex-col gap-2">
                     <label htmlFor="email">Email</label>
                     <input type="email" name="email" id="email" />
                     <button type="submit" className="p-2 bg-nord-snowStorm-2 text-nord-polarNight-1 rounded">Cadastrar</button>
                  </form>
               </>
            )
         }
      </div>
   )
}
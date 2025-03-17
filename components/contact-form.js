'use client'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import {yupResolver} from "@hookform/resolvers/yup"
import * as Yup from "yup"
import {Toast, Toaster, toast} from "react-hot-toast"
import { addContact } from '@/lib/add-contact'
import { updateContact } from '@/lib/update-contact'

const schema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  email: Yup.string().email("Email informado é inválido").required("Nome é obrigatório")
})

const ContactForm = ({contact}) => {
  const {handleSubmit, control, reset, formState} = useForm({
    resolver: yupResolver(schema),
    defaultValues: contact ? {name: contact.name, email: contact.email} : {}
  })

  const {errors, isSubmitting} = formState
  const onSubmit = async (data) => {
    try {
      if(contact){
        await updateContact({id: contact.id, ...data});
        toast.success("Informações do contato atualizadas")
        window.location.reload()
      } else{
        await addContact(data);
        toast.success("Novo contato adicionado com sucessso")
        window.location.reload()
      }
      reset()
    } catch (error) {
        toast.error("Error submitting form" + error)
        console.log("Error " + error)
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}> 
        <div>
          <span>Name</span>
          <Controller
            name='name'
            control={control}
            render={({field}) => (
              <input
                {...field}
                className='w-full border rounded-md py-2 px-3 text-gray-800 leading-tight focus:outline-none shadow-outline'
              />
            )}
          />
          {errors.name && <span className='text-red-600'>{errors.name.message}</span>}
          <span>Email</span>
          <Controller
            name='email'
            control={control}
            render={({field}) => (
              <input
                {...field} 
                className='w-full border rounded-md py-2 px-3 text-gray-800 leading-tight focus:outline-none shadow-outline'
              />
            )}
          />
          {errors.email && <span className='text-red-600'>{errors.email.message}</span>}
        </div>
            <button
            className={`mt-2 w-full bg-primary rounded-md py-2 px-3 text-white ${isSubmitting ? 'opacity-50 cursor-not-allowed': ""}`}
            disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : "Submit"}
            </button>
      </form>
      <Toaster position='top-center'/>
    </div>
  )
}

export default ContactForm
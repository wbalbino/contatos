'use server'

import prisma from "./prisma"

export async function addContact(eventData){
    try {
        const {name, email} = eventData
        const newContact = await prisma.contact.create({
            data: {
                name, email
            }
        })
        return newContact
    } catch (error) {
        console.log("Erro para  criar novo contato " + error)
        
    }
}
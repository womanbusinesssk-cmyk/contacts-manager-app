 import { createContext } from 'react';
 
 export const contactcoutext = createContext({


    loading : false , 
    Setloading: () => {},
    Contact : [],
    setContact: () => {},
    Groups : [] , 
    query : [] , 
    error_vali:[],
    Contacts : [] , 
    filteredcontacts  : [] , 
    handleSubmit :()=> {}, 
    onContactChange :() => {}, 
    handelFormCancel :() => {}, 
    confirmDelete :() => {}, 
    removeContact :() => {}, 
    contactSearch :() => {}, 
    createContactForm :() => {},
 })

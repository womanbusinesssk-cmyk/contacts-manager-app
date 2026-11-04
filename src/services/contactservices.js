import axios from "axios";

// local 
// const Server_Url = "http://localhost:9000" 

// online 
// const Server_Url = "https://contacts-api.enzonic.dev";
const Server_Url = "http://51.75.118.170:20158";

// get  all contact 
// route get http:localhost:9000/countacts
export const getAllcountacts = () => {
const url = `${Server_Url}/countacts`


return axios.get(url)
}
// get contact with contact id 
// route get http:localhost:9000/countacts/:contactid
export const getContact= (contactid) => {
const url = `${Server_Url}/countacts/${contactid}`
return axios.get(url)
}






// crate new contact
// route post http:localhost:9000/countacts/:contactid
export const crateContact =(contact) =>{
    const url = `${Server_Url}/countacts/`
    return axios.post(url , contact)
}

// update contact
// route get http:localhost:9000/countacts/:contactid
export const updateContact = (contact , contactid) =>{

    const url = `${Server_Url}/countacts/${contactid}`
    return axios.put(url , contact)
}


// delete contact
// route get http:localhost:9000/countacts/:contactid
export const deletecontact = ( contactid) =>{
     const url = `${Server_Url}/countacts/${contactid}`
     return axios.delete(url)
}

// get  all contact 
// route get http:localhost:9000/groups
export const getAllGroups =() =>{
    const url = `${Server_Url}/groups`
    return axios.get(url)
}

// get  group contact 
// route get http:localhost:9000/groups/groupid
export const getGroups =(groupid) =>{
    const url = `${Server_Url}/groups/${groupid}`
    return axios.get(url)
}

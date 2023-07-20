import axios from 'axios'
const Demande_BASE_REST_API_URL = 'http://localhost:8091/api/Demande';

class DemandeService{

    getAllDemande = async () =>{
        return await  axios.get(Demande_BASE_REST_API_URL+"/getall")
    }

    // getAllDemandeByUsername(username){
    //     return axios.get(Demande_BASE_REST_API_URL+"/username/"+username)
    // }

    createDemande(username,demande){
        return axios.post(Demande_BASE_REST_API_URL+"/add/"+username, demande)
    }

    // getDemandeById(id_R){
    //     return axios.get(Demande_BASE_REST_API_URL + "/" +id_R);
    // }

    updateDemande(demandeId,demande){
        return axios.put(Demande_BASE_REST_API_URL + "/" +demandeId,demande);
    }
    updateDemandeStatus(demandeId,demande){
        return axios.put(Demande_BASE_REST_API_URL + "/approve/" +demandeId,demande);
    }

    delete(idDemande){
        return axios.delete(Demande_BASE_REST_API_URL + "/deletedemande/" + idDemande);
    }

}

export default new DemandeService();
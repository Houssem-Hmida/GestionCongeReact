import axios from 'axios'

const RECLAMATION_BASE_REST_API_URL = 'http://localhost:8091/api/feedback';

class FeedbackService{

    getAllFeedback(){
        return axios.get(RECLAMATION_BASE_REST_API_URL+"/getall")
    }

    // getAllFeedbackByUsername(username){
    //     return axios.get(RECLAMATION_BASE_REST_API_URL+"/username/"+username)
    // }

    createFeedback(username,feedback){
        return axios.post(RECLAMATION_BASE_REST_API_URL+"/add/"+username, feedback)
    }

    getFeedbackById(id_R){
        return axios.get(RECLAMATION_BASE_REST_API_URL + "/findfeedback/" +id_R);
    }

    updateFeedback(feedbackId, feedback){
        return axios.put(RECLAMATION_BASE_REST_API_URL + "/" +feedbackId, feedback);
    }

    deleteFeedback(feedbackId){
        return axios.delete(RECLAMATION_BASE_REST_API_URL + "/deletefeedback/" + feedbackId);
    }
}

export default new FeedbackService();
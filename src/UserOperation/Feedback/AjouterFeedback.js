import React, { useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import ReclamationService from '../../services/AdminService/ReclamationService';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from '../../Components/PageAccueil/AppNavbar';
import './feedback.css'
import Sidebar from '../../Components/PageAdmin/sidebar/Sidebar';


<link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,600,700,800' rel='stylesheet' type='text/css'></link>
const AddSujet = () => {


    const [descriptionfeedback, setDescriptionfeedback] = useState('')
    const history = useHistory();
    const { id } = useParams();
    

    
    const saveOrUpdateReclamation = (e) => {
        e.preventDefault();
       
        const reclamation = { descriptionfeedback }
        const username=sessionStorage.getItem("UserName");
       
        if (id) {
            ReclamationService.updateRecmlamation(id, reclamation).then((response) => {
                console.log(response.data)
                history.push('/lesreclamations')
            }).catch(error => {
                console.log(error)
            })

        } else {
            ReclamationService.createReclamation(username,reclamation).then((response) => {
            
                console.log(response.data.type)
                console.log(response.data)

                history.push('/lesreclamations');

            }).catch(error => {
                console.log(error)
            })
        }

    }

    useEffect(() => {

        ReclamationService.getRecmlamationById(id).then((response) => {
            setDescriptionfeedback(response.data.descriptionReclamation)
         
          

        }).catch(error => {
            console.log(error)
        })
    }, [])
    
       
    const title = () => {

        if (id) {
            return <h1 className="text-center" color='red'>Update Votre Feedback</h1>
        } else {
            return <h1 className="text-center" color='red'>Déclarer Votre Feedback</h1>
        }
    }
    
    return (
        <div>
            <AppNavbar/>
            {/* <Sidebar/> */}
            <br /><br />
            
            <div className="container">
                <div className="row">
                    <div className="">
                        {
                            title()
                        }
                        <div className="card-body">
                            <form>
                            
                            <div className="form-group mb-2 style1">
                                        {/* <label className="form-label"> taper le nom de votre supérviseur   :</label>
                                        <input placeholder="Full Name" type="text" class="name" /> */}
                                        <label className="form-label"> Déclarer  :</label>
                                        <textarea
                                        placeholder="Enter your message"
                                            name="message"
                                           
                                            class="mainArea"
                                            value={descriptionfeedback}
                                            onChange={(e) => setDescriptionfeedback(e.target.value)}
                                        >
                                        </textarea>
                                        
                                    </div>
                                
                                
                               <center>
                                <button class="custom-btn btn-6" onClick={(e) => saveOrUpdateReclamation(e)} >Envoyer </button>
                                <Link to="/user" className="custom-btn btn-6" style = {{marginLeft:"10px"}}> Annuler </Link>
                                </center>
                            </form>

                        </div>
                    </div>
                </div>

            </div>
           
        </div>
    )
}

export default AddSujet;
import React, { useState, useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import ReclamationService from '../../services/AdminService/ReclamationService';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from '../../Components/PageAccueil/AppNavbar';
import './reclamation.css'
const AddSujet = () => {


    const [descriptionReclamation, setDescriptionReclamation] = useState('')
    const history = useHistory();
    const { id } = useParams();

    
    const saveOrUpdateReclamation = (e) => {
        e.preventDefault();
       
        const reclamation = { descriptionReclamation }
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
            setDescriptionReclamation(response.data.descriptionReclamation)
         
          

        }).catch(error => {
            console.log(error)
        })
    }, [])

    const title = () => {

        if (id) {
            return <h1 className="text-center" color='red'>Update Votre Réclamation</h1>
        } else {
            return <h1 className="text-center" color='red'>Déclarer Votre Réclamation</h1>
        }
    }

    return (
        <div>
            <AppNavbar/>
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
                                        <label className="form-label"> Ecrire un message :</label>
                                        <textarea
                                            name="message"
                                            className="form-control"
                                            value={descriptionReclamation}
                                            onChange={(e) => setDescriptionReclamation(e.target.value)}
                                        >
                                        </textarea>
                                    </div>
                                
                                
                              <center>
                                <button className="custom-btn btn-6" onClick={(e) => saveOrUpdateReclamation(e)} >Envoyer </button>
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
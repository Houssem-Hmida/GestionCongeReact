import React, {useState, useEffect} from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import ReclamationService from '../../services/AdminService/ReclamationService';
import AppNavbar from '../../Components/PageAccueil/AppNavbar';

const ShowReclamation = () => {

    const [reclamations, setReclamation] = useState([])
    const username=sessionStorage.getItem("UserName");
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
    useEffect(() => {
        fetch(`http://localhost:8091/Api/Reclamation?page=${pageNumber}&size=5`)
          .then((response) => response.json())
          .then(({ totalPages, reclamations }) => {
            setReclamation(reclamations);
            setNumberOfPages(totalPages+1);
          });
      }, [pageNumber]);

    
    const deleteReclamation = (reclamationId) =>{
        ReclamationService.deleteReclamation(reclamationId).then( res => {
            this.setState({reclamations: this.state.reclamations.filter(reclamation => reclamation.reclamationId!== reclamationId)});
        });
    }

    const gotoNext = () => {
        setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
      };

    
    const gotoPrevious = () => {
        setPageNumber(Math.max(0, pageNumber - 1));
      };


    return (
        <>
        <AppNavbar/>
        <div className='main__container'>
            <h2 className = "main__title"> Voici Votre Feedback </h2>
            
          
            {
                        reclamations.map(
                            reclamation=>
                            <section className="sujet">
                            <article>
                            <div key = {reclamation.id_R}> 
                            <p> La réclamation est criée  {reclamation.dateDeclaration} par <div className="btn btn-outline-primary">{reclamation.username}</div> </p><br></br>
                            <p> {reclamation.descriptionReclamation} </p> Avec le numéro de réclamation : {reclamation.id_R}

                            <p>             
                            <Link className="btn btn-info" to={`/edit-reclamation-user/${reclamation.idRec}`} >Update</Link>
                      <button className = "btn btn-danger" onClick = {() =>deleteReclamation(reclamation.idRec)}
                      style = {{marginLeft:"10px"}}> Delete</button>
 
                  </p>
                            </div>
                            </article></section>
                        )
                    }
    </div>
    <button onClick={gotoPrevious}>Previous</button>
              {pages.map((pageIndex) => (
             <button key={pageIndex} onClick={() => setPageNumber(pageIndex)}>
             {pageIndex + 1}
             </button>
                         ))}
            <button onClick={gotoNext}>Next</button>
    </>
    )
}

export default ShowReclamation;
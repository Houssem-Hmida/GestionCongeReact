import React, {useState, useEffect} from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import ReclamationService from '../../services/AdminService/ReclamationService';
import AppNavbar from '../../Components/PageAccueil/AppNavbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Autocomplete, Button, IconButton, TextField, Box, Typography, Modal } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
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
          window.location.reload()
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
            <h2 className = "main__title"> Vos réclamations </h2>
            <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center"> Requester</TableCell>
                <TableCell align="center">descriptionReclamation</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
            {reclamations.map((row) => {
  return row.username === username ? (
    <React.Fragment key={row.id_R}>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row" align="center">
          {row.username}
        </TableCell>
        <TableCell align="center">{row.descriptionReclamation}</TableCell>
        <TableCell align="center">

              <Link className="btn " to={`/edit-reclamation-user/${row.idRec}`} > <IconButton aria-label="edit" >  <EditIcon /> </IconButton> </Link>
               

              <IconButton
                aria-label="delete"
                onClick = {() =>deleteReclamation(row.idRec)}>
                <DeleteIcon />
              </IconButton>
           
        </TableCell>
      </TableRow>
    </React.Fragment>
  ) : null;
})}
            </TableBody>
          </Table>
        </TableContainer>
          

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
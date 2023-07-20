import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState,useEffect } from 'react';
import DemandeService from '../../services/AdminService/DemandeService';
import AppNavbar from '../../Components/PageAccueil/AppNavbar';
import { Button, ButtonGroup } from '@mui/material';



 

const ApproveDemande = () => {
    const [DemandeCongees, setDemandeCongee] = useState([])
    const [jesh, setJesh] = useState([]);


    useEffect(() => {
        async function consume(){
          const result = await DemandeService.getAllDemande() ; 
           setJesh(result.data);
        }
        consume();
      }, [DemandeService.getAllDemande]);



    
      const [values, setValues] = useState({
        reason: '',
        date_debut: '',
        date_fin: '',
        typeConge: '',
        satuts:''
      });

      const HandleApprove=(data,x)=>{

        const updatedStatus = x === 1 ? 'Approved' : 'Rejected';

        const updatedData = {
          ...data,
          satuts: updatedStatus, // Corrected typo 'satuts' to 'status'
        };
    
        console.log('values before', updatedData);
    
        DemandeService.updateDemandeStatus(data.idDemande, updatedData)
          .then((response) => {
            window.location.reload();
            console.log('Updated data:', updatedData);
          })
          .catch((error) => {
            console.log('Error updating data:', error);
          });  
        
        
        }
  return (
    <>


     <AppNavbar/>

     <h1>DemandeCongees</h1>
    <div className='main__container'>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Requester </TableCell>
          <TableCell align="center">Start Date</TableCell>
          <TableCell align="center">End Date</TableCell>
          <TableCell align="center">Title</TableCell>
          <TableCell align="center">Reason</TableCell>
          <TableCell align="center">Status</TableCell>
          <TableCell align="center">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {jesh.map((row) => (
          <TableRow
            key={row.idDemande}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">{row.username}</TableCell>
            <TableCell align="center">{row.date_debut}</TableCell>
            <TableCell align="center">{row.date_fin}</TableCell>
            <TableCell align="center">{row.typeConge}</TableCell>
            <TableCell align="center">{row.reason}</TableCell>
            <TableCell align="center">{row.satuts}</TableCell>
            <TableCell align="center">
              {row.satuts==="Applied"?(
                <>
                <Button variant="contained" onClick={()=>HandleApprove(row,1)} >Approve</Button>
                <Button variant="contained" onClick={()=>HandleApprove(row,0)}>Reject</Button>
                </>
        ):""}
            </TableCell>
            
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  </div>



  </>
  )
}

export default ApproveDemande

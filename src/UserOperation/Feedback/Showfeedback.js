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
import FeedbackService from '../../services/AdminService/FeedbackService';
const Showfeedback = () => {

    const [feedbacks, setFeedback] = useState([])
    const username=sessionStorage.getItem("UserName");

    useEffect(() => {
      async function consume() {
        const result = await FeedbackService.getAllFeedback();
        setFeedback(result.data);
      }
      consume();
    }, []);
  

    // useEffect(() => {
    //     fetch(`http://localhost:8091/api/feedback`)
    //       .then((response) => response.json())
    //       .then(({ feedbacks }) => {
    //         setFeedback(feedbacks);
    //        console.log("feed:",feedbacks)
    //       });
    //   },[]);

    



    const deleteFeedback = async (feedbackId) =>{
     
      await FeedbackService.deleteFeedback(feedbackId).then( res => {
        this.setState({
          feedbacks: this.state.feedbacks.filter(feedback => feedback.feedbackId !== feedbackId)
        }
        );
         
         
        }).then(window.location.reload())
        
  }

    



    return (
        <>
        <AppNavbar/>
        <div className='main__container'>
            <h2 className = "main__title"> Feedbacks  </h2>
            <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center"> Requester</TableCell>
                <TableCell align="center">descriptionFeedback</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
            {feedbacks.map((row) => {
             console.log(row)
  return row.username === username ? (
    <React.Fragment key={row.id}>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row" align="center">
          {row.username}
        </TableCell>
        <TableCell align="center">{row.description}</TableCell>
        <TableCell align="center">

              <Link className="btn " to={`/edit-feedback/${row.id}`} > <IconButton aria-label="edit" >  <EditIcon /> </IconButton> </Link>
               
              

              <IconButton
                aria-label="delete"
                onClick = {() =>deleteFeedback(row.id)}>
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

    </>
    )
}

export default Showfeedback;
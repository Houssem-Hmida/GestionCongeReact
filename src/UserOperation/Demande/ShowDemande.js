import React, { useState, useEffect } from 'react';
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
import AddIcon from '@mui/icons-material/Add';
import { useHistory, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import DemandeService from '../../services/AdminService/DemandeService';
import AppNavbar from '../../Components/PageAccueil/AppNavbar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import EditDemande from './Modals/EditDemande';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  gap:'4px',
  flexDirection:'column'
};

const type = ["Sickness", "Death", "LeaveBalanceAnnuelle", "AdministrativeLeave"];

const ShowDemande = () => {

  useEffect(()=>{
    if(!sessionStorage.getItem('UserName')){
      window.location.assign('/signin');
    }
  },[])

  const [DemandeCongees, setDemandeCongee] = useState([]);
  const [jesh, setJesh] = useState([]);
  const [endValue, setEndValue] = useState(null);
  const [startValue, setStartValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const history = useHistory();
  const { id } = useParams();
  const username=sessionStorage.getItem("UserName");
  useEffect(() => {
    async function consume() {
      const result = await DemandeService.getAllDemande();
      setJesh(result.data);
    }
    consume();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

const [updateData, setUpdateData] = useState([]) 

 const updateModal=(row)=>{
    setUpdateOpen(true)
    setUpdateData(row)
  }

  const deleteDemande = async (idDemande) =>{
    console.log(idDemande)
    await DemandeService.delete(idDemande).then( res => {
      this.setState({
        jesh: this.state.jesh.filter(demande => demande.idDemande !== idDemande)
      }
      );
       
       
      }).then(window.location.reload())
      
}


  const [values, setValues] = useState({
    reason: '',
    date_debut: '',
    date_fin: '',
    typeConge: '',
    satuts:'Applied'
  });

    const handleStartDateChange = (newStartValue) => {
      setStartValue(newStartValue);
      setValues({ ...values, date_debut: dayjs(newStartValue).format('YYYY-MM-DD') });
    };
    const handleEndDateChange = (newEndValue) => {
      setEndValue(newEndValue);
      setValues({ ...values, date_fin: dayjs(newEndValue).format('YYYY-MM-DD') });
    };
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

   const  handleSubmit = async (event) => {
    
    console.log("username",username)
    console.log("val",values)
    await DemandeService.createDemande(username,values).then((response) => {
      setOpen(false);

      window.location.assign('/lesdemandes');
  
    })
  };
 

 

  return (
    <>
    {updateOpen && <EditDemande setOpenModal={setUpdateOpen} updateData={updateData} />}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Demande Conge
          </Typography>

          <Autocomplete
            onChange={(event, value) => setValues({ ...values, typeConge: value })}
            disablePortal
            id="combo-box-demo"
            options={type}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Type" />}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date" onChange={handleStartDateChange}
              value={startValue}
             
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End Date" onChange={handleEndDateChange}
              value={endValue}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <TextField
            id="outlined-basic"
            multiline
            rows={4}
            label="Reason"
            name="reason"
            onChange={handleChange}
            variant="outlined"
          />

          <Button variant="contained" onClick={(event)=>handleSubmit(event)}>Add</Button>
        </Box>
      </Modal>
      

      <AppNavbar />

      <h1>DemandeCongees</h1>

      <div className="main__container">
        <Button
          style={{ width: 'max-content' }}
          onClick={handleOpen}
          variant="contained"
          endIcon={<AddIcon />}
        >
          Add Demande
        </Button>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center"> Requester</TableCell>
                <TableCell align="center">Start Date</TableCell>
                <TableCell align="center">End Date</TableCell>
                <TableCell align="center">Title</TableCell>
                <TableCell align="center">Reason</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {jesh.map((row) => {
  return row.username === username ? (
    <React.Fragment key={row.idDemande}>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row" align="center">
          {row.username}
        </TableCell>
        <TableCell align="center">{row.date_debut}</TableCell>
        <TableCell align="center">{row.date_fin}</TableCell>
        <TableCell align="center">{row.typeConge}</TableCell>
        <TableCell align="center">{row.reason}</TableCell>
        <TableCell align="center">{row.satuts}</TableCell>
        <TableCell align="center">
          {row.satuts === "Applied" ? (
            <React.Fragment>
              <IconButton aria-label="edit" onClick={() => updateModal(row)}>
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                onClick={() => deleteDemande(row.idDemande)}
              >
                <DeleteIcon />
              </IconButton>
            </React.Fragment>
          ) : null}
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
  );
};

export default ShowDemande;

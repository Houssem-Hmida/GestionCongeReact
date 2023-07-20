
import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import { Autocomplete, Button, IconButton, TextField, Box, Typography, Modal } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';
import dayjs from 'dayjs';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DemandeService from '../../../services/AdminService/DemandeService';


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

const EditDemande = ({ setOpenModal , updateData}) => {

    const [endValue, setEndValue] = useState(updateData.date_fin);
    const [startValue, setStartValue] = useState(updateData.date_debut);
    
    const [values, setValues] = useState({
        username:updateData.username,
        idDemande:updateData.idDemande,
        reason: updateData.reason,
        date_debut: updateData.date_debut,
        date_fin: updateData.date_fin,
        typeConge: updateData.typeConge,
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

    const handleClose = () => {
        setOpenModal(false);
      };


      const update=async(event)=>{
      await DemandeService.updateDemande(values.idDemande,values).then((response) => {
        setOpenModal(false);

        window.location.reload()
       
    }).catch(error => {
        console.log(error)
    })
      }
  return (
    <div>
        <Modal
        open={true}
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
            defaultValue={values.typeConge}
            options={type}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Type" />}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Start Date" onChange={handleStartDateChange}
              
              defaultValue={dayjs(values.date_debut)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="End Date" onChange={handleEndDateChange}
              
              defaultValue={dayjs(values.date_fin)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>

          <TextField
            id="outlined-basic"
            multiline
            rows={4}
            label="Reason"
            name="reason"
            defaultValue={values.reason}
            onChange={handleChange}
            variant="outlined"
          />

          <Button variant="contained" onClick={(event)=>update(event)}>update</Button>
        </Box>
      </Modal>
    </div>
  )
}

export default EditDemande

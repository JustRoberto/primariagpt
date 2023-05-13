import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Grid, Paper,Typography } from '@mui/material';

const UserDetails = ({ userDetails, onUpdateUserDetails }) => {
  const handleChange = (event) => {
    const { name, value } = event.target;
    onUpdateUserDetails({
      ...userDetails,
      [name]: value,
    });
  };

  return (

    <Paper style={{ padding: '1rem' }}>
          <Typography variant="h6">Informațiile tale</Typography>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <TextField
            name="name"
            label="Name"
            variant="outlined"
            fullWidth
            value={userDetails.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Domiciliu"
            name="address"
            value={userDetails.domiciliu}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="CNP"
            name="CNP"
            value={userDetails.CNP}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Statut"
            name="maritalStatus"
            value={userDetails.statut}
            onChange={handleChange}
            variant="outlined"
            fullWidth
          />
        </Grid>
        {/* Add more input fields for other user details */}
      </Grid>
    </Paper>
  );
};

UserDetails.propTypes = {
  userDetails: PropTypes.object.isRequired,
  onUpdateUserDetails: PropTypes.func.isRequired,
};

export default UserDetails;

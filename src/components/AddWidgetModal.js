import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const AddWidgetDialog = ({ open, onClose, newWidget, onChange, onAddWidget }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Widget</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Widget Name"
          fullWidth
          variant="outlined"
          value={newWidget.name}
          onChange={onChange}
        />
        <TextField
          margin="dense"
          name="text"
          label="Widget Text"
          fullWidth
          variant="outlined"
          value={newWidget.text}
          onChange={onChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onAddWidget}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddWidgetDialog;

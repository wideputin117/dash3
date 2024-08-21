import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { TextField } from '@mui/material';
import { Dialog } from '@mui/material';
import { DialogActions } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogTitle } from '@mui/material';
import { FormControl } from '@mui/material';
import { Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import { InputLabel } from '@mui/material';

function AddWidgetModal({ isOpen, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(''); 
  const categories = useSelector((state) => state.widgets.categories);

  const handleSave = () => {
    const newWidget = {
      id: `widget-${Date.now()}`, // Simple ID generation
      title: title,
      text: text
    };

    onSave(newWidget, selectedCategory); // Pass selected category ID
    setTitle('');
    setText('');
    setSelectedCategory('');
  };

  return (
    <Dialog open={isOpen} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Add New Widget</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Widget Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Widget Text"
          fullWidth
          multiline
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Category Selection Dropdown */}
        <FormControl fullWidth>
          <InputLabel id="category-select-label">Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Add Widget
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddWidgetModal;
import React, { useState } from 'react';
import { Button } from '@mui/material';
import initialJsonData from '../data';
import Category from './Category';
import AddWidgetDialog from './AddWidgetModal'
import CachedIcon from '@mui/icons-material/Cached';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WatchLaterIcon from '@mui/icons-material/WatchLater';

const Dashboard = () => {
  const [data, setData] = useState(initialJsonData);
  const [open, setOpen] = useState(false);
  const [newWidget, setNewWidget] = useState({ name: '', text: '' });
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleOpen = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewWidget({ name: '', text: '' });
  };

  const handleChange = (e) => {
    setNewWidget({ ...newWidget, [e.target.name]: e.target.value });
  };

  const handleAddWidget = () => {
    if (selectedCategoryId !== null) {
      const updatedCategories = data.categories.map((category) => {
        if (category.id === selectedCategoryId) {
          return {
            ...category,
            widgets: [
              ...category.widgets,
              { id: Date.now(), name: newWidget.name, text: newWidget.text }
            ]
          };
        }
        return category;
      });

      setData({ ...data, categories: updatedCategories });
      handleClose();
    }
  };

  const handleRemoveWidget = (categoryId, widgetId) => {
    const updatedCategories = data.categories.map((category) => {
      if (category.id === categoryId) {
        return {
          ...category,
          widgets: category.widgets.filter(widget => widget.id !== widgetId)
        };
      }
      return category;
    });

    setData({ ...data, categories: updatedCategories });
  };

  return (
    <div className='bg-slate-50'>
      <div className="text-3xl text-red-600 h-max bg-red-200 text-wrap">Dashboard</div>
      <div className="bg-slate-50 flex justify-between items-center px-8 py-4">
          <div>
            <h1 className="text-2xl text-black font-bold">CNAPP Dashboard</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outlined">Add Widget</Button>
            <Button variant="outlined" size="small"><CachedIcon /></Button>
            <Button variant="outlined" size="small"><MoreVertIcon /></Button>
            <Button variant="outlined"><WatchLaterIcon /> | Last 2 Days<ExpandMoreIcon /></Button>
          </div>
      </div>

      <div>
        {data.categories.map((category) => (
          <Category
            key={category.id}
            category={category}
            onAddWidget={handleOpen}
            onRemoveWidget={handleRemoveWidget}
          />
        ))}
      </div>

      <AddWidgetDialog
        open={open}
        onClose={handleClose}
        newWidget={newWidget}
        onChange={handleChange}
        onAddWidget={handleAddWidget}
      />
    </div>
  );
};

export default Dashboard;

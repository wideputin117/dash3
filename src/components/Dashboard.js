import React, { useState, useEffect } from 'react';
import { Button, Drawer, List, ListItem, ListItemText, Checkbox, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Import CloseIcon
import initialJsonData from '../data';
import Category from './Category';
import AddWidgetDialog from './AddWidgetModal';
import CachedIcon from '@mui/icons-material/Cached';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import AddIcon from '@mui/icons-material/Add';
import Navbar from './Searchbar';

const Dashboard = () => {
  const [data, setData] = useState(initialJsonData);
  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [newWidget, setNewWidget] = useState({ name: '', text: '' });
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [tempCheckedWidgets, setTempCheckedWidgets] = useState({});

  useEffect(() => {
    if (selectedCategoryId !== null) {
      const selectedCategory = data.categories.find(category => category.id === selectedCategoryId);
      if (selectedCategory) {
        const initialCheckedWidgets = selectedCategory.widgets.map(widget => widget.id);
        setTempCheckedWidgets({ [selectedCategoryId]: initialCheckedWidgets });
      }
    }
  }, [selectedCategoryId, data]);

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

  const handleRemoveWidget = () => {
    const updatedCategories = data.categories.map((category) => {
      if (tempCheckedWidgets[category.id]) {
        return {
          ...category,
          widgets: category.widgets.filter(widget => tempCheckedWidgets[category.id].includes(widget.id))
        };
      }
      return category;
    });

    setData({ ...data, categories: updatedCategories });
    setOpenDrawer(false);
  };

  const handleWidgetCheck = (categoryId, widgetId) => {
    setTempCheckedWidgets(prevState => {
      const currentChecked = prevState[categoryId] || [];
      const updatedChecked = currentChecked.includes(widgetId)
        ? currentChecked.filter(id => id !== widgetId)
        : [...currentChecked, widgetId];
      return { ...prevState, [categoryId]: updatedChecked };
    });
  };

  const handleDrawerOpen = () => {
    setSelectedCategoryId(data.categories[0].id);
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
    setTempCheckedWidgets({});
  };

  const handleConfirm = () => {
    handleRemoveWidget();
  };

  const filteredCategories = data.categories.map((category) => ({
    ...category,
    widgets: category.widgets.filter(widget =>
      widget.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }));

  return (
    <div className='bg-slate-200'>
      <Navbar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <div className="bg-slate-200 flex justify-between items-center px-1 pt-6">
        <div>
          <h1 className="text-2xl text-black font-bold">CNAPP Dashboard</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outlined" size='small' onClick={handleDrawerOpen}>Add Widget<AddIcon className='pl-2' /></Button>
          <Button variant="outlined" size="small"><CachedIcon /></Button>
          <Button variant="outlined" size="small"><MoreVertIcon /></Button>
          <Button variant="outlined"><WatchLaterIcon /> | Last 2 Days<ExpandMoreIcon /></Button>
        </div>
      </div>

      <div>
        {filteredCategories.map((category) => (
          <Category
            key={category.id}
            category={category}
            onAddWidget={handleOpen}
            onRemoveWidget={() => {}}
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

      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={handleDrawerClose}
        classes={{ paper: 'w-1/2 h-full' }}
      >
        <div className="relative">
          <h2 className="pl-4 h-8 pt-1 text-emerald-100 font-semibold w-full bg-blue-700 flex justify-between items-center">
            Add Widget
            <IconButton onClick={handleDrawerClose} color='warning' className="text-white">
              <CloseIcon />
            </IconButton>
          </h2>
          <p className='text-slate-700 pl-4 mt-4'>Personalize your dashboard by adding the following widgets</p>
          <div className="flex space-x-4 ml-3 mt-4">
            {data.categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategoryId === category.id ? "contained" : "outlined"}
                onClick={() => setSelectedCategoryId(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>
          <List className="mt-4">
            {selectedCategoryId &&
              data.categories.find(cat => cat.id === selectedCategoryId).widgets.map(widget => (
                <ListItem key={widget.id} dense button onClick={() => handleWidgetCheck(selectedCategoryId, widget.id)}>
                  <Checkbox
                    edge="start"
                    checked={tempCheckedWidgets[selectedCategoryId]?.includes(widget.id) || false}
                    tabIndex={-1}
                    disableRipple
                  />
                  <ListItemText primary={widget.name} />
                </ListItem>
              ))}
          </List>
          <div className="absolute bottom-4 right-4 flex gap-2">
            <Button variant="outlined" onClick={handleDrawerClose}>Cancel</Button>
            <Button variant="contained" onClick={handleConfirm}>Confirm</Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default Dashboard;

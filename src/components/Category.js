import React from 'react';
import AddIcon from '@mui/icons-material/Add';

import Widget from './Widget';
import { Button } from '@mui/material';

const Category = ({ category, onAddWidget, onRemoveWidget }) => {
  return (
    <div className="bg-slate-200 p-4">
      <div className="flex items-center">
        <h1 className="font-bold mr-auto">{category.name}</h1>
      </div>
      <div className="flex flex-nowrap gap-4 mt-2">
        {category.widgets.map((widget) => (
          <Widget
            key={widget.id}
            widget={widget}
            onRemove={(widgetId) => onRemoveWidget(category.id, widgetId)}
          />
        ))}
        <div
          className="p-4 bg-gray-200 border rounded-md shadow-md w-5/12 h-60 flex items-center justify-center text-gray-600 cursor-pointer"
          onClick={() => onAddWidget(category.id)}
        >
          <Button variant="outlined" size='small'><AddIcon className='pl-1 pr-1' fontSize='medium'/>Add Widget</Button>
        </div>
      </div>
    </div>
  );
};

export default Category;

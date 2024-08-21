import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { deleteWidget } from '../redux/slices/widgetsSlice'; 

function Widget({ widget, index }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteWidget(widget.id));
  };

  return (
    <Draggable draggableId={widget.id} index={index}>
      {(provided) => (
        <div 
          className="widget" 
          {...provided.draggableProps} 
          {...provided.dragHandleProps} 
          ref={provided.innerRef}
        >
          <h3>{widget.title}</h3> 
          <p>{widget.text}</p> {/* Display the widget text */}
          <button onClick={handleDelete}>x</button> 
        </div>
      )}
    </Draggable>
  );
}

export default Widget;
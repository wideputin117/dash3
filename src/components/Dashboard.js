import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Category from './Category';
import AddWidgetModal from './AddWidgetModal';
import { addWidget } from '../redux/slices/widgetsSlice'; // Import here 

function Dashboard() {
  const categories = useSelector((state) => state.widgets.categories);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddWidget = (newWidget, selectedCategory) => {
    dispatch(addWidget({ newWidget, categoryId: selectedCategory }));
    setIsModalOpen(false);
  };

  return (
    <div className="dashboard">
      <button onClick={() => setIsModalOpen(true)}>+ Add Widget</button>

      {/* No need for DragDropContext anymore */}
      <div className="categories-container"> 
        {categories.map((category) => (
          <Category key={category.id} category={category} />
        ))}
      </div>

      <AddWidgetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddWidget}
      />
    </div>
  );
}

export default Dashboard;
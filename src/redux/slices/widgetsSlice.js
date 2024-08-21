import { createSlice } from '@reduxjs/toolkit';
import initialDashboardData from '../../data'; // Or the correct path to data.js

const initialState = {
  categories: initialDashboardData.categories,
};

const widgetsSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    addWidget: (state, action) => {
      const { newWidget, categoryId } = action.payload;
      const categoryIndex = state.categories.findIndex((cat) => cat.id === categoryId);

      if (categoryIndex !== -1) {
        state.categories[categoryIndex].widgets.push(newWidget);
      }
    },
    deleteWidget: (state, action) => {
      const widgetId = action.payload;
      state.categories.forEach((category) => {
        const widgetIndex = category.widgets.findIndex((widget) => widget.id === widgetId);
        if (widgetIndex !== -1) {
          category.widgets.splice(widgetIndex, 1);
        }
      });
    },
    // Remove moveWidget as it's not needed
  },
});

export const { addWidget, deleteWidget } = widgetsSlice.actions;
export default widgetsSlice.reducer;
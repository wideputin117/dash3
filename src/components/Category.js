import React from 'react';
import Widget from './Widget';

function Category({ category }) {
  return (
    <div className="category">
      <h2>{category.title}</h2>
      <div className="widgets-container"> {/* Use a simple div */}
        {category.widgets.map((widget) => (
          <Widget key={widget.id} widget={widget} />
        ))}
      </div>
    </div>
  );
}

export default Category;
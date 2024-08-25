import React from 'react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';

const StyledText = styled('text')(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: 'middle',
  dominantBaseline: 'central',
  fontSize: 20,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

const Widget = ({ widget, onRemove }) => {
  const renderContent = () => {
    if (widget.data) {
      const total = widget.data.reduce((sum, item) => sum + item.value, 0);
      return (
        <div className="flex flex-col items-center justify-center w-full h-full p-4">
          <div className="w-full flex items-center justify-center mb-2">
          <PieChart
            series={[
              { 
                data: widget.data, 
                innerRadius: 80,
                label: {
                  position: 'outside',
                  align: 'center',
                  formatter: ({ label, value }) => `${label}: ${value}`,
                },
              }
            ]}
            width={400}
            height={190}
          >
            <PieCenterLabel>{total}</PieCenterLabel>
          </PieChart>
          </div>
          <div className="mt-2">
            <p className="text-center">{widget.name}</p>
          </div>
        </div>
      );
    } else if (widget.showPlaceholder) {
      return <p className="text-center">No graph data available</p>;
    } else {
      return <p>{widget.text}</p>;
    }
  };

  return (
    <div className="p-4 bg-gray-50 border rounded-md shadow-md w-5/12 h-60 relative overflow-hidden"> {/* Adjusted width and height */}
      <h3 className="text-lg font-medium absolute top-1 left-2">{widget.name}</h3>
      <IconButton
        className="absolute right-2 bottom-2 left-52"
        size="small"
        onClick={() => onRemove(widget.id)}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
      <div className="w-full h-full flex items-center justify-center">
        {renderContent()}
      </div>
    </div>
  );
};

export default Widget;

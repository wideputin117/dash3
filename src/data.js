// src/data.js
const initialDashboardData = {
    categories: [
      {
        id: 'cspm',
        title: 'CSPM Executive Dashboard',
        widgets: [
          { id: 'cspm-widget-1', title: 'Cloud Accounts', text: 'This widget displays information about cloud accounts.' },
        ],
      },
      {
        id: 'cwpp',
        title: 'CWPP Dashboard',
        widgets: [
          { id: 'cwpp-widget-1', title: 'Security Events', text: 'Latest security events from your environment...' }
        ],
      },
      // ... more categories
    ],
  };
  export default initialDashboardData;
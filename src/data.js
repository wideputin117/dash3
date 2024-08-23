const initialJsonData = {
  categories: [
    {
      id: 1,
      name: "CSPM Executive Dashboard",
      widgets: [
        {
          id: 1,
          name: "Cloud Accounts",
          data: [
            { value: 2, label: 'Connected' },
            { value: 2, label: 'Disconnected' }
          ]
        },
        {
          id: 2,
          name: "Cloud Account Risk Assessment",
          data: [
            { value: 1689, label: 'Failed' },
            { value: 681, label: 'Warning' },
            { value: 36, label: 'Not Available' },
            { value: 7253, label: 'Passed' }
          ]
        }
      ]
    },
    {
      id: 2,
      name: "CWPP Dashboard",
      widgets: [
        {
          id: 3,
          name: "Top 5 Specific Namespace Alerts",
          showPlaceholder: true
        },
        {
          id: 4,
          name: "Workload Alerts",
          showPlaceholder: true
        }
      ]
    },
    {
      id: 3,
      name: "Registry Scan",
      widgets: [
        { id: 5, name: "Image Risk Assessment", text: "Random text for Widget 5" },
        { id: 6, name: "Image Security Issues", text: "Random text for Widget 6" }
      ]
    }
  ]
};

export default initialJsonData;

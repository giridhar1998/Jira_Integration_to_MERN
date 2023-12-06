import React, { useState, useEffect } from 'react';

const JiraComponent = () => {
  const [jiraData, setJiraData] = useState(null);

  useEffect(() => {
    // Fetch Jira data when the component mounts
    fetchJiraData();
  }, []);

  const fetchJiraData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api');
      
      if (!response.ok) {
        throw new Error('Failed to fetch Jira data');
      }
      
      const data = await response.json();
      setJiraData(data);
    } catch (error) {
      console.error('Error fetching Jira data:', error);
    }
  };

  return (
    <div className="jira-dashboard">
      <h2>Jira Dashboard</h2>
      {jiraData ? (
        <div className="dashboard-content">
          <div className="issue-list">
            <h3>Recent Issues:</h3>
            <ul>
              {jiraData.issues.map(issue => (
                <li key={issue.id}>
                  <strong>{issue.key}:</strong> {issue.summary}
                </li>
              ))}
            </ul>
          </div>
          {/* Add more sections to display different Jira data */}
        </div>
      ) : (
        <p>Loading Jira data...</p>
      )}
    </div>
  );
};



export default JiraComponent;

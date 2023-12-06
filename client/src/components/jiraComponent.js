import React, { useState, useEffect } from 'react';
import axios from 'axios'
import '../index.css';

const JiraComponent = () => {
  const [jiraData, setJiraData] = useState(null);

  useEffect(() => {
    // Fetch Jira data when the component mounts
    fetchJiraData();
  }, []);

  const fetchJiraData = async () => {
    try {
      console.log('Before Axios request');
      // fetching jira data from backend
      const response = await axios.get('http://127.0.0.1:5000/api');
      console.log('After Axios request');
      
      if (response.status !== 200) {
        throw new Error('Failed to fetch Jira data');
      }
      
      const data = await response.data;
      console.log(data);
      setJiraData(data);
    } catch (error) {
      console.error('Error fetching Jira data:', error);
    }
  };

  const calculatePercentage = (value, total) => {
    return ((value / total) * 100).toFixed(2);
  };

  return (
    <div>
      <h1>Jira Dashboard</h1>
      {jiraData ? (
        <div>
          <p>Project Name: {jiraData.projectName}</p>
          <table className="styled-table">
            <thead>
              <tr>
                <th>Assignee</th>
                <th>Count</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {jiraData.users.map((user, index) => (
                <tr key={index}>
                  <td>{user.key}</td>
                  <td>{user.value}</td>
                  <td>
                    <div className="progress-bar-container">
                      <div
                        className="progress-bar"
                        style={{ width: `${calculatePercentage(user.value, jiraData.total)}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default JiraComponent;

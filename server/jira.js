import asyncHandler from 'express-async-handler';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const username = process.env.JIRA_USER_NAME_DEV
const password = process.env.JIRA_API_TOKEN_DEV
const domain = process.env.JIRA_LINK_DEV

const auth = {
    username: username,
    password: password
  };

const jiraData = asyncHandler( async (req, res) => {
    try{
        // geting data of issues from jira
        const baseUrl = 'https://' + domain + '.atlassian.net';
        const config = {
            method: 'get',
            url: baseUrl + '/rest/api/2/search',
            headers: { 'Content-Type': 'application/json' },
            auth: auth
          };
          const response = await axios.request(config);

          // converting response into json format
          const jsonFormat = response.data;

          // getting project name from response
          const project = jsonFormat.issues[0].fields.project.name;

          // main logic to get dashboard data
          let user = 0;
          let nonUser = 0;
          for (let i = 0; i < jsonFormat.issues.length; i++){
            if(jsonFormat.issues[i].fields.assignee == null){
                nonUser++;
            }
            else{
                user++;
            }
          }
          let total = user + nonUser;

          // initializing response data object
          const responseData = {
            projectName: project,
            total: total,
            users: [
                {key: 'Giridhar', value: user},
                {key: 'Unassigned', value: nonUser},
                {key: 'Total', value: total}
            ]
          };

          // Convert the updated JavaScript object to JSON format
          const jsonResponse = JSON.stringify(responseData);
        //   console.log(jsonResponse);

          // Set the appropriate headers and send the updated JSON response
          res.setHeader('Content-Type', 'application/json');
          res.send(jsonResponse);

    } catch(error) {
        console.error('Error fetching Jira data:', error);
        res.status(500).json({ error: 'Failed to fetch Jira data' });
    }
});

export {
    jiraData
}


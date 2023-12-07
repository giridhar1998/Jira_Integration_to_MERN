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

          // getting data from axios
          const jsonFormat = response.data;

          // getting project name from response
          const project = jsonFormat.issues[0].fields.project.name;

          const responseData = {
            projectName: project,
            total: total,
            users: []
          };

          const usersMap = new Map();

          // main logic to get dashboard data
          for (let i = 0; i < jsonFormat.issues.length; i++){
            if(jsonFormat.issues[i].fields.assignee == null){
                if(usersMap.has("Unassigned") === true){
                  let ans = usersMap.get("Unassigned");
                  usersMap.set("Unassigned", ans+1);
                }
                else{
                  usersMap.set("Unassigned", 1);
                }
            }
            else{
              const assignee = jsonFormat.issues[i].fields.assignee.displayname;
              if(usersMap.has(assignee) === true){
                let ans = usersMap.get("Unassigned");
                usersMap.set(assignee, ans+1);
              }
              else{
                usersMap.set(assignee, 1);
              }
            }
          }
          
          let total = 0;
          for (const [key, value] of usersMap.entries()) {
            total = total + '${value}';
            responseData.users.push({ key: '${key}', value: '${value}'});
          }

          responseData.users.push({ key: 'Total', value: total });

          // // initializing response data object
          // const responseData = {
          //   projectName: project,
          //   total: total,
          //   users: [
          //       {key: 'Giridhar', value: user},
          //       {key: 'Unassigned', value: nonUser},
          //       {key: 'Total', value: total}
          //   ]
          // };

          // Convert the updated JavaScript object to JSON format
          const jsonResponse = JSON.stringify(responseData);
          console.log(jsonResponse);

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


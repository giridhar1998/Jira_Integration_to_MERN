import asyncHandler from 'express-async-handler';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

if (process.env.NODE_ENV === 'development') {
    const username = process.env.JIRA_USER_NAME_DEV
    const password = process.env.JIRA_API_TOKEN_DEV
    const domain = process.env.JIRA_LINK_DEV
}
else{
    const username = process.env.JIRA_USER_NAME_PRD
    const password = process.env.JIRA_API_TOKEN_PRD
    const domain = process.env.JIRA_LINK_PRD    
}

const auth = {
    username: username,
    password: password
  };

const jiraData = asyncHandler( async (req, res) => {
    try{
        const baseUrl = 'https://' + domain + '.atlassian.net';
        const config = {
            method: 'get',
            url: baseUrl + '/rest/api/2/dashboard/10000',
            headers: { 'Content-Type': 'application/json' },
            auth: auth
          };
          const response = await axios.request(config);
          console.log(response.data)
        //   res.json(response.data);
    } catch(error) {
        console.error('Error fetching Jira data:', error);
        console.log(error.response.data.errors)
        // res.status(500).json({ error: 'Failed to fetch Jira data' });
    }
}
// const jiraData = asyncHandler( async (req, res) => {
//     try {
//         const jiraApiUrl = 'https://apintegration.atlassian.net/rest/api/2/dashboard/10000'; 

//         const config = {
//             headers: {
//                 'Authorization': 'Basic ' + Buffer.from('ram101singh@gmail.com:ATATT3xFfGF0ZWdupnsqjF3vhAdW0Kv8ODQy4yTtp2NqahOcvQIzro7erlt3m7LEPNYQzzJdL-iw_7ZQmwwoBLvto8i8mf7isT91QS7qEsIVLKRsoYmUHT8sqyYiTocw2jLlnKQE8zS0_2Ot1FwrUv85FoAtQ_5iVWTMG-7pB-lkBAnaPv5fRRU=F3914F70').toString('base64'),
//                 'Accept': 'application/json'
//             }
//         };
//         const response = await axios.get(jiraApiUrl, config);
//         res.json(response.data);
//     } catch(error) {
//         console.error('Error fetching Jira data:', error);
//         res.status(500).json({ error: 'Failed to fetch Jira data' });
//     }
// });

export {
    jiraData
}


import asyncHandler from 'express-async-handler'
import axios from 'axios'

const jiraData = asyncHandler( async (req, res) => {
    try {
        const jiraApiUrl = 'https://apintegration.atlassian.net/rest/api/2/dashboard/10000'; 

        const config = {
            headers: {
                'Authorization': 'Basic ' + Buffer.from('ram101singh@gmail.com:ATATT3xFfGF0ZWdupnsqjF3vhAdW0Kv8ODQy4yTtp2NqahOcvQIzro7erlt3m7LEPNYQzzJdL-iw_7ZQmwwoBLvto8i8mf7isT91QS7qEsIVLKRsoYmUHT8sqyYiTocw2jLlnKQE8zS0_2Ot1FwrUv85FoAtQ_5iVWTMG-7pB-lkBAnaPv5fRRU=F3914F70').toString('base64'),
                'Accept': 'application/json'
            }
        };
        const response = await axios.get(jiraApiUrl, config);
        res.json(response.data);
    } catch(error) {
        console.error('Error fetching Jira data:', error);
        res.status(500).json({ error: 'Failed to fetch Jira data' });
    }
});



export {
    jiraData
}


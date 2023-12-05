import express from 'express'
const router = express.Router()

import {
    jiraData
} from './jira.js'

router.route('/').get(jiraData) 

export default router
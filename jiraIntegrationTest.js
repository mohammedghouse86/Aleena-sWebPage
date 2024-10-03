import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const jiraUrl = process.env.JIRA_URL;
const authorization = process.env.JIRA_CRED;

const issueData = {
  fields: {
    project: {
      key: 'AT'
    },
    summary: 'Issue 1 created via Node.js',
    description: {
      type: 'doc',
      version: 1,
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'This is a test issue created via Node.js.'
            }
          ]
        }
      ]
    },
    issuetype: {
      id: '10000'
    },
    labels: [
      'This_is_my_seventh_test',
      'sent_on_thursday'
    ]
  }
};

fetch(jiraUrl, {
  method: 'POST',
  headers: {
    'Authorization': authorization,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(issueData)
})
.then(response => response.json())
.then(data => {
  if (data.errors) {
    console.error('Error:', data.errors);
  } else {
    console.log('Issue created successfully:', data);
  }
})
.catch(error => {
  console.error('Error creating issue:', error);
});

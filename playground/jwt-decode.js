const jwt = require('jsonwebtoken')
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJzdW1pIiwiaWF0IjoxNTUxNjcyMTY0fQ.qtQkO2TQsU3Yviynf5U5XorrHLdJllZwG1rLoH2HbbQ'
console.log(jwt.verify(token,'jwt@123'))

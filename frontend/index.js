const express = require('express')
const app = express();

const PORT = express.env.PORT || 3000
app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
app.get('hearth', (req, res) => res.json({ msg: "Healthy!"}))
const express = require('express');
const cors = require('cors');
const path = require('path');
const PORT = 8080;

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, './dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});
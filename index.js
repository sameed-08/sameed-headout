const express = require('express');
const dotenv = require('dotenv');
const dataRoutes = require('./Routes/routes.js');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Routes
app.use('/data', dataRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

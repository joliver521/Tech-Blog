const express = require('express');
const sequelize = require('sequelize');

const app = express.Router();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// turn on connection to the database and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});

import express from 'express'
const app = express();
app.use(express.static('images'));
app.listen(3000); 
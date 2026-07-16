import express from 'express';
import { state } from './state.js';
const app = express();
app.get('/api/persons', (req, res) => {
    res.json(state.persons);
});
const port = 3001;
app.listen(port, () => console.log(`app listening on port ${port}`));

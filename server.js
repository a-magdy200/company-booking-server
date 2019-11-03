import {
    get_inspection,
    get_list_type,
    post_inspection
} from "./handlers";

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 5000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


let accounts = [];
let inspections = [];
app.get('/inspections', (req, res) => {
    fs.writeFile('data/inspections_list.json', data, console.log);
});

app.get('/accounts', (req, res) => {
    res.send(accounts);
});
app.get('/inspection/:inspection_id', get_inspection);
app.post('/inspection', post_inspection);
app.get('/:role/:id/inspections-list/:list_type', get_list_type);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

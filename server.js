const {
    get_inspection,
    get_list_type,
    post_inspection,
    login,
    signup,
} = require("./handlers");

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 5000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

let accounts = [];
let inspections = [];
app.get('/inspections', (req, res) => {
    fs.writeFile('data/inspections_list.json', data, console.log);
});

app.get('/accounts', (req, res) => {
    res.send(accounts);
});
app.post('/login', login);
app.post('/signup', signup);
app.get('/inspection/:inspection_id', get_inspection);
app.post('/inspection', post_inspection);
app.get('/:role/:id/inspections-list/:list_type', get_list_type);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

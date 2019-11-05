const {
    get_inspection,
    get_client_list_type,
    get_inspector_list_type,
    post_inspection,
    login,
    signup,
    scheduleInspection,
    submitReport
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
app.get('/', (req, res) => {
    res.send('Working...');
});
app.get('/inspections', (req, res) => {
    const data = JSON.stringify(inspections, null, 2);
    fs.writeFile('data/inspections_list.json', data, console.log);
    res.send(inspections);
});

app.get('/accounts', (req, res) => {
    const data = JSON.stringify(accounts, null, 2);
    fs.writeFile('data/users.json', data, console.log);
    res.send(accounts);
});

app.post('/login', login);
app.post('/signup', signup);
app.get('/inspection/:inspection_id', get_inspection);
app.post('/inspection', post_inspection);
app.get('/client/:id/inspections-list/:list_type', get_client_list_type);
app.get('/inspector/:id/inspections-list/:list_type/:type', get_inspector_list_type);
app.post('/scheduleInspection', scheduleInspection);
app.post('/submitReport', submitReport);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

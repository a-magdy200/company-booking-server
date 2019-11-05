const fs = require('fs');
const faker = require('faker');

const signup = (req, res) => {
    fs.readFile('data/users.json', (err, data) => {
        const users = JSON.parse(data);
        const { first_name, last_name, email, password } = req.body;
        const user = {
            first_name, last_name, email, password,
            role: 'client',
            id: faker.random.number()
        };
        let exists = false;
        for (let i = 0; i < users.length; i++) {
            exists = users[i].email === email;
            if (exists) {
                res.send({error: 'Email Already Exists.'});
                break;
            }
        }
        if (!exists) {
            users.push(user);
            const writeData = JSON.stringify(users, null, 2);
            fs.writeFile('data/users.json', writeData, console.log);
            res.send({success: true, user});
        }
    });
};

const login = (req, res) => {
    const response = {};
    fs.readFile('data/users.json', (err, data) => {
        if (err) throw err;
        const users = JSON.parse(data);
        const { email, password } = req.body;
        users.map( user => {
           if ( email === user.email) {
               if (password === user.password) {
                   response.success = true;
                   response.user = user;
                   return null;
               } else {
                   response.error = 'Invalid Email/Password';
                   return null;
               }
           }
        });
        if (!response.user) {
            response.error = response.error || 'Email Not Found.';
        }
        res.send(response);
    });
};

const get_inspection = (req, res) => {
    fs.readFile('data/inspections_list.json', (err, data) => {
        if (err) throw err;
        const inspections = JSON.parse(data);
        let { inspection_id } = req.params;
        inspection_id = parseInt(inspection_id, 10);
        const response = {
            success: true,
            inspection: {}
        };
        inspections.map( ({ id }, index) => {
            if (id === inspection_id) {
                response.inspection = inspections[index];
                return null;
            }
        });
        res.send(response);
    });
};

const post_inspection = (req, res) => {
    fs.readFile('data/inspections_list.json', (err, data) => {
        if (err) throw err;
        const {
            type, location, date, dueDate,
            status, first_name, last_name, email,
            phone, client_id
        } = req.body;
        const inspection = {
            type, location, date, dueDate, status,
            client_id,
            id: faker.random.number(),
            contactDetails: {
                first_name, last_name, email, phone
            }
        };

        const inspections = JSON.parse(data);
        inspections.push(inspection);
        const writeData = JSON.stringify(inspections, null, 2);
        fs.writeFile('data/inspections_list.json', writeData, err => {
            if (err) throw err;
        });
        const response = {
            success: true
        };
        res.send(response);
    });
};

const get_client_list_type = (req, res) => {
    fs.readFile('data/inspections_list.json', (err, data) => {
        const { id, list_type } = req.params;
        const inspections = JSON.parse(data);
        const response = {
            success: true,
            inspections: []
        };
        const user_id = parseInt(id, 10);

        if (list_type === 'all') {
            response.inspections = inspections.filter( inspection => inspection.client_id === user_id );
        } else if (list_type === 'dashboard') {
            response.inspections = inspections.filter( inspection =>
                inspection.status !== 'completed' && inspection.client_id === user_id
            ).splice(0, 10);
        }
        res.send(response);
    });
};
const get_inspector_list_type = (req, res) => {
    fs.readFile('data/inspections_list.json', (err, data) => {
        const {type, id, list_type} = req.params;
        const inspector_id = parseInt(id, 10);
        const inspections = JSON.parse(data);
        const response = {
            success: true,
            inspections: []
        };

        if (list_type === 'all') {
            response.inspections = inspections.filter(
                inspection =>
                    inspection.inspector ?
                        inspection.inspector.id === inspector_id :
                        inspection.type === type
            );
        } else if (list_type === 'dashboard') {
            response.inspections = inspections.filter(
                inspection =>
                    inspection.inspector ?
                        inspection.status !== 'completed' && inspection.inspector.id === inspector_id :
                        false
            ).splice(0, 10);
        } else if (list_type === 'schedule') {
            response.inspections = inspections.filter (
                inspection =>
                    inspection.inspector ?
                        inspection.schedule && inspection.inspector.id === inspector_id :
                        false
            );
        }
        res.send(response);
    });
};
const scheduleInspection = (req, res) => {
    const { id, schedule, inspector } = req.body;
    fs.readFile('data/inspections_list.json', (err, data) => {
        if (err) throw err;
        const inspections = JSON.parse(data);
        const inspectionID = parseInt(id, 10);
        for (let i = 0; i < inspections.length; i++) {
            if (inspections[i].id === inspectionID) {
                inspections[i].schedule = schedule;
                inspections[i].inspection = inspector;
                break;
            }
        }
        const writeData = JSON.stringify(inspections, null, 2);
        fs.writeFile('data/inspections_list.json', writeData, err => {
            if (err) throw err;
            res.send({ success: true });
        });
    });
};
module.exports = {
    login,
    post_inspection,
    get_client_list_type,
    get_inspection,
    signup,
    get_inspector_list_type,
    scheduleInspection
};

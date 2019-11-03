const fs = require('fs');




export const get_inspection = (req, res) => {
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

export const post_inspection = (req, res) => {
    fs.readFile('data/inspections_list.json', (err, data) => {
        if (err) throw err;
        const { type, location, date, dueDate, status } = req.body;
        const inspection = {
            type, location, date, dueDate, status
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

export const get_list_type = (req, res) => {
    fs.readFile('data/inspections_list.json', (err, data) => {
        const { role, id, list_type } = req.params;
        const inspections = JSON.parse(data);
        const response = {
            success: true,
            inspections: []
        };
        const role_key = role + '_id';
        const user_id = parseInt(id, 10);

        if (list_type === 'all') {
            response.inspections = inspections.filter( inspection => inspection[role_key] === user_id );
        } else if (list_type === 'dashboard') {
            response.inspections = inspections.filter( inspection =>
                inspection.status !== 'completed' && inspection[role_key] === user_id
            ).splice(0, 10);
        } else if (list_type === 'schedule') {
            if (role !== 'client') {
                response.inspections = inspections.filter (
                    inspection => inspection.schedule && inspection[role_key] === user_id
                );
            }
        }

        res.send(response);
    });
};

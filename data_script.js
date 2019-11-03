const faker = require('faker');
const accounts = [];
for (let i = 0; i < 10; i++) {
    let account = {
        email: faker.internet.email(),
        password: faker.internet.password(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        id: i + 1,
        role: 'client'
    };
    accounts.push(account);
    account = {
        email: faker.internet.email(),
        password: faker.internet.password(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        id: i + 11,
        role: 'inspector'
    };
    accounts.push(account);
}
accounts.push({
    email: faker.internet.email(),
    password: faker.internet.password(),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    id: 21,
    role: 'admin'
});
const inspections = [];
const status_array = ['normal', 'important', 'urgent', 'completed'];
const client_ids = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const inspector_ids = [11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
for ( let i = 0; i < 100; i++ ) {
    let status = status_array[Math.floor(Math.random() * status_array.length)];
    let client_id = client_ids[Math.floor(Math.random() * client_ids.length)];
    let inspector_id = inspector_ids[Math.floor(Math.random() * inspector_ids.length)];
    let schedule = Math.random();
    let inspection = {
        type: faker.lorem.word(),
        location: faker.address.streetAddress(true) + ", " + faker.address.city(),
        date: faker.date.future(),
        dueDate: faker.date.future(),
        id: faker.random.number(),
        status,
        client_id,
        inspector_id,
    };
    if (status === 'completed') {
        inspection.report = {
            comment: faker.lorem.sentence()
        };
    }
    if (schedule > 0.5) {
        inspection.schedule = faker.date.future();
    }
    inspections.push(inspection);
}

const express = require('express');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

let data = [
    { id: 1, EmployeeName: "Iswa Marva", EmployeeDesignation: "Manager", EmployeeLocation: "kozhikode", Salary: 40000 },
    { id: 2, EmployeeName: "Jeny Issec", EmployeeDesignation: "Team lead", EmployeeLocation: "kochi", Salary: 30000 },
    { id: 3, EmployeeName: "Aarav Yedu", EmployeeDesignation: "Staff", EmployeeLocation: "kannur", Salary: 25000 }
];

function employeeroutes(nav) {

    router.get('/', (req, res) => {
        res.render("home", { title: 'EJS', data, nav, pageName: "home" });
    });
    router.get('/form', (req, res) => {
        res.render("addEmployee", { title: 'Form', nav, pageName: "addEmployee" });
    });
    router.post('/add', (req, res) => {
        const newId = data.length ? data[data.length - 1].id + 1 : 1;
        data.push({ id: newId, ...req.body });
        console.log(data, req.body, newId);

        res.redirect('/basic');
    });


    router.get(['/edit', '/edit/'], (req, res) => {
        res.redirect('/basic');
    });
    router.get('/edit/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const employee = data.find(e => e.id === id);

        if (!employee) {
            return res.status(404).send("Employee not found");
        }

        res.render('editEmployee', { title: 'Edit Employee', employee, nav });
    });
    router.post('/edit/:id', (req, res) => {
        const employeeId = parseInt(req.params.id);
        const index = data.findIndex(e => e.id === employeeId);

        if (index !== -1) {
            data[index] = { id: employeeId, ...req.body };
        }

        res.redirect('/basic');
    });
    router.post('/delete/:id', (req, res) => {
        const employeeId = parseInt(req.params.id);
        data = data.filter(e => e.id !== employeeId);
        res.redirect('/basic');
    });

    return router;
}

module.exports = employeeroutes;
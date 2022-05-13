import todoList from '../../data/todoList.json';

const fs = require('fs');

export default async function handler(req, res) {


    switch (req.method) {
        case 'GET':
            res.status(200).json(todoList);
            break;

        case 'PUT':
            console.log(req.body);
            let obbj = JSON.parse(req.body);
            console.log(obbj);

            let item = todoList.find(item => item.id == obbj.id);

            Object.assign(item, obbj);
            saveData(todoList);
            res.status(200).json({ status: "Updated" });
            break;


        case 'POST':
            todoList.push(JSON.parse(req.body));
            saveData(todoList);
            res.status(200).json({ status: "Created" });
            break;

        case 'DELETE':
            todoList.find(item => item.id == JSON.parse(req.body).id).deleted = 'Y';
            saveData(todoList);
            res.status(200).json({ status: "Deleted" });
            break;



        default:
            res.setHeader('Allow', ['GET', 'PUT', 'POST', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }

}

function saveData() {
    fs.writeFileSync('data/todoList.json', JSON.stringify(todoList));
    //fs.writeFileSync('data/todo.json', JSON.stringify(todoList));
}



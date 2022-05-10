import todoList from '../../data/todoList.json';

const fs = require('fs');

export default async function handler(req, res) {


    switch (req.method) {
        case 'GET':
            if (req.query.deleted) {

                todoList = todoList.filter(item => item.deleted === req.query.deleted)
            }

            res.status(200).json(todoList);
            break;

        case 'DELETE':
            todoList.find(item => item.id.toString() === req.body.toString()).deleted = 'Y';
            saveData(todoList);
            res.status(200).json({ status: "deleted" });
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



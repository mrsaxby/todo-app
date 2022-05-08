import todoList from '../../data/todoList.json';

export default async function handler(req, res) {

    todoList.sort(function (a, b) {
        return a.order - b.order;
    });

    res.status(200).json(todoList)
}

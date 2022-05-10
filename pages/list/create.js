import React, { useState, useEffect } from 'react';

let todoList = require('../../data/todoList.json');

export default function Create() {

    const [todoList, settodoList] = useState("");

    const [loading, setLoading] = useState("");


    const [selectedImage, setSelectedImage] = useState(null);


    useEffect(() => {
        setLoading(true)
        fetch('/api/list')
            .then((res) => res.json())
            .then((todoList) => {
                settodoList(todoList)
                setLoading(false)
            })
    }, []);


    return (
        <div>

            <textarea style={{ "height": "500px", "width": "100%", "border": "none", "outline": "none" }} autoFocus="autofocus"/*  onChange={e => test(e)} */>

            </textarea>
            <p>Attach Image</p>
            {selectedImage && (
                <div>
                    <img alt="not found" width={"250px"} src={URL.createObjectURL(selectedImage)} />

                    <button onClick={() => setSelectedImage(null)}>Remove</button>
                </div>
            )}

            <input
                type="file"
                name="myImage"
                onChange={(event) => {
                    console.log(event.target.files[0]);
                    setSelectedImage(event.target.files[0]);
                }}
            />


            <div>

                <button onClick={create()}>
                    Create
                </button>
                <div>
                    Created at: <span id="createAt"></span>
                </div>

            </div>

            <footer className="footer">
                <div id="a">
                    <a href='/'>
                        &larr;
                    </a>
                </div>

            </footer>
        </div>


    )




    function create() {
        if (loading == false && todoList) {

            let obj = {};
            obj.id = todoList.length ? Math.max(...todoList.map(x => x.id)) + 1 : 1;
            obj.dateCreated = new Date().toISOString();
            obj.dateUpdated = new Date().toISOString();


            console.table(obj);

            // fs.writeFileSync('data/users.json', JSON.stringify(users, null, 4));

        }

    }

    /* function create(item) {
        // generate new user id
        item.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;

        // set date created and updated
        user.dateCreated = new Date().toISOString();
        user.dateUpdated = new Date().toISOString();

        // add and save user
        users.push(user);
        saveData();
    }

    function update(id, params) {
        const user = users.find(x => x.id.toString() === id.toString());

        // set date updated
        user.dateUpdated = new Date().toISOString();

        // update and save
        Object.assign(user, params);
        saveData();
    }

    // prefixed with underscore '_' because 'delete' is a reserved word in javascript
    function _delete(id) {
        // filter out deleted user and save
        users = users.filter(x => x.id.toString() !== id.toString());
        saveData();

    }

    // private helper functions

    function saveData() {
        fs.writeFileSync('data/users.json', JSON.stringify(users, null, 4));
    } */



}

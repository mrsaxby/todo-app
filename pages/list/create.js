
import React, { useState, useEffect } from 'react';

export default function List() {

    const [todoList, settodoList] = useState("");
    const [loading, setLoading] = useState("");

    useEffect(() => {
        setLoading(true)
        fetch('../api/list')
            .then((res) => res.json())
            .then((todoList) => {
                settodoList(todoList)
                setLoading(false)
            })
    }, []);

    //const $$ = document.querySelector('#category').b

    return (
        <div>
            <input id="title" placeholder='Title' autoComplete='off' />
            <div id="description" style={{ "height": "500px", "width": "100%", "border": "none", "outline": "none", "backgroundColor": "white" }} contentEditable={true} suppressContentEditableWarning={true} >
            </div>

            <select id="category" style={{ "fontSize": "2em" }} >
                <option value="---">---</option>
                {categories.map(cat => <option value={cat.id}>{cat.icon}</option>)}
            </select>

            <input type="color" id="favcolor" name="favcolor" defaultValue="#000000" onChange={e => {
                document.querySelector('#category').style.color = e.target.value;
            }


            } />

            <footer className="footer">
                <div id="a">
                    <a href='/'>
                        &larr;
                    </a>
                </div>
                <div id="footer_notes_counter">
                </div>
                <div id="b" onClick={e => {

                    let newObj = {
                        "id": todoList.length ? Math.max(...todoList.map(x => x.id)) + 1 : 1,
                        "title": document.querySelector('#title').value,
                        "description": document.querySelector('#description').innerText,
                        "dateCreated": new Date().toLocaleString('en-GB'),
                        "dateEdited": new Date().toLocaleString('en-GB'),
                        "deleted": "N",
                        "starred": "N"
                    };

                    if (document.querySelector('#category').value != "---") {
                        let selectedCat = categories.find(i => i.id == document.querySelector('#category').value);
                        newObj.category = {
                            id: selectedCat.id,
                            type: selectedCat.type,
                            icon: selectedCat.icon,
                            colour: document.querySelector('#favcolor').value
                        }
                    }

                    fetch('../api/list', {
                        method: 'POST',
                        body: JSON.stringify(newObj)
                    });

                    location = '/';


                }}>
                    +
                </div>
            </footer >
        </div >


    )


}

let categories = [
    { id: 1, type: "Sun", icon: "\u2600" },
    { id: 2, type: "Phone", icon: "\u260f" },
    { id: 3, type: "Shamrock", icon: "\u2618" },
    { id: 4, type: "Radioactive", icon: "\u2622" },
    { id: 5, type: "Peace", icon: "\u262e" },
    { id: 6, type: "Yin Yang", icon: "\u262f" },
    { id: 7, type: "Happy Face", icon: "\u263a" },
    { id: 8, type: "Sad Face", icon: "\u2639" },
    { id: 9, type: "Music", icon: "\u266b" },
    { id: 10, type: "Scales", icon: "\u2696" }
];

import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react';


export default function List() {
    const [todoList, settodoList] = useState("");
    const [loading, setLoading] = useState("");

    const router = useRouter();
    const { itemid } = router.query;

    useEffect(() => {
        setLoading(true)
        fetch('../api/list')
            .then((res) => res.json())
            .then((todoList) => {
                settodoList(todoList)
                setLoading(false)
            })
    }, []);

    function addElement(element) {

        document.querySelector('#description').innerHTML += element;

    }



    if (loading == false && todoList) {
        let item = todoList.find(i => i.id == itemid);

        return (
            <div>
                <input id="title" placeholder='Title' autoComplete='off' defaultValue={item.title} />
                <div id="description" style={{ "height": "500px", "width": "100%", "border": "none", "outline": "none", "backgroundColor": "white" }} contentEditable={true} suppressContentEditableWarning={true} dangerouslySetInnerHTML={{ __html: item.description }} >

                </div>
                <button onClick={e => addElement('<p>Paragraph</p>')}>Text</button>
                <button onClick={e => addElement('<li>Item</li>')}>List</button>
                <button onClick={e => addElement('<b>Bold?</b>')}>Bold</button>
                <button>Italics</button>
                <button>Underline</button>
                <button >Table</button>


                <div>
                    Last Edited:{item.dateEdited.split(',')[0]} At: {item.dateEdited.split(',')[1]}
                </div>
                <div>
                    Created On:{item.dateCreated.split(',')[0]} At: {item.dateCreated.split(',')[1]}
                </div>


                <select id="category" style={{ "fontSize": "2em", color: item.category.colour }} defaultValue={item.category.id} >
                    <option value="---">---</option>
                    {categories.map(cat => <option value={cat.id}>{cat.icon}</option>)}
                </select>

                <input type="color" id="favcolor" name="favcolor" defaultValue={item.category.colour} onChange={e => {
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
                        <div onClick={e => {
                            fetch('../api/list', {
                                method: 'DELETE',
                                body: JSON.stringify({ "id": item.id })
                            });

                        }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fillRule="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                            </svg>

                        </div>
                    </div>
                    <div id="b" onClick={e => {

                        let newObj = {
                            "id": item.id,
                            "title": document.querySelector('#title').value,
                            "description": document.querySelector('#description').innerHTML,
                            "dateEdited": new Date().toLocaleString('en-GB'),
                            "deleted": "N"
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
                        else {
                            newObj.category = {
                                id: null,
                                type: null,
                                icon: null,
                                colour: null
                            };
                        }

                        fetch('../api/list', {
                            method: 'PUT',
                            body: JSON.stringify(newObj)
                        });

                        location = '/';

                    }}>
                        &uarr;
                    </div>

                    {item.deleted == "Y" ? <div>Restore</div> : <></>}

                </footer>
            </div >


        )
    }

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

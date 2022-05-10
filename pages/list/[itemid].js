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




    if (loading == false && todoList) {
        let item = todoList.find(i => i.id == itemid);

        return (
            <div>
                <div id="test" contentEditable={true} suppressContentEditableWarning={true}>
                    {item.title}
                </div>
                <div id="test2" style={{ "height": "500px", "width": "100%", "border": "none", "outline": "none", "backgroundColor": "white" }} contentEditable={true} suppressContentEditableWarning={true} >
                    {item.description}
                </div>

                <div>

                    <button>
                        Update
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
                    <div id="footer_notes_counter">

                    </div>
                    <div id="b" style={{ "width": "100px" }} onClick={e => {

                        fetch("../api/list?deleted=Y", {


                        }).then(location = '/');

                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                        </svg>
                    </div>
                </footer>
            </div>


        )
    }

}


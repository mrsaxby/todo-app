import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react';

export default function Home() {
  let deletedVal = "Y";
  let [todoList, settodoList] = useState("");
  let [currentList, setcurrentList] = useState("");


  useEffect(() => {
    fetch('../api/list')
      .then((res) => res.json())
      .then((todoList) => {
        settodoList(todoList)
        setcurrentList(todoList.filter(item => item.deleted == "N"));
      })
  }, []);





  if (currentList) {
    return (
      <div>
        <div id='search_container'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
          <input type="search" id="search-box" name="search-box" placeholder='Search' autoComplete='off' autoFocus="autofocus" onChange={e => search(e)} />
        </div>

        <main>
          {currentList.map(item => {
            return (
              <div className={styles.card_layout} key={item.id}>

                <div className="icon_container" style={item.starred == "N" ? { "color": "black" } : { "color": "yellow" }} onClick={e => {
                  fetch('../api/list', {
                    method: 'PUT',
                    body: JSON.stringify({
                      "id": item.id,
                      "starred": item.starred == "N" ? "Y" : "N"
                    })
                  });
                  location = '/';
                }}>
                  ☆
                </div>

                {item.category != null ? <div className="icon_container" style={{ "color": item.category.colour }}>{item.category.icon}</div> : <></>}
                <a href={"list/" + item.id}>
                  <div className='list_details_container'>
                    <div className={styles.card_layout_title}>{item.title}</div>
                    <div>
                      <span className={styles.card_layout_date}>{item.dateEdited.split(',')[0]}</span>
                      <span className={styles.card_layout_description}>{item.description.split(" ").slice(0, 10).map(e => e + " ")}</span>
                    </div>
                  </div>
                </a>
              </div>

            )
          })
          }
        </main>

        <footer className="footer">
          <div id="a" onClick={e => {
            if (currentList.filter(item => item.deleted == "Y").length == 0) {
              setcurrentList(todoList.filter(item => item.deleted == "Y"));
            }
            else {
              setcurrentList(todoList.filter(item => item.deleted == "N"));
            }
          }}>

            {currentList.filter(item => item.deleted == "Y").length == 0 ?
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fillRule="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z" />
                </svg>
                {todoList.filter(item => item.deleted == "Y").length}
              </div>
              :
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fillRule="currentColor" className="bi bi-house-fill" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
                  <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
                </svg>
                {todoList.filter(item => item.deleted == "N").length}
              </div>
            }


          </div>
          <div id="footer_notes_counter">
            Notes: {todoList.length}
          </div>
          <div id="b">
            <a href='/list/create'>
              <div>+</div>
            </a>
          </div>
        </footer>
      </div >
    )
  }





  function search(e) {
    let listItems = document.querySelectorAll('main>div');

    if (e.target.value.length > 0) {
      currentList.forEach(function (item, index) {
        if (item.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())) {
          listItems[index].style.display = 'flex';
        }
        else {
          listItems[index].style.display = 'none';
        }

      });
    }
    else {
      listItems.forEach(item => item.style.display = "flex");
    }

    document.querySelector('#footer_notes_counter').innerText = "Notes: " + document.querySelectorAll('main>div:not([style*="display: none"])').length;
  }



}

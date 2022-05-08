import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react';

export default function Home() {

  const [todoList, settodoList] = useState("");

  const [loading, setLoading] = useState("");

  useEffect(() => {
    setLoading(true)
    fetch('api/list')
      .then((res) => res.json())
      .then((todoList) => {
        settodoList(todoList)
        setLoading(false)
      })
  }, []);




  if (loading == false && todoList) {
    return (
      <div>
        <div id='search_container'>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
          <input type="search" id="search-box" name="search-box" placeholder='Search' autoComplete='off' onChange={e => search(e)} />
        </div>

        <main className='home_main'>
          {todoList.map(e => {
            return (
              <div key={e.id} className={styles.card_layout}>
                <a href={"list/" + e.id}>
                  <div className='card_layout_title'>{e.title}</div>
                  <div>
                    <span>{e.dateEdited}</span>
                    <span>{e.description}</span>
                  </div>
                </a>
              </div>
            )
          })

          }
        </main>

        <footer className="footer">
          <div id="footer_notes_counter">
            Notes: {todoList.length}
          </div>
          <div id="b">
            <a href='#'>
              <div>+</div>
            </a>
          </div>
        </footer>
      </div>
    )
  }





  function search(e) {
    let listItems = document.querySelectorAll('.home_main > div');

    if (e.target.value.length > 0) {
      todoList.forEach(function (item, index) {
        if (item.title.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())) {
          listItems[index].style.display = 'block';
        }
        else {
          listItems[index].style.display = 'none';
        }

      });
    }
    else {
      listItems.forEach(item => item.style.display = "block");
    }

    document.querySelector('#footer_notes_counter').innerText = "Notes: " + document.querySelectorAll('.home_main>div:not([style*="display: none"])').length;
  }



}

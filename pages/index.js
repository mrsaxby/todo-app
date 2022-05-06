import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {

  let todoList = [
    { id: 1, title: "u suck", time: Date.now() },
    { id: 1, title: "u suck", time: Date.now() },
    { id: 1, title: "u suck", time: Date.now() },
    { id: 1, title: "u suck", time: Date.now() },
    { id: 1, title: "u suck", time: Date.now() },
    { id: 1, title: "u suck", time: Date.now() },
    { id: 1, title: "u suck", time: Date.now() },

  ]


  return (
    <div>
      <div className={styles.header}>
        Todo Notes
      </div>


      {todoList.map(e => <div className={styles.card_layout}>{e.id}{e.title} {new Date(e.time).toLocaleDateString("en-UK")}</div>)}
    </div>
  )
}

import { Header } from './components/Header.tsx'
import { List } from './components/List.tsx'

import './global.css'
import styles from './App.module.css'

export function App() {
  return (
    <div>
      <Header/>
      <div className={styles.wrapper} >
        <List/>
      </div>
    </div>
  )
}


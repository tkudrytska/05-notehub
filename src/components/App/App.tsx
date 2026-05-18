import css from "./App.module.css";
import { useState } from "react";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox />
        <Pagination />
        <button className={css.button}>Create note +</button>
      </header>
      <NoteList />
    </div>
  );
}

export default App;

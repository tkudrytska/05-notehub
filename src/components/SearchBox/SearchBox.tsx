import css from "./SearchBox.module.css";

const SearchBox = () => {
  return (
    <div className={css.searchBox}>
      <input className={css.input} type="text" placeholder="Search notes" />
    </div>
  );
};

export default SearchBox;

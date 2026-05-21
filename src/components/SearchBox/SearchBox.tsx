import css from "./SearchBox.module.css";

interface SearchBoxProps {
  text: string;
  onSearch: (value: string) => void;
  changePage: (page: number) => void;
}

const SearchBox = ({ text, onSearch, changePage }: SearchBoxProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
    changePage(1);
  };

  return (
    <div className={css.searchBox}>
      <input
        defaultValue={text}
        onChange={handleChange}
        className={css.input}
        type="text"
        placeholder="Search notes"
      />
    </div>
  );
};

export default SearchBox;

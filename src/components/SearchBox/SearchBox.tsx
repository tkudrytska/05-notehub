import css from "./SearchBox.module.css";

interface SearchBoxProps {
  text: string;
  onSearch: (value: string) => void;
}

const SearchBox = ({ text, onSearch }: SearchBoxProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
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

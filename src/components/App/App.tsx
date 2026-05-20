import css from "./App.module.css";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { FetchNotesResponse } from "../../services/noteService";
import { fetchNotes } from "../../services/noteService";
import NoteList from "../NoteList/NoteList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
// import type { Note } from "../../types/note";
import NoteForm from "../NoteForm/NoteForm";

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateNote, setIsCreateNote] = useState(false);
  
  const debouncedSetSearchQuery = useDebouncedCallback(setSearchQuery, 300);

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ["note", searchQuery, currentPage],
    queryFn: () => fetchNotes(searchQuery, currentPage),
    enabled: !!searchQuery,
    placeholderData: keepPreviousData,
  });

  const totalPages = data?.totalPages ?? 0;

  const handleCreateNote = () => {
    setIsModalOpen(true);
    setIsCreateNote(true);
  };

  const closeModal = () => {
    setIsCreateNote(false);
    setIsModalOpen(false);
  };

  const notes = data?.notes ?? [];

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox text={searchQuery} onSearch={debouncedSetSearchQuery} />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={handleCreateNote}>
          Create note +
        </button>
      </header>
      {isModalOpen && (
        <Modal>{isCreateNote && <NoteForm closeModal={closeModal} note={isCreateNote ? { id: "", title: "", content: "", tag: "" } : null} />}</Modal>
      )}
      {notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}

export default App;

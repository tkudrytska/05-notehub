import axios from "axios";
import type { Note } from "../types/note";

const API_BASE_URL = "https://notehub-public.goit.study/api";

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  search: string,
  page: number,
): Promise<FetchNotesResponse> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/notes`, {
      params: {
        search,
        page,
        perPage: 10,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    return {
      notes: [],
      totalPages: 0,
    };
  }
};

export const createNote = async (note: Note) => {
  const response = await axios.post(`${API_BASE_URL}/notes`, note, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
};

export const deleteNote = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
    },
  });
  return response.data;
};

import { useContext } from 'react'
import { NotesContext } from '../contexts/NotesContext'

export function useNotes() {
    const value = useContext(NotesContext)
    return value;
}
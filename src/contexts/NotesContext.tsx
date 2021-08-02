import { useState, createContext, ReactNode } from 'react'
import { v4 as uuid } from 'uuid';

type NoteType = {
    note: string;
    paperColor: string;
    pinColor: string;
    id: string;
}
type NotesContextType = {
    toDos: NoteType[];
    doing: NoteType[];
    dones: NoteType[];
    noteContent: string;
    triggerNewNote: boolean;
    noteColors: number[];

    deleteNote: (sourceIndex: number, source: string) => void;
    reorderList: (source: { source: string, index: number }, destination: { destination: string, index: number }) => void;
    handleChangeList: (source: { source: string, index: number }, destination: { destination: string, index: number }) => void;
    updateNewNoteContent: (newContent: string) => void;
    createNote: (destination: { destination: string, index: number }) => void;
    toggleTrigger: () => void;
    changeColor: () => void;
}
type NotesContextProviderProps = {
    children: ReactNode;
}

const toDoNotes = [
    {
        note: "Uma tarefa para fazer",
        paperColor: "hsl(130,100%,85%)",
        pinColor: "hsl(60,100%,50%)",
        id: "uuid1"
    },
    {
        note: "Outra tarefa para fazer",
        paperColor: "hsl(60,100%,85%)",
        pinColor: "hsl(300,100%,50%)",
        id: "uuid2"
    },
    {
        note: "Terceira tarefa para fazer",
        paperColor: "hsl(230,100%,85%)",
        pinColor: "hsl(0,100%,50%)",
        id: "uuid3"
    },
]

const DoingNotes = [
    {
        note: "Uma tarefa fazendo",
        paperColor: "hsl(0,100%,85%)",
        pinColor: "hsl(260,100%,50%)",
        id: "uuid4"
    },
    {
        note: "Outra tarefa fazendo",
        paperColor: "hsl(30,100%,85%)",
        pinColor: "hsl(300,100%,50%)",
        id: "uuid5"
    },
    {
        note: "Terceira tarefa fazendo",
        paperColor: "hsl(300,100%,85%)",
        pinColor: "hsl(0,100%,50%)",
        id: "uuid6"
    },
]

const DoneNotes = [
    {
        note: "Uma tarefa feita",
        paperColor: "hsl(230,100%,85%)",
        pinColor: "hsl(40,100%,50%)",
        id: "uuid7"
    },
    {
        note: "Outra tarefa feita",
        paperColor: "hsl(100,100%,85%)",
        pinColor: "hsl(100,100%,50%)",
        id: "uuid8"
    },
    {
        note: "Terceira tarefa feita",
        paperColor: "hsl(70,100%,85%)",
        pinColor: "hsl(100,100%,50%)",
        id: "uuid9"
    },
]

const notesHueValues = [50, 0, 181, 116, 306, 200, 90]

export const NotesContext = createContext({} as NotesContextType);

export function NotesContextProvider(props: NotesContextProviderProps) {
    const [toDos, setToDos] = useState<NoteType[]>(toDoNotes);
    const [doing, setDoing] = useState<NoteType[]>(DoingNotes);
    const [dones, setDones] = useState<NoteType[]>(DoneNotes);

    const [noteContent, setNoteContent] = useState('');

    const [noteColors, setNoteColors] = useState(notesHueValues);


    const [triggerNewNote, setTriggerNewNote] = useState(false);



    function deleteNote(sourceIndex: number, source: string) {

        let items;
        switch (source) {
            case "to-dos":
                items = Array.from(toDos);
                break;
            case "doings":
                items = Array.from(doing);
                break;
            case "dones":
                items = Array.from(dones)
                break;
        }
        if (items) {
            items.splice(sourceIndex, 1);

            switch (source) {
                case "to-dos":
                    setToDos(items)
                    break;
                case "doings":
                    setDoing(items)
                    break;
                case "dones":
                    setDones(items)
                    break;
            }
        }

    }

    function reorderList(source: { source: string, index: number }
        , destination: { destination: string, index: number }) {
        let items;
        switch (source.source) {
            case "to-dos":
                items = Array.from(toDos);
                break;
            case "doings":
                items = Array.from(doing);
                break;
            case "dones":
                items = Array.from(dones)
                break;
        }
        if (items) {
            const [reorderedItem] = items.splice(source.index, 1);
            items.splice(destination.index, 0, reorderedItem);

            switch (source.source) {
                case "to-dos":
                    updateToDos(items)
                    break;
                case "doings":
                    updateDoing(items)
                    break;
                case "dones":
                    updateDones(items)
                    break;
            }
        }
    }
    function handleChangeList(source: { source: string, index: number }
        , destination: { destination: string, index: number }) {
        let newSource;
        let item;
        switch (source.source) {
            case "to-dos":
                newSource = Array.from(toDos);
                [item] = newSource.splice(source.index, 1)
                updateToDos(newSource)
                break;
            case "doings":
                newSource = Array.from(doing);
                [item] = newSource.splice(source.index, 1)
                updateDoing(newSource)
                break;
            case "dones":
                newSource = Array.from(dones);
                [item] = newSource.splice(source.index, 1)
                updateDones(newSource)
                break;
        }
        if (item !== undefined) {

            let newDestination;
            switch (destination.destination) {
                case "to-dos":
                    newDestination = Array.from(toDos)
                    newDestination.splice(destination.index, 0, item)
                    updateToDos(newDestination)
                    break;
                case "doings":

                    newDestination = Array.from(doing)

                    newDestination.splice(destination.index, 0, item)

                    updateDoing(newDestination)
                    break;
                case "dones":

                    newDestination = Array.from(dones)
                    newDestination.splice(destination.index, 0, item)
                    updateDones(newDestination)
                    break;
            }
        }

    }

    function createNote(destination: { destination: string, index: number }) {
        const note = assembleNote();
        if (!note) return;

        let items;
        switch (destination.destination) {
            case "to-dos":
                items = Array.from(toDos)
                break;
            case "doings":
                items = Array.from(doing);
                break;
            case "dones":
                items = Array.from(dones)
                break;
        }
        if (items) {
            items.splice(destination.index, 0, note)
            switch (destination.destination) {
                case "to-dos":
                    updateToDos(items)
                    break;
                case "doings":
                    updateDoing(items)
                    break;
                case "dones":
                    updateDones(items)
                    break;
            }
            //reset note
            updateNewNoteContent('')
        }


    }

    function assembleNote() {
        if (!noteContent) {
            console.error('No content')
            return;
        }
        return {
            note: noteContent,
            paperColor: `hsl(${noteColors[0]},100%,85%)`,
            pinColor: `hsl(${Math.floor(Math.random() * 360 + 1)},100%,50%)`,
            id: uuid(),
        }
    }

    function toggleTrigger() {
        setTriggerNewNote(!triggerNewNote)
    }

    function updateNewNoteContent(newContent: string) { setNoteContent(newContent) }

    function updateToDos(updatedList: NoteType[]) { setToDos(updatedList) }
    function updateDoing(updatedList: NoteType[]) { setDoing(updatedList) }
    function updateDones(updatedList: NoteType[]) { setDones(updatedList) }

    function changeColor() {
        let copyColors = noteColors;
        let last = noteColors.shift();
        if (last !== undefined) {
            copyColors.push(last);
        }
        setNoteColors(copyColors);
    }


    return (
        <NotesContext.Provider value={{
            toDos,
            doing,
            dones,
            noteContent,
            triggerNewNote,
            noteColors,

            deleteNote,
            reorderList,
            handleChangeList,
            updateNewNoteContent,
            createNote,
            toggleTrigger,
            changeColor
        }}>
            {props.children}
        </NotesContext.Provider>
    )
}


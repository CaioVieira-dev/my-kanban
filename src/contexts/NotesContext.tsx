import { useState, createContext, ReactNode, useEffect } from 'react'
import { v4 as uuid } from 'uuid';
import { useAuth } from '../hooks/useAuth'
import { database, Fieldvalue } from '../services/firebase'

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
    deleteDb: (id: string) => Promise<void>;
}
type NotesContextProviderProps = {
    children: ReactNode;
}

const notesHueValues = [50, 0, 181, 116, 306, 200, 90]

export const NotesContext = createContext({} as NotesContextType);

export function NotesContextProvider(props: NotesContextProviderProps) {
    const { user } = useAuth();

    const [toDos, setToDos] = useState<NoteType[]>([]);
    const [doing, setDoing] = useState<NoteType[]>([]);
    const [dones, setDones] = useState<NoteType[]>([]);

    const [noteContent, setNoteContent] = useState('');

    const [noteColors, setNoteColors] = useState(notesHueValues);


    const [triggerNewNote, setTriggerNewNote] = useState(false);

    useEffect(() => {
        const userRef = database.collection('users').doc(user?.id)
        //whenever user database updates
        const unsubscribe = userRef.onSnapshot((res) => {
            //get data
            const data = res.data();
            //if data exists
            if (data) {
                //format data to an array of arrays
                const entries = Object.entries(data);

                //pick only the notes
                const notes = entries.map(item => {
                    return {
                        type: item[1].type,
                        note: item[1].note,
                        pinColor: item[1].pinColor,
                        paperColor: item[1].paperColor,
                        id: item[0]
                    }
                })

                let toDoList = [] as NoteType[];
                let doingList = [] as NoteType[];
                let doneList = [] as NoteType[];

                for (let note of notes) {
                    switch (note.type) {
                        case 'todo':
                            toDoList.push({
                                note: note.note,
                                id: note.id,
                                pinColor: note.pinColor,
                                paperColor: note.paperColor
                            })
                            break;
                        case 'doing':
                            doingList.push({
                                note: note.note,
                                id: note.id,
                                pinColor: note.pinColor,
                                paperColor: note.paperColor
                            })
                            break;
                        case 'done':
                            doneList.push({
                                note: note.note,
                                id: note.id,
                                pinColor: note.pinColor,
                                paperColor: note.paperColor
                            })
                            break;
                    }
                }

                updateToDos(toDoList);
                updateDoing(doingList);
                updateDones(doneList);

            }

        })
        return () => unsubscribe();
    }, [user])

    async function deleteDb(id: string) {
        const noteRef = database.collection('users').doc(user?.id);
        let query = {} as any;
        query[id] = Fieldvalue.delete()
        const res = await noteRef.update(query)
        console.log(res)
    }

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
            changeColor,
            deleteDb
        }}>
            {props.children}
        </NotesContext.Provider>
    )
}


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
    deleteDb: (id: string, source: string) => Promise<void>;
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
                let dbToDo = Object.entries(data.todo);
                let dbDoing = Object.entries(data.doing);
                let dbDone = Object.entries(data.done);

                let toDoList: NoteType[] = [];
                if (dbToDo.length > 0) {
                    for (let note of dbToDo as [string, NoteType][]) {
                        toDoList.push({
                            id: note[0],
                            note: note[1].note,
                            paperColor: note[1].paperColor,
                            pinColor: note[1].pinColor,
                        })
                    }
                }
                let doingList: NoteType[] = [];
                if (dbDoing.length > 0) {
                    for (let note of dbDoing as [string, NoteType][]) {
                        doingList.push({
                            id: note[0],
                            note: note[1].note,
                            paperColor: note[1].paperColor,
                            pinColor: note[1].pinColor,
                        })
                    }
                }
                let doneList: NoteType[] = [];
                if (dbDone.length > 0) {
                    for (let note of dbDone as [string, NoteType][]) {
                        doneList.push({
                            id: note[0],
                            note: note[1].note,
                            paperColor: note[1].paperColor,
                            pinColor: note[1].pinColor,
                        })
                    }
                }

                updateToDos(toDoList);
                updateDoing(doingList);
                updateDones(doneList);

            }

        })
        return () => unsubscribe();
    }, [user])
    async function deleteDb(id: string, source: string) {
        const noteRef = database.collection('users').doc(user?.id);
        let dbBucket;
        switch (source) {
            case "to-dos":
                dbBucket = "todo";
                break;
            case "doings":
                dbBucket = "doing";
                break;
            case "dones":
                dbBucket = "done";
                break;
        }
        if (dbBucket) {
            let query = {} as any;
            query[`${dbBucket}.${id}`] = Fieldvalue.delete();
            const res = await noteRef.update(query)
            console.log(res)
        }
    }

    async function createInDb(destination: { destination: string, index: number }) {
        const note: any = assembleNote();
        if (!note) return;
        note.index = destination.index;
        let dbBucket;
        switch (destination.destination) {
            case "to-dos":
                dbBucket = "todo";
                break;
            case "doings":
                dbBucket = "doing";
                break;
            case "dones":
                dbBucket = "done";
                break;
        }
        //set database refference
        const notesRef = database.collection('users').doc(user?.id)
        //create a blank object
        const noteObject: any = {};
        noteObject[note.id] = note
        //set blank object
        const query: any = {};
        //use blank object to set field of database
        query[dbBucket || 'none'] = noteObject;
        //execute database action
        const res = await notesRef.set(query, { merge: true });
        console.log(res)

        updateNewNoteContent('')


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
        createInDb(destination)
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


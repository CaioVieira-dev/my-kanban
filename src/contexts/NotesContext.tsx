import { useState, createContext, ReactNode, useEffect } from 'react'
import { v4 as uuid } from 'uuid';
import { useAuth } from '../hooks/useAuth'
import { database, Fieldvalue } from '../services/firebase'

type NoteType = {
    note: string;
    paperColor: string;
    pinColor: string;
    id: string;
    index: number;

}

type NotesContextType = {
    toDos: NoteType[];
    doing: NoteType[];
    dones: NoteType[];
    noteContent: string;
    noteColors: number[];

    deleteNote: (sourceIndex: number, source: string) => void;
    reorderList: (source: { source: string, index: number }, destination: { destination: string, index: number }) => void;
    handleChangeList: (source: { source: string, index: number }, destination: { destination: string, index: number }) => void;
    updateNewNoteContent: (newContent: string) => void;
    changeColor: () => void;
    deleteDb: (id: string, source: string) => Promise<void>;
    createInDb: (destination: { destination: string, index: number }) => Promise<void>;
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

    useEffect(() => {
        const userRef = database.collection('users').doc(user?.id)
        //whenever user database updates
        const unsubscribe = userRef.onSnapshot((res) => {
            //get data
            const data = res.data();
            //if data exists
            if (data) {
                let dbToDo: [string, NoteType][] = Object.entries(data.todo);
                let dbDoing: [string, NoteType][] = Object.entries(data.doing);
                let dbDone: [string, NoteType][] = Object.entries(data.done);

                dbToDo.sort((a, b) => { return a[1].index - b[1].index });
                dbDoing.sort((a, b) => { return a[1].index - b[1].index });
                dbDone.sort((a, b) => { return a[1].index - b[1].index });

                let toDoList: NoteType[] = [];
                if (dbToDo.length > 0) {
                    for (let note of dbToDo as [string, NoteType][]) {
                        toDoList.push({
                            id: note[0],
                            note: note[1].note,
                            paperColor: note[1].paperColor,
                            pinColor: note[1].pinColor,
                            index: note[1].index,
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
                            index: note[1].index,
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
                            index: note[1].index,
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
            try {
                await noteRef.update(query)
            } catch (err) {
                console.error(err);
            }

        }
    }

    async function createInDb(destination: { destination: string, index: number }) {
        const note: any = assembleNote();
        if (!note) return;
        let dbBucket;
        let list;
        switch (destination.destination) {
            case "to-dos":
                dbBucket = "todo";
                list = Array.from(toDos)
                break;
            case "doings":
                dbBucket = "doing";
                list = Array.from(doing)
                break;
            case "dones":
                dbBucket = "done";
                list = Array.from(dones)
                break;
        }
        if (list) {
            list.splice(destination.index, 0, note);
            let items = {} as any;
            for (let i = 0; i < list.length; i++) {
                list[i].index = i;
                items[list[i].id] = list[i]
            }

            console.log(items)
            //set database refference
            const notesRef = database.collection('users').doc(user?.id)

            //set blank object
            const query: any = {};
            //use blank object to set field of database
            query[dbBucket || 'none'] = items;
            try {
                //execute database action
                await notesRef.update(query);
            } catch (err) { console.error(err); }


            updateNewNoteContent('')
        }




    }

    async function reorderDbList(newOrder: NoteType[], bucket: "todo" | "doing" | "done") {
        let items = {} as any;
        for (let i = 0; i < newOrder.length; i++) {
            //define keys for items
            items[newOrder[i].id] = newOrder[i]
        }
        //set database refference
        const notesRef = database.collection('users').doc(user?.id)
        //set blank object
        const query: any = {};
        //use blank object to set field of database
        query[bucket] = items;
        try {
            //execute database action
            await notesRef.update(query);
        } catch (err) { console.error(err); }

    }
    async function handleChangeListInDb(sourceItems: NoteType[], sourceBucket: "todo" | "doing" | "done",
        destinationItems: NoteType[], destinationBucket: "todo" | "doing" | "done") {
        console.log('handle change', sourceItems.length)
        let source = {} as any;
        for (let i = 0; i < sourceItems.length; i++) {
            source[sourceItems[i].id] = sourceItems[i];
            source[sourceItems[i].id].index = i;

        }
        let destination = {} as any;
        for (let i = 0; i < destinationItems.length; i++) {
            destination[destinationItems[i].id] = destinationItems[i];
            destination[destinationItems[i].id].index = i;
        }

        //set database refference
        const notesRef = database.collection('users').doc(user?.id)
        //set blank object
        const query: any = {};

        //use blank object to set field of database
        query[sourceBucket] = source;
        query[destinationBucket] = destination;
        //execute database action
        try {
            await notesRef.update(query);

        } catch (err) {
            console.error(err)
        }


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
            //update index key
            for (let i = 0; i < items.length; i++) {
                items[i].index = i;
            }

            switch (source.source) {
                case "to-dos":
                    reorderDbList(items, 'todo')
                    break;
                case "doings":
                    reorderDbList(items, 'doing')
                    break;
                case "dones":
                    reorderDbList(items, 'done')
                    break;
            }
        }
    }
    function handleChangeList(source: { source: string, index: number }
        , destination: { destination: string, index: number }) {
        let newSource;
        let sourceBucket;
        let item;
        switch (source.source) {
            case "to-dos":
                sourceBucket = "todo"
                newSource = Array.from(toDos);
                console.log('before', newSource.length);
                [item] = newSource.splice(source.index, 1)
                console.log('after', newSource.length);
                break;
            case "doings":
                sourceBucket = "doing"
                newSource = Array.from(doing);
                [item] = newSource.splice(source.index, 1)
                break;
            case "dones":
                sourceBucket = 'done'
                newSource = Array.from(dones);
                [item] = newSource.splice(source.index, 1)
                break;
        }
        if (!newSource || !sourceBucket) { return }
        if (item !== undefined) {

            let newDestination;
            let destinationBucket;
            switch (destination.destination) {
                case "to-dos":
                    newDestination = Array.from(toDos)
                    newDestination.splice(destination.index, 0, item)
                    destinationBucket = "todo";
                    break;
                case "doings":
                    newDestination = Array.from(doing)
                    newDestination.splice(destination.index, 0, item)
                    destinationBucket = 'doing'

                    break;
                case "dones":

                    newDestination = Array.from(dones)
                    newDestination.splice(destination.index, 0, item)
                    destinationBucket = "done"
                    break;
            }
            if (!newDestination || !destinationBucket) { return }
            handleChangeListInDb(newSource, sourceBucket as "todo" | "doing" | "done",
                newDestination, destinationBucket as "todo" | "doing" | "done")
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
            noteColors,

            deleteNote,
            reorderList,
            handleChangeList,
            updateNewNoteContent,
            changeColor,
            deleteDb,
            createInDb
        }}>
            {props.children}
        </NotesContext.Provider>
    )
}


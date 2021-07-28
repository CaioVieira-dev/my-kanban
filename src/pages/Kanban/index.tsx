import { Board, ChalkText, List } from './styles'
import { Logo } from '../../components/Logo'
import { Postsheet } from '../../components/postsheet'

import { useState } from 'react'
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd'

type NoteType = {
    note: string;
    paperColor: string;
    pinColor: string;
    id: string;
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


export function Kanban() {
    const [toDos, setToDos] = useState<NoteType[]>(toDoNotes)
    const [doing, setDoing] = useState<NoteType[]>(DoingNotes)
    const [dones, setDones] = useState<NoteType[]>(DoneNotes)

    function handleOnDragEnd(result: DropResult) {
        if (!result.destination) return;
        const source = result.source.droppableId
        const destination = result.destination.droppableId
        console.log(result)

        if (source === destination) {

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
                const [reorderedItem] = items.splice(result.source.index, 1);
                items.splice(result.destination.index, 0, reorderedItem);

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
            return;
        }
        let newSource;
        let item;
        switch (source) {
            case "to-dos":
                newSource = Array.from(toDos);
                [item] = newSource.splice(result.source.index, 1)
                console.log(newSource)
                setToDos(newSource)
                break;
            case "doings":
                newSource = Array.from(doing);
                [item] = newSource.splice(result.source.index, 1)
                setDoing(newSource)
                break;
            case "dones":
                newSource = Array.from(dones);
                [item] = newSource.splice(result.source.index, 1)
                setDones(newSource)
                break;
        }
        if (item !== undefined) {

            let newDestination;
            switch (destination) {
                case "to-dos":
                    newDestination = Array.from(toDos)
                    newDestination.splice(result.destination.index, 0, item)
                    setToDos(newDestination)
                    break;
                case "doings":

                    newDestination = Array.from(doing)

                    newDestination.splice(result.destination.index, 0, item)

                    setDoing(newDestination)
                    break;
                case "dones":

                    newDestination = Array.from(dones)
                    newDestination.splice(result.destination.index, 0, item)
                    setDones(newDestination)
                    break;
            }
        }



    }

    return (
        <>
            <Logo />
            <Board>
                <ChalkText className="to-do">Para fazer</ChalkText>
                <ChalkText className="doing">Fazendo</ChalkText>
                <ChalkText className="done">Feito</ChalkText>
                <DragDropContext onDragEnd={handleOnDragEnd} >
                    <Droppable droppableId="to-dos">
                        {(provided) => (

                            <List
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="to-do">
                                {toDos.map((note, index) => <Draggable
                                    key={note.id}
                                    draggableId={note.id}
                                    index={index}
                                >
                                    {(provided) => (

                                        <Postsheet

                                            dragProps={provided.draggableProps}
                                            handProps={provided.dragHandleProps}
                                            refi={provided.innerRef}
                                            paperColor={note.paperColor || ""}
                                            pinColor={note.pinColor || ""}

                                        >{note.note}</Postsheet>
                                    )}
                                </Draggable>)}
                                {provided.placeholder}
                            </List>
                        )}
                    </Droppable>
                    <Droppable droppableId="doings">
                        {(provided) => (

                            <List
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="doing">
                                {doing.map((note, index) =>
                                    <Draggable
                                        key={note.id}
                                        draggableId={note.id}
                                        index={index}
                                    >
                                        {(provided) => (

                                            <Postsheet
                                                dragProps={provided.draggableProps}
                                                handProps={provided.dragHandleProps}
                                                refi={provided.innerRef}
                                                paperColor={note.paperColor || ""}
                                                pinColor={note.pinColor || ""}
                                                key={note.id}
                                            >{note.note}</Postsheet>
                                        )}
                                    </Draggable>
                                )}
                                {provided.placeholder}
                            </List>
                        )}
                    </Droppable>
                    <Droppable droppableId="dones">
                        {(provided) => (

                            <List
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="done">
                                {dones.map((note, index) =>
                                    <Draggable
                                        key={note.id}
                                        draggableId={note.id}
                                        index={index}>
                                        {(provided) => (
                                            <Postsheet
                                                dragProps={provided.draggableProps}
                                                handProps={provided.dragHandleProps}
                                                refi={provided.innerRef}
                                                paperColor={note.paperColor || ""}
                                                pinColor={note.pinColor || ""}
                                                key={note.id}>
                                                {note.note}
                                            </Postsheet>
                                        )}
                                    </Draggable>
                                )}
                            </List>
                        )}
                    </Droppable>
                </DragDropContext>
            </Board>
        </>
    )
}
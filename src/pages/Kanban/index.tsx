import { Board, ChalkText, List, Container, Aria2 } from './styles'
import { Logo } from '../../components/Logo'
import { Postsheet } from '../../components/postsheet'
import { Trash } from '../../components/Trash'
import { NotePad } from '../../components/NotePad'
import { UserCard } from '../../components/UserCard'

import { useNotes } from '../../hooks/useNotes'
import { useAuth } from '../../hooks/useAuth'
import { useHistory } from 'react-router-dom'

import { DragDropContext, Droppable, Draggable, DropResult, DragStart } from 'react-beautiful-dnd'

type NoteType = {
    note: string;
    paperColor: string;
    pinColor: string;
    id: string;
}


type ListProps = {
    postsheets: NoteType[];
}


function ToDoList(props: ListProps) {
    return <Droppable droppableId="to-dos">
        {(provided) => (

            <List
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="to-do">
                {props.postsheets.map((note, index) => <Draggable
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
}

function DoingList(props: ListProps) {
    return <Droppable droppableId="doings">
        {(provided) => (

            <List
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="doing">
                {props.postsheets.map((note, index) =>
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
}
function DoneList(props: ListProps) {
    return <Droppable droppableId="dones">
        {(provided) => (

            <List
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="done">
                {props.postsheets.map((note, index) =>
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
                {provided.placeholder}
            </List>
        )}
    </Droppable>
}
export function Kanban() {

    const { toDos, dones, doing,
        reorderList, handleChangeList,
        deleteNote, createNote, toggleTrigger, changeColor, deleteDb } = useNotes();
    const history = useHistory()
    const { user } = useAuth()


    function handleOnDragEnd(result: DropResult) {
        if (!result.destination) return;
        const source = result.source.droppableId
        const destination = result.destination.droppableId

        if (destination === "trash") {
            switch (source) {
                case "to-dos":
                    deleteDb(toDos[result.source.index].id, source)
                    break;
                case "doings":
                    deleteDb(doing[result.source.index].id, source)
                    break;
                case "dones":
                    deleteDb(dones[result.source.index].id, source)
                    break;
            }
            deleteNote(result.source.index, source);
            return;
        }

        if (source === destination) {
            reorderList({ source, index: result.source.index },
                { destination, index: result.destination.index });
            return;
        }
        //onDragEnd destination is not source
        //check if source is NewNotes
        if (source === "NewNotes") {
            console.log(result)
            //criar card
            createNote({ destination, index: result.destination.index })
            changeColor();
            return;
        }

        handleChangeList({ source, index: result.source.index },
            { destination, index: result.destination.index })

    }

    function handleBefore(initial: DragStart) {
        if (initial.source.droppableId === "NewNotes") {
            toggleTrigger();
        }

    }

    if (!user) {
        history.push('/login')
    }

    return (
        <Container>
            <UserCard />
            <DragDropContext
                onDragEnd={handleOnDragEnd}
                onDragStart={handleBefore}
            >
                <Aria2>
                    <Logo />

                    <NotePad />
                    <Trash />
                </Aria2>

                <Board>
                    <ChalkText className="to-do">Para fazer</ChalkText>
                    <ChalkText className="doing">Fazendo</ChalkText>
                    <ChalkText className="done">Feito</ChalkText>
                    <ToDoList postsheets={toDos} />
                    <DoingList postsheets={doing} />
                    <DoneList postsheets={dones} />
                </Board>
            </DragDropContext>
        </Container>
    )
}
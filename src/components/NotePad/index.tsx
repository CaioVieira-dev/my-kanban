import { Container, NewNote, NoteDragger, NoteWrapper } from './styles'
import { Draggable, Droppable } from 'react-beautiful-dnd'

import { useNotes } from '../../hooks/useNotes'


export function NotePad() {
    const { noteContent
        , updateNewNoteContent,
        noteColors } = useNotes();

    const dragger = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 20 20">
    <g id="Grupo_3" data-name="Grupo 3" transform="translate(-62 -285)">
      <g id="Retângulo_13" data-name="Retângulo 13" transform="translate(62 285)" fill="hsl(${noteColors[1]},100%,85%)" stroke="hsl(${noteColors[1]},100%,85%)" stroke-width="1">
        <rect width="20" height="20" stroke="none"/>
        <rect x="0.5" y="0.5" width="19" height="19" fill="none"/>
      </g>
      <path id="Caminho_6" data-name="Caminho 6" d="M20,0V20H0Z" transform="translate(62 285)" fill="white"/>
    </g>
  </svg>
  `


    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        updateNewNoteContent(e.target.value)
    }

    return (
        <Droppable droppableId="NewNotes">
            {(provided) => (
                <Container
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    hues={noteColors}
                >
                    <Draggable draggableId="newNote" index={0} >
                        {(provided) => (
                            <NoteWrapper {...provided.dragHandleProps}
                                {...provided.draggableProps}
                                ref={provided.innerRef}>
                                <NoteDragger

                                    src={dragger} />
                                <NewNote
                                    maxLength={350}
                                    bg={noteColors[0]}
                                    value={noteContent}

                                    onChange={(e) => handleChange(e)}
                                />
                            </NoteWrapper>
                        )}
                    </Draggable>
                    {provided.placeholder}
                </Container>

            )}
        </Droppable>
    )
}
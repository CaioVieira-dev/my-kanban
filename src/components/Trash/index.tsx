import can from '../../assets/trash can.svg'
import lid from '../../assets/trash lid.svg'

import { Container, Can, Lid } from "./styles";
import { Droppable } from 'react-beautiful-dnd'

export function Trash() {

    return (
        <Droppable droppableId="trash">
            {(provided) => (

                <Container
                    {...provided.droppableProps}
                    ref={provided.innerRef}>
                    <Lid src={lid} />
                    <Can src={can} />
                    {provided.placeholder}
                </Container>
            )}
        </Droppable>
    )
}
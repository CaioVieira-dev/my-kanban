import { Board, ChalkText, List } from './styles'
import { Logo } from '../../components/Logo'

export function Kanban() {

    return (
        <>
            <Logo />
            <Board>
                <ChalkText className="to-do">Para fazer</ChalkText>
                <ChalkText className="doing">Fazendo</ChalkText>
                <ChalkText className="done">Feito</ChalkText>
                <List className="to-do"></List>
                <List className="doing"></List>
                <List className="done"></List>
            </Board>
        </>
    )
}
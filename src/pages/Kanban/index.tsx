import { Board, ChalkText, List } from './styles'
import { Logo } from '../../components/Logo'
import { Postsheet } from '../../components/postsheet'

export function Kanban() {

    return (
        <>
            <Logo />
            <Board>
                <ChalkText className="to-do">Para fazer</ChalkText>
                <ChalkText className="doing">Fazendo</ChalkText>
                <ChalkText className="done">Feito</ChalkText>
                <List className="to-do">
                    <Postsheet paperColor="hsl(130,100%,85%)" >
                        Uma nota interessante
                    </Postsheet>
                    <Postsheet
                        paperColor="hsl(230,100%,85%)"
                        pinColor="gold" >
                        Outra nota interessante
                    </Postsheet>
                </List>
                <List className="doing"></List>
                <List className="done"></List>
            </Board>
        </>
    )
}
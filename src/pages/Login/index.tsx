import { Button, Container, GoogleG } from './styles'
import { Logo } from "../../components/Logo"

import G from '../../assets/google.svg'

export function Login() {

    return (
        <Container>
            <Logo className="login" />
            <Button><GoogleG src={G} />Login com Google</Button>
        </Container>
    )
}
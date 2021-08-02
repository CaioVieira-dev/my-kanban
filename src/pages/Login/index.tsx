import { Button, Container, GoogleG } from './styles'
import { Logo } from "../../components/Logo"
import { useAuth } from '../../hooks/useAuth'

import G from '../../assets/google.svg'
import { useHistory } from 'react-router-dom'

export function Login() {
    const { signInWithGoogle, user } = useAuth()
    const history = useHistory();
    async function handleLogin() {
        if (!user) {
            await signInWithGoogle()
        }
        history.push('/');
    }
    return (
        <Container>
            <Logo className="login" />
            <Button onClick={handleLogin}><GoogleG src={G} />Login com Google</Button>
        </Container>
    )
}
import { Avatar, Card, Exit, UserName, TextWrapper, CardWrapper } from './styles';
import { useAuth } from '../../hooks/useAuth'
import { useHistory } from 'react-router-dom'
import { useState } from 'react'

export function UserCard() {
    const { user, signOut } = useAuth();
    const [isActive, setIsActive] = useState(false);
    const history = useHistory();
    async function handleExit() {
        await signOut();
        history.push('/login');
    }


    if (!user) {
        return <div className="noUser"></div>
    }

    return (
        <CardWrapper>

            <Card
                onClick={() => setIsActive(!isActive)}
                className={isActive ? "active" : ''}>
                <Avatar src={user.avatar} />
                <TextWrapper>
                    <UserName>{user.name}</UserName>
                    <Exit onClick={handleExit}>Sair</Exit>
                </TextWrapper>
            </Card>
        </CardWrapper>
    )
}
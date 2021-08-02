import { BrowserRouter, Switch, Route } from 'react-router-dom'


import { Kanban } from './pages/Kanban'
import { GlobalStyle } from './styles/styles'
import { NotesContextProvider } from './contexts/NotesContext'
import { Login } from './pages/Login'
import { AuthContextProvider } from './contexts/AuthContextProvider'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <AuthContextProvider>

            <Route path="/" exact >
              <NotesContextProvider>
                <Kanban />
              </NotesContextProvider>
            </Route>
            <Route path="/login" exact component={Login} />
          </AuthContextProvider>
        </Switch>
      </BrowserRouter>
      <GlobalStyle />
    </div>
  );
}

export default App;

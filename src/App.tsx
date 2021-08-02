import { BrowserRouter, Switch, Route } from 'react-router-dom'


import { Kanban } from './pages/Kanban'
import { GlobalStyle } from './styles/styles'
import { NotesContextProvider } from './contexts/NotesContext'
import { Login } from './pages/Login'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact >
            <NotesContextProvider>
              <Kanban />
            </NotesContextProvider>
          </Route>
          <Route path="/login" exact component={Login} />
        </Switch>
      </BrowserRouter>
      <GlobalStyle />
    </div>
  );
}

export default App;

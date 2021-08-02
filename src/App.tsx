
import { Kanban } from './pages/Kanban'
import { GlobalStyle } from './styles/styles'
import { NotesContextProvider } from './contexts/NotesContext'


function App() {
  return (
    <div className="App">
      <NotesContextProvider>
        <Kanban />
      </NotesContextProvider>
      <GlobalStyle />
    </div>
  );
}

export default App;

import {Routes,Route} from 'react-router-dom';
import ShowData from './components/ShowList';
import './App.css';
function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<ShowData/>}/>
    </Routes>
    </div>
  );
}

export default App;

import logo from './oscar.png';
import './App.css';

function App() {
  return (
    <header>
      <div class='container'>
        <div class='logo_container'>
        <h2>Critics Choice</h2>
        <img id='oscar_image_left' src={logo}></img>
        <img id='oscar_image_right' src={logo}></img>

        </div>
        <div class='critics_list'>
          <ul>
            <li><a href='#'>IMDB 250</a></li>
            <li><a href='#'>BAFTA Awards</a></li>
            <li><a href='#'>Academy Awards</a></li>
            <li><a href='#'>Golden Globes</a></li>
            <li><a href='#'>National Film Board</a></li>
          </ul>
        </div>
      </div>
    </header>
    
  );
}

export default App;

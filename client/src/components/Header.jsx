import "../styles/header.css";
import logo from "../images/oscar.png";

export default function Header() {
  return (
    <header>
      <div className="container">
        <div className="logo_container">
          <h2>Critics Choice</h2>
          <img id="oscar_image_left" src={logo} alt="logo"></img>
          <img id="oscar_image_right" src={logo} alt="logo"></img>
        </div>
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="icons">
          <i className="bx bx-menu" id="menu-icon"></i>
          <i className="bx bx-x" id="close-icon"></i>
        </label>
        <div className="nav_links">
          <ul>
            <li>
              <a href="#Oscar Winners">Academy Awards</a>
            </li>
            <li>
              <a href="#Golden Globe Winners">Golden Globes</a>
            </li>
            {/* <li><a href='#BAFTA Winners'>BAFTA Awards</a></li> */}
            <li>
              <a href="#National Film Board Preserved">National Film Board</a>
            </li>
            <li>
              <a href="#Best Director">Best Director</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

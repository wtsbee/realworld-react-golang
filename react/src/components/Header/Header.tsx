import { useNavigate } from "react-router";

function Header() {
  const navigate = useNavigate();

  const signInClick = () => {
    navigate("/login");
  };

  const signUpClick = () => {
    navigate("/register");
  };

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <a className="navbar-brand" href="index.html">
          conduit
        </a>
        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <a className="nav-link active" href="">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="">
              {" "}
              <i className="ion-compose"></i>&nbsp;New Article{" "}
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="">
              {" "}
              <i className="ion-gear-a"></i>&nbsp;Settings{" "}
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={signInClick}>
              Sign in
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" onClick={signUpClick}>
              Sign up
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;

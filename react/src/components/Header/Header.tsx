import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { LoginState } from "../../redux/loginSlice";
import { RootState } from "../../redux/store";

function Header() {
  const login = useSelector((state: RootState) => state.login);

  return (
    <nav className="navbar navbar-light">
      <div className="container flex items-center justify-between">
        <a className="navbar-brand" href="index.html">
          conduit
        </a>
        <ul className="nav navbar-nav pull-xs-right">
          <NavItem text="Home" href="/" />
          {login.loginIn ? <UserLinks login={login} /> : <GuestLinks />}
        </ul>
      </div>
    </nav>
  );
}

function NavItem({
  text,
  href,
  icon,
}: {
  text: string;
  href: string;
  icon?: string;
}) {
  return (
    <li className="nav-item">
      <NavLink
        className={({ isActive }) => (isActive ? undefined : "text-gray-400")}
        to={href}
      >
        {icon && <i className={icon}></i>}&nbsp;
        {text}
      </NavLink>
    </li>
  );
}

function GuestLinks() {
  return (
    <>
      <NavItem text="Sing In" href="/login" />
      <NavItem text="Sign up" href="/register" />
    </>
  );
}

function UserLinks({ login: { user } }: { login: LoginState }) {
  return (
    <>
      <NavItem text="New Article" href="/editor" icon="ion-compose" />
      <NavItem text="Settings" href="/settings" icon="ion-gear-a" />
      <NavItem text={`${user.username}`} href={`/profile/${user.username}`} />
    </>
  );
}

export default Header;

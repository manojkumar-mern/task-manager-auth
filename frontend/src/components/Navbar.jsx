import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = ({ userInfo, setUserInfo }) => {
  const navigate = useNavigate();
  const isLoggedIn = !!userInfo?.token;

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUserInfo(null); 
    navigate("/login");
  };

  return (
    <nav className="nav">
      <div className="nav__container nav__grid">
        <div className="nav__left"></div>

        <Link to="/" className="nav__logo nav__logo--center">
          ✅ Task Manager
        </Link>

        <div className="nav__right nav__right--align">
          {isLoggedIn ? (
            <>
              <span className="nav__user">
                {userInfo?.user?.email || "User"}
              </span>

              <Link className="nav__link" to="/dashboard">
                Dashboard
              </Link>

              <button onClick={handleLogout} className="nav__btn nav__btn--out">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link className="nav__btn nav__btn--in" to="/login">
                Log in
              </Link>

              <Link className="nav__btn nav__btn--up" to="/register">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}    

export default Navbar;

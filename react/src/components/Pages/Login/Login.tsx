import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { startLoginIn } from "../../../redux/loginSlice";
import { RootState } from "../../../redux/store";

function Login() {
  const [input, setInput] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const navigate = useNavigate();

  const loginIn = useSelector((state: RootState) => state.login.loginIn);
  const dispatch = useDispatch();

  const onSignIn = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const params = {
      user: {
        email: input.email,
        password: input.password,
      },
    };
    try {
      const res = await axios({
        method: "post",
        url: `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        data: params,
      });
      localStorage.setItem("jwt", res.data.user.token);
      dispatch(startLoginIn(res.data));
      navigate("/");
      console.log(res.data);
    } catch (e) {
      alert(e);
    }
  };

  useEffect(() => {
    if (loginIn) {
      navigate("/");
    }
  }, []);

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center text-4.5xl my-2">Sign in</h1>
            <p className="text-xs-center my-4 text-green-10">
              <a href="">Need an account?</a>
            </p>

            <form>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={input.email}
                  onChange={handleChange}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={input.password}
                  onChange={handleChange}
                />
              </fieldset>
              <button
                type="submit"
                className="btn btn-lg btn-primary pull-xs-right bg-green-10"
                onClick={onSignIn}
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

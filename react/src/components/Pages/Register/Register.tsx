import axios from "axios";
import { useState } from "react";

function Register() {
  const [input, setInput] = useState({ username: "", email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const onSignUp = async () => {
    const params = {
      user: {
        username: input.username,
        email: input.email,
        password: input.password,
      },
    };
    const res = await axios({
      method: "post",
      url: `${import.meta.env.VITE_BACKEND_URL}/api/users`,
      data: params,
    });
    console.log(res.data);
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <a href="">Have an account?</a>
            </p>

            {/* <ul className="error-messages">
              <li>That email is already taken</li>
            </ul> */}

            <form>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={input.username}
                  onChange={handleChange}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  name="email"
                  onChange={handleChange}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                />
              </fieldset>
              <button
                type="button"
                className="btn btn-lg btn-primary pull-xs-right"
                onClick={onSignUp}
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;

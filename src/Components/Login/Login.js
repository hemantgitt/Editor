import React, { useState } from "react";
import { Signin } from "../../Services/AuthService";
import "./Login.css";
import { useNavigate, useParams } from 'react-router';


//login functionality
const Login = () => {
  const { assId, resId } = useParams();
  const initialState = {
    user: {
      resource_id: resId,
      password: "",
    },
  };

  const [user, setUser] = useState(initialState.user);

  const [errorMsg,setErrorMsg]=useState("");

  const navigate = useNavigate();

  const back=()=>{
    navigate(`/`);
  }


  //to input resource id
  const handleChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  //for on submit of login page
  const handleLogin = (e) => {
    e.preventDefault();
    Signin(user).then(
      () => {
        console.log("Logged in Successfully");
        alert("Logged in successfully");
        navigate(`/Default/${assId}/${resId}`);

      },
      error => {
        setErrorMsg("Please check Id or Password");
        console.log(error);
      });
  }


  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
           onClick={back}
          >
            &#60; Back
          </button>
        </div>
        <span className="img-login">
          <img
            src="/Images/blankpic.png"
            width="120px"
            height="120px"
            alt="No img"
          />
        </span>

        <div className="imgtext">
          <label htmlFor="resource_id" className="resource-id img-login">
            {resId}
          </label>
          <input
            type="text"
            value={resId}
            style={{display:"none"}}
            className="resource-id"
            id="resource_id"
            name="resource_id"
            required={true}
            onChange={handleChange}
          />
        </div>

        <div className="text">
          <p>Please enter your password here to continue</p>
        </div>

        <form onSubmit={handleLogin}>
          <label htmlFor="password"></label>
          <input
            type="text"
            className="input-wrapper"
            name="password"
            id="password"
            placeholder="Enter your password"
            required={true}
            onChange={handleChange}
          />
          <div className="error-msg">{errorMsg}</div>
          <div className="footer">
            <button id="cancelBtn">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;


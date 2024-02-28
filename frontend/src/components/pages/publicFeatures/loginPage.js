import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import getUserInfo from "../../../utilities/decodeJwt";

const PRIMARY_COLOR = "#0066ff"; 
const SECONDARY_COLOR = '#f0f0f0'; 
const TEXT_COLOR = '#d9d4d4'; 
const url = `${process.env.REACT_APP_BACKEND_SERVER_URI}/user/login`;

const Login = () => {
  const [user, setUser] = useState(null)
  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [bgColor, setBgColor] = useState(SECONDARY_COLOR);
  const navigate = useNavigate();

  let labelStyling = {
    color: TEXT_COLOR,
    fontWeight: "bold",
    textDecoration: "none",
  };
  let backgroundStyling = { 
    background: `url('https://www.shutterstock.com/image-photo/clear-rays-light-shining-through-260nw-10425574.jpg')`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };
  let buttonStyling = {
    background: PRIMARY_COLOR,
    borderStyle: "none",
    color: bgColor,
  };
  let formStyling = {
    backgroundColor: 'rgba(41, 40, 36, 0.5)',
    padding: '20px',
    borderRadius: '10px',
  };

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  useEffect(() => {

    const obj = getUserInfo(user)
    setUser(obj)

  }, );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: res } = await axios.post(url, data);
      const { accessToken } = res;
      //store token in localStorage
      localStorage.setItem("accessToken", accessToken);
      navigate("/willowdale");
      window.location.reload();
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  if(user) {
    navigate('/willowdale')
    return
  }

  return (
    <>
      <section className="vh-100">
        <div className="container-fluid h-custom vh-100">
          <div
            className="row d-flex justify-content-center align-items-center h-100 "
            style={backgroundStyling}>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <Form style={formStyling}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={labelStyling}>Username</Form.Label>
                  <Form.Control
                    type="username"
                    name="username"
                    onChange={handleChange}
                    placeholder="Enter username"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label style={labelStyling}>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Text className="text-muted pt-1">
                    <span style={{ color: '#d9d4d4' }}>Don't have an account?</span>
                    <span>
                      <Link to="/signup" style={labelStyling}> Sign up
                      </Link>
                    </span>
                  </Form.Text>
                </Form.Group>
                {error && <div style={labelStyling} className='pt-3'>{error}</div>}
                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleSubmit}
                  style={buttonStyling}
                  className='mt-2'
                >
                  Log In
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;

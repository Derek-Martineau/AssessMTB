import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const PRIMARY_COLOR = "#0066ff"; 
const SECONDARY_COLOR = '#f0f0f0'; 
const TEXT_COLOR = '#d9d4d4'; 
const url = `${process.env.REACT_APP_BACKEND_SERVER_URI}/user/signup`;
const Register = () => {
  const [data, setData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [bgColor, setBgColor] = useState(SECONDARY_COLOR);

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };


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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      alert(`Do not leave this page until registration is confirmed. ${url}`);
      const { data: res } = await axios.post(url, data);
      console.log(res);
      alert("Your account has been created.");

      // const {accessToken} = res
      //store token in localStorage
      navigate("/login");
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        alert(`Error: ${JSON.stringify(error.response.data)}  ${error.response.status} ${url}`);
        console.log(error.response.data);
      } else {
        // Something happened in setting up the request that triggered an Error
        alert(`${error.message}.  An error occured contacting ${url}`);
        console.log('Error', error.message);
      }
      setError("Something went wrong. Please try again.");
    }
  };

  return (
      <section className="vh-100">
        <div className="container-fluid h-custom vh-100">
          <div
            className="row d-flex justify-content-center align-items-center h-100 "
            style={backgroundStyling}
          >
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
                  <Form.Text className="text-muted">
                  <span style={{ color: '#d9d4d4' }}> Please enter your username </span>
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label style={labelStyling}>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="Enter email "
                  />
                  <Form.Text className="text-muted">
                  <span style={{ color: '#d9d4d4' }}> Please enter your email</span>
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label style={labelStyling}>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder=" Enter Password"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleSubmit}
                  style={buttonStyling}
                  className="mt-2"
                >
                  Register
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </section>
  );
};

export default Register;

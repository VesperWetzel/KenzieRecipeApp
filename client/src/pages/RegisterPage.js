import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import "../App.css"

const initialState = {
  email: "",
  password: "",
  confirmPassword: "",
};

const RegisterPage = () => {
  const [data, setData] = useState({ ...initialState, isSubmitting: false });
  const [errors, setErrors] = useState(initialState);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const form = e.target;
    e.preventDefault();

    setData((data) => ({
      ...data,
      isSubmitting: true,
    }));
    setErrors(initialState);

    form.checkValidity();

    const { email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      setData((data) => ({
        ...data,
        isSubmitting: false,
      }));
      setErrors({
        ...errors,
        password: "Passwords must match.",
      });
      return;
    }

    try {
      await signUp(email, password, confirmPassword);

      navigate("/");
    } catch (error) {
      console.log(error);
      setErrors({ ...error.data.errors });
      setData((data) => ({ ...data, isSubmitting: false }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value });
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            id="email"
            value={data.email}
            onChange={handleInputChange}
            isInvalid={errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            id="password"
            value={data.password}
            onChange={handleInputChange}
            isInvalid={errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label htmlFor="confirmPassword">Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={data.confirmPassword}
            onChange={handleInputChange}
            isInvalid={errors.confirmPassword}
          />
        </Form.Group>
        <Form.Group className="mb-5">
          <Button type="submit" variant="primary">
            Sign Up
          </Button>
        </Form.Group>
        <Form.Text>
          Already have an account? <Link to="/signin">Sign In.</Link>
        </Form.Text>
      </Form>
    </Container>
  );
};

export default RegisterPage;

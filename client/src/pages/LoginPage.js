import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const initialState = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const [data, setData] = useState({ ...initialState, isSubmitting: false });
  const [errors, setErrors] = useState(initialState);
  const { signIn } = useAuth();
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

    const { email, password } = data;

    try {
      await signIn(email, password);

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
        <Form.Group className="mb-5">
          <Button type="submit" variant="primary">
            Sign In
          </Button>
        </Form.Group>
        <Form.Text>
          Don't have an account? <Link to="/signup">Sign Up.</Link>
        </Form.Text>
      </Form>
    </Container>
  );
};

export default LoginPage;

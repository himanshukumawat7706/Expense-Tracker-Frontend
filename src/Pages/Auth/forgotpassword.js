import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// Example Link
import { Link } from "react-router-dom";
// ...
<Link to="/forgot-password">Forgot Password?</Link>
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/auth/forgotPassword",
        { email }
      );

      if (data.success) {
        toast.success(data.message, toastOptions);
      } else {
        toast.error(data.message, toastOptions);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.", toastOptions);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="text-center">Forgot Password</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail" className="mt-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Button
              type="submit"
              className="mt-3"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </Form>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
};

export default ForgotPassword;
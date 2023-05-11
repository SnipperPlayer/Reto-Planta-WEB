import React from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { validateUsername } from "../data/username";
import { validatePassword } from "../data/password";

import api from "../api";

function LoginForm({ updateCurrentUser }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [validation, setValidation] = React.useState({
    username: {
      validated: false,
      error: null,
    },
    password: {
      validated: false,
      error: null,
    },
  });
  const [loginError, setLoginError] = React.useState(null);
  const [userCreated, setUserCreated] = React.useState(false);

  React.useEffect(() => {
    if (username) validateOnlyUsername();
  }, [username]);
  React.useEffect(() => {
    if (password) validateOnlyPassword();
  }, [password]);

  return (
    <Form noValidate className="d-flex">
      {loginError && (
        <Form.Group className="me-2">
          <Alert as={Form.Text} className="py-1" variant="danger">
            {loginError}
          </Alert>
        </Form.Group>
      )}

      {userCreated && (
        <Form.Group className="me-2">
          <Alert as={Form.Text} className="py-1" variant="success">
            User created!
          </Alert>
        </Form.Group>
      )}

      <Form.Group className="me-2">
        <Form.Control
          type="text"
          placeholder="Username"
          isValid={validation.username.validated && !validation.username.error}
          isInvalid={validation.username.validated && validation.username.error}
          value={username}
          onChange={(e) => {
            e.preventDefault();
            setUsername(e.target.value);
          }}
        />
        <Form.Control.Feedback tooltip type="valid">
          Looks good!
        </Form.Control.Feedback>
        <Form.Control.Feedback tooltip type="invalid">
          {validation.username.error}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="me-2">
        <Form.Control
          type="password"
          placeholder="Password"
          isValid={validation.password.validated && !validation.password.error}
          isInvalid={validation.password.validated && validation.password.error}
          value={password}
          onChange={(e) => {
            e.preventDefault();
            setPassword(e.target.value);
          }}
        />
        <Form.Control.Feedback tooltip type="valid">
          Looks good!
        </Form.Control.Feedback>
        <Form.Control.Feedback tooltip type="invalid">
          {validation.password.error}
        </Form.Control.Feedback>
      </Form.Group>

      <Button onClick={onLogin} className="me-2">
        Login
      </Button>
      <Button onClick={onSignup}>Signup</Button>
    </Form>
  );

  //////////////////////////////////////////////////////////////////////////////

  function validateOnlyUsername() {
    setValidation((validation) => ({
      password: validation.password,
      username: {
        validated: true,
        error: validateUsername(username),
      },
    }));
  }

  function validateOnlyPassword() {
    setValidation((validation) => ({
      username: validation.username,
      password: {
        validated: true,
        error: validatePassword(password),
      },
    }));
  }

  function validateAll() {
    setValidation({
      username: {
        validated: true,
        error: validateUsername(username),
      },
      password: {
        validated: true,
        error: validatePassword(password),
      },
    });
  }

  function valid() {
    const validInfo =
      !validatePassword(password) && !validateUsername(username);
    validateAll();
    return validInfo;
  }

  function onLogin(e) {
    e.preventDefault();
    api.login({ username, password }).then(({ token, reason }) => {
      if (token) {
        console.trace("login success", { username, token });
        updateCurrentUser({ username, token });
      } else {
        console.trace("login failed", { username, reason });
        setLoginError(reason);
        setUserCreated(false);
      }
    });
  }

  function onSignup(e) {
    e.preventDefault();
    api.register({ username, password }).then(({ created }) => {
      if (created) {
        setUserCreated(true);
        setLoginError(null);
      }
      else {
        setLoginError("User already exists");
        setUserCreated(false);
      }
    });
  }
}

export function AppNav({
  currentUser,
  currentRoute,
  onNavigate,
  updateCurrentUser,
  onLogout,
}) {
  return (
    <>
      <Navbar expand="lg" fixed="top" bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand onClick={() => onNavigate({ route: "home" })}>
            Electro-Planta
          </Navbar.Brand>

          <Navbar.Toggle />

          <Navbar.Collapse className="justify-content-end">
            <Nav className="me-auto">
              {link("home", "Home")}
              {currentUser ? link("plants", "My Plants") : null}
            </Nav>

            {currentUser ? (
              <Button onClick={onLogout} variant="danger">
                Logout
              </Button>
            ) : (
              <LoginForm updateCurrentUser={updateCurrentUser} />
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );

  //////////////////////////////////////////////////////////////////////////////

  function link(route, title) {
    return (
      <Nav.Link
        onClick={() => onNavigate({ route })}
        className={currentRoute === route ? "active" : ""}
      >
        {title}
      </Nav.Link>
    );
  }
}

export default AppNav;

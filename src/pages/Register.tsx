// login page
// import CAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Message, Segment } from "semantic-ui-react";
import service from "../service";

declare global {
  interface Window {
    grecaptcha: any;
  }
}

const RegisterForm = () => {
  const [error, setError] = useState<any>();
  const onSubmit = (event: { preventDefault?: any; target?: any }) => {
    event.preventDefault();
    const { target } = event;

    service
      .register({
        username: target.username.value,
        email: target.email.value,
        password: target.password.value,
      })
      .then((res: any) => {
        target.username.value = "";
        target.password.value = "";
        target.email.value = "";
        setError(undefined);
        alert("Successfully registered!");
      })
      .catch((err) => {
        console.log(err);
        setError(err?.response.data);
      });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        // backgroundColor: "#CCE2FF",
        backgroundColor: "#0000FF",
      }}
    >
      <div
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: "25px",
          padding: "20px",
        }}
      >
        Register to your account
      </div>
      {error && (
        <Message
          error
          header={"Oops! Something went wrong, Please provide correct info!"}
          list={[
            error?.password?.[0] &&
              "Ensure password field has at least 8 characters.",
            error?.username?.[0],
            error?.email?.[0],
            error?.non_field_errors?.[0],
          ]}
        />
      )}

      <div style={{ width: "30%", backgroundColor: "white", padding: "25px" }}>
        <Form onSubmit={onSubmit}>
          <Form.Input
            required={true}
            name="username"
            label="Username"
            placeholder="Enter user name"
          />
          <Form.Input
            type="email"
            required={true}
            name="email"
            label="Email"
            placeholder="Enter email"
          />
          <Form.Input
            type="password"
            required={true}
            name="password"
            label="Password"
            placeholder="Enter password"
          />

          <Button primary type="submit" style={{ width: "100%" }}>
            Submit
          </Button>
        </Form>
        <Segment
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          Already have an account?&nbsp; <Link to="/login"> Signin</Link>
        </Segment>
      </div>
    </div>
  );
};

export default () => <RegisterForm />;

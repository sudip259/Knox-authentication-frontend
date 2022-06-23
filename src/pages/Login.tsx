// login page
// import CAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import CAPTCHA from "react-google-recaptcha";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Message, Segment } from "semantic-ui-react";
import service from "../service";

declare global {
  interface Window {
    grecaptcha: any;
  }
}

const LoginForm = () => {
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [captchaResult, setCaptchaResult] = useState();
  const onSubmit = (event: { preventDefault?: any; target?: any }) => {
    event.preventDefault();
    const { target } = event;

    service
      .login({
        username: target.username.value,
        password: target.password.value,
      })
      .then((res: any) => {
        target.username.value = "";
        target.password.value = "";
        setError(undefined);
        alert("Successfully login!");
        navigate("/dashboard");
      })
      .catch((err) => {
        setError(err?.response.data.non_field_errors?.[0]);
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
        backgroundColor: "#0000FF",
      }}
    >
      <div
        style={{
          color: "white",
          fontWeight: "bold",
          fontSize: "25px",
          padding: "25px",
        }}
      >
        Login to your account
      </div>
      {error && (
        <Message
          error
          header={
            "Please provide appropriate credentials to login to the system!"
          }
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
            type="password"
            required={true}
            name="password"
            label="Password"
            placeholder="Enter password"
          />

          <Button
            primary
            loading={loading}
            type="submit"
            style={{ width: "100%" }}
            disabled={captchaResult ? false : true}
          >
            Submit
          </Button>
          <div style={{ marginTop: "10px" }}>
            <CAPTCHA
              id="recaptcha-contact4"
              sitekey="6LdoLdwfAAAAAGlBXGP6bzyR82L9VWTwUbE9NPYb"
              onChange={(value: any) => {
                setLoading(true);
                fetch("http://127.0.0.1:8000/recaptcha/", {
                  method: "POST",
                  body: JSON.stringify({ captcha_value: value }),
                  headers: { "Content-Type": "application/json" },
                })
                  .then((res) => res.json())
                  .then((data) => {
                    // console.log(data.captcha.success);
                    setCaptchaResult(data.captcha.success);
                    setLoading(false);
                  })
                  .catch(() => {
                    setLoading(false);
                  });
              }}
            />
          </div>
        </Form>
        <Segment
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          New to us?&nbsp; <Link to="/register"> Signup</Link>
        </Segment>
      </div>
    </div>
  );
};

export default () => <LoginForm />;

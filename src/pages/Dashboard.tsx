import { useNavigate } from "react-router-dom";
import { Button } from "semantic-ui-react";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#0000FF",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          fontWeight: "bold",
          color: "white",
          fontSize: "25px",
          padding: "20px",
        }}
      >
        Welcome to dashboard!
      </div>
      <div>
        <Button
          onClick={() => navigate("/login")}
          style={{ backgroundColor: "white", color: "black", padding: "10px" }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default () => <Dashboard />;

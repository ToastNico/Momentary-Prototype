import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { auth } from "./firebase";
import Signup from "./Signup";
import Login from "./Login";
import WebcamPage from "./WebcamPage";
import Gallery from "./Gallery";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div style={{ textAlign: "center" }}>
        <h1>📸 Momentary</h1>
        <nav>
          {!user && (
            <>
              <Link to="/signup">Sign Up</Link> |{" "}
              <Link to="/login">Log In</Link>
            </>
          )}
          {user && (
            <>
              <Link to="/webcam">Camera</Link> |{" "}
              <Link to="/gallery">My Photos</Link> |{" "}
              <button onClick={() => auth.signOut()}>Log Out</button>
            </>
          )}
        </nav>

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/webcam" element={<WebcamPage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/" element={<div>Welcome to Momentary!</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
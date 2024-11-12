"use client";

import { useState } from "react";

interface User {
  email: string;
  image: string;
  name: string;
}

interface Session {
  user: User;
  expires: string;
}

const App = () => {
  const [user, setUser] = useState<Session | null>();
  const fetchData = async () => {
    const res = await fetch("http://localhost:3000/v1/api/sessions/google", {
      method: "POST",
    });
    console.log(res);
    window.location.href = res.url;
  };

  const fetchUser = async () => {
    const res = await fetch(`http://localhost:3000/v1/api/auth/session`, {
      method: "GET",
    });
    if (res.ok) {
      console.log("OK!!");
      const resJson = await res.json();
      console.log(resJson);
      // setUser(resJson);
    }
  };

  console.log(user);

  return (
    <div>
      <button onClick={fetchData}>login!!</button>
      <button onClick={fetchUser}>getUSER!!</button>
    </div>
  );
};

export default App;

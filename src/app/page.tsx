"use client";
import { escape } from "querystring";
import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:3000/v1/api/sessions/google", {
        method: "POST",
      });
      console.log(res);
      window.location.href = res.url;
    };

    fetchData();
  }, []);
};

export default App;

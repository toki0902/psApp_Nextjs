"use client";

import { useState } from "react";

interface User {
  socialId: string;
  image: string;
  name: string;
  userId: string;
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
      setUser(resJson);
    }
  };

  const sendCreatePlaylistRequest = async () => {
    const res = await fetch(
      `http://localhost:3000/v1/api/users/${user?.user.userId}/playlists/プレイリスト１`,
      {
        method: "POST",
      }
    );
    if (!res.ok) {
      const resJson = await res.json();
      console.error(resJson);
    } else {
      const resJson = await res.json();
      console.log(resJson);
    }
  };

  const sendCreatePlaylistMemberRequest = async () => {
    const res = await fetch(
      `http://localhost:3000/v1/api/users/${user?.user.userId}/playlists/プレイリスト１/videos/SKIROSBVJSK`,
      {
        method: "POST",
      }
    );
    if (!res.ok) {
      const resJson = await res.json();
      console.error(resJson);
    } else {
      const resJson = await res.json();
      console.log(resJson);
    }
  };

  const sendCreateAnotherPlaylistMemberRequest = async () => {
    const res = await fetch(
      `http://localhost:3000/v1/api/users/${user?.user.userId}/playlists/プレイリス3/videos/SKIROSBVJSK`,
      {
        method: "POST",
      }
    );
    if (!res.ok) {
      const resJson = await res.json();
      console.error(resJson);
    } else {
      const resJson = await res.json();
      console.log(resJson);
    }
  };

  console.log(user);

  return (
    <div>
      <button onClick={fetchData}>login!!</button>
      <button onClick={fetchUser}>getUSER!!</button>
      <button onClick={sendCreatePlaylistRequest}>
        send create playlist Request!!
      </button>
      <button onClick={sendCreatePlaylistMemberRequest}>
        send create playlistMember Request!!
      </button>
      <button onClick={sendCreateAnotherPlaylistMemberRequest}>
        send create another playlistMember Request!!
      </button>
    </div>
  );
};

export default App;

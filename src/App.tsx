import React, { useEffect, useState } from "react";
import {
  Anonymous,
  Authenticated,
  HttpService,
  UserService,
  useUserContext,
} from "@chiknrice/auth-js";

interface Message {
  content: string;
}

export function App() {
  const [message, setMessage] = useState<string>();
  const { user, error } = useUserContext();

  useEffect(() => {
    if (error) {
      alert(JSON.stringify(error));
    }
  }, [error]);

  return (
    <div>
      <h1>Hello {user?.preferredName || "guest"}</h1>
      <Authenticated>
        <ul>
          <li>username: {user?.id}</li>
          <li>given name: {user?.givenNames}</li>
          <li>surname: {user?.surname}</li>
          <li>email: {user?.email}</li>
          <li>userInfo: {JSON.stringify(user)}</li>
        </ul>
        <button onClick={() => UserService.logout()}>Logout</button>
      </Authenticated>
      <Anonymous>
        <button onClick={() => UserService.login()}>Login</button>
      </Anonymous>
      <button
        onClick={async () => {
          try {
            const response = await HttpService.get<Message>("/api/hello");
            setMessage(response.content);
          } catch (e) {
            if (e instanceof Error) {
              setMessage(`Error: ${e.message}`);
            } else {
              setMessage(`Unknown error: ${e}`);
            }
          }
        }}
      >
        Call Service
      </button>
      {message && <p>Server says: {message}</p>}
    </div>
  );
}

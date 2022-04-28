import React, { useEffect, useState } from "react";
import useFetch from "use-http";
import { Anonymous, Authenticated, useUserContext } from "@chiknrice/auth-js";

interface Response {
  message: string;
}

export function App() {
  const { isLoading, isAuthenticated, user, login, logout, error } =
    useUserContext();
  const { post, response, loading, error: fetchError } = useFetch<Response>();
  const [message, setMessage] = useState<string>();

  useEffect(() => {
    if (error) {
      alert(JSON.stringify(error));
    }
  }, [error]);

  const fetchMessage = async () => {
    const body = await post("/api/hello", { sender: "ian" });
    if (response.ok) setMessage(body.message);
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      {isAuthenticated && <p>Authenticated</p>}
      {!isAuthenticated && <p>Not Authenticated</p>}
      <h1>Hello {isAuthenticated ? user?.preferredName : "guest"}</h1>
      <Authenticated>
        <ul>
          <li>username: {user?.id}</li>
          <li>given name: {user?.givenNames}</li>
          <li>surname: {user?.surname}</li>
          <li>email: {user?.email}</li>
          <li>userInfo: {JSON.stringify(user)}</li>
        </ul>
        <button onClick={() => logout()}>Logout</button>
      </Authenticated>
      <Anonymous>
        <button onClick={() => login()}>Login</button>
      </Anonymous>
      <button onClick={fetchMessage} disabled={loading}>Call Service</button>
      {loading && <p>Loading...</p>}
      {!loading && !fetchError && message && <p>Server says: {message}</p>}
      {!loading && fetchError && (
        <p>Error calling backend: {JSON.stringify(fetchError)}</p>
      )}
    </div>
  );
}

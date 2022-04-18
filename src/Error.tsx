import React from "react";

export const Error: React.FC<{ message: string }> = ({ message }) => {
  return <div>Error encountered: {message}</div>;
};

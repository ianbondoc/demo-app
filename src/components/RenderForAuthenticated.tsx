import React, { PropsWithChildren } from "react";
import { UserService } from "../services";

export const RenderForAuthenticated: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  if (UserService.isAuthenticated()) {
    return <>{children}</>;
  } else {
    return null;
  }
};
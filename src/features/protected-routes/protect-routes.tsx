import React from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../../store.ts";

export const ProtectedAdminRoute = ({children}: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const role = useSelector((state: RootState) => state.authentication.role);

  if (role !== "ADMIN") {
    navigate("/");
  }

  if (role === "ADMIN") {
    return <>{children}</>;
  }
};

export const ProtectedIdentifiedRoute = ({children}: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const role = useSelector((state: RootState) => state.authentication.role);

  if (!role) {
    navigate("/");
  }

  if (role) {
    return <>{children}</>;
  }
};

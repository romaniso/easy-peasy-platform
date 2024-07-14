import React from "react";
import useTop from "../hooks/useTop";
import { Reset } from "../components/auth/Reset";

export const ResetPasswordPage: React.FC = () => {
  useTop();

  return (
    <section className="min-h-screen flex items-center justify-center">
      <Reset />
    </section>
  );
};

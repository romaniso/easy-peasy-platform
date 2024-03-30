import React from "react";
import useTop from "../hooks/useTop";
import { Link } from "react-router-dom";
import NotFoundImg from "../assets/images/not-found.png";

const ErrorPage: React.FC = () => {
  useTop();
  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-5 md:gap-7 text-center">
      <h1 className="text-5xl md:text-7xl text-orange-500 drop-shadow-md font-extrabold">
        404 - NOT FOUND
      </h1>
      <img
        src={NotFoundImg}
        alt="red cross"
        className="max-w-[150px] md:max-w-[200px] opacity-50"
      />
      <p className="text-xl md:text-2xl text-indigo-700 dark:text-indigo-300 drop-shadow-md font-semibold">
        The page you were looking for doesn't exist.
      </p>
      <p className="text-base md:text-lg text-indigo-700 dark:text-indigo-300">
        Try again or{" "}
        <Link to="/" className="font-bold underline text-orange-500">
          return to the home page
        </Link>
        .
      </p>
    </div>
  );
};

export default ErrorPage;

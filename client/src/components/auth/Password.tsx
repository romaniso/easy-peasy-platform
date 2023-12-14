import { useRef } from "react";
import Input from "../Input";

function Password({
                      children,
                      showPassword,
                      toggleShowPassword,
                      onChange,
                      ...rest
                  }) {
    const inputRef = useRef(null);
    const handleToggleShowPassword = () => {
        inputRef.current?.focus();
        toggleShowPassword();
    };

    const icon = (
        <button
            className="bi bi-eye-fill absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
            type="button"
            onClick={handleToggleShowPassword}
        >
      <span>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill={showPassword ? "#EB7F00" : "#163A95"}
            viewBox="0 0 16 16"
        >
          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
        </svg>
      </span>
        </button>
    );

    return (
        <Input
            name="userPassword"
            type={showPassword ? "text" : "password"}
            onChange={onChange}
            icon={icon}
            {...rest}
            ref={inputRef}
        >
            {children}
        </Input>
    );
}

export default Password;
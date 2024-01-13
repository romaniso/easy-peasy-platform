import React, {InputHTMLAttributes, ReactNode, useRef} from "react";
import Input from "../Input";

type PasswordRestProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'children' | 'showPassword' | 'onChange' | 'toggleShowPassword'>;

interface PasswordProps extends PasswordRestProps{
    children: ReactNode;
    showPassword?: boolean;
    primary?: boolean;
    secondary?: boolean;
    rounded?: boolean;
    outline?: boolean;
    name: string;
    toggleShowPassword?: () => void;
    onChange(value: string): void;

}

const Password: React.FC<PasswordProps> = ({
                      children,
                      showPassword,
                      toggleShowPassword,
                      onChange, name,
                      ...rest
                  }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const handleToggleShowPassword = () => {
        inputRef.current?.focus();
        if(toggleShowPassword){
            toggleShowPassword();
        }
    };


    const icon = toggleShowPassword ? (
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
            fill={showPassword ? "#EB7F00" : "#a5b4fc"}
            viewBox="0 0 16 16"
        >
          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
        </svg>
      </span>
        </button>
    )  : null;

    return (
        <Input
            name={name}
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
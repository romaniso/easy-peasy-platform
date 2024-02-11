import React, {InputHTMLAttributes, ReactNode, useCallback, useEffect, useRef, useState} from "react";
import Input from "../common/Input";

type PasswordRestProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'children' | 'showPassword' | 'onChange' | 'toggleShowPassword'>;

interface PasswordProps extends PasswordRestProps{
    children: ReactNode;
    primary?: boolean;
    secondary?: boolean;
    rounded?: boolean;
    outline?: boolean;
    name: string;
    previewEnabled?: true;
    onChange(value: string): void;
}

const Password: React.FC<PasswordProps> = ({
                      children,
                      // showPassword,
                      // toggleShowPassword,
                      onChange, name, previewEnabled,
                      ...rest
                  }) => {
    const [isPreviewed, setIsPreviewed] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const handleToggleShowPassword = useCallback(() => {
        if(previewEnabled){
            setIsPreviewed((prev) => {
                return !prev;
            })
            inputRef.current?.focus();
        }
    }, []);

    // const onToggle = useCallback(() => {
    //     setType(current => type === 'text' ? 'password' : 'text');
    //     // Setting focus here
    //     inputRef.current.focus();
    // }, []);
    useEffect(() => {
        // Moving cursor to the end
        if(!inputRef.current) return;
        inputRef.current.selectionStart = inputRef.current.value.length;
        inputRef.current.selectionEnd = inputRef.current.value.length;
    }, [isPreviewed]);

    const icon = previewEnabled ? (
        <button
            className="bi bi-eye-fill absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
            type="button"
            onMouseDown={handleToggleShowPassword}
            onMouseUp={handleToggleShowPassword}
        >
      <span>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill={isPreviewed ? "#EB7F00" : "#a5b4fc"}
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
            type={isPreviewed ? "text" : "password"}
            onChange={onChange}
            icon={icon}
            {...rest}
            // ref={inputRef => inputRef && inputRef.focus()}
            // onFocus={(e)=>e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
            ref={inputRef}
        >
            {children}
        </Input>
    );
}

export default Password;
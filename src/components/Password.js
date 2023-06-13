import { useRef } from "react";

function Password({ showPassword, toggleShowPassword, value, onChange }) {
  const inputRef = useRef(null);
  const handleToggleShowPassword = () => {
    inputRef.current?.focus();
    toggleShowPassword();
  };

  return (
    <div className="mt-6 relative">
      <input
        className=" p-2 rounded-xl border w-full focus:outline-none focus:border-[#EB7F00] transition-colors peer"
        ref={inputRef}
        type={showPassword ? "text" : "password"}
        required
        id="userPassword"
        name="userPassword"
        value={value}
        onChange={onChange}
      />
      <label
        className="absolute left-3 top-1/2 -translate-y-1/2 text-[#163A95] cursor-text peer-focus:text-xs peer-focus:-top-3 peer-focus:left-0 peer-focus:text-[#EB7F00] peer-valid:text-xs peer-valid:-top-3 peer-valid:left-0 peer-valid:text-[#EB7F00] transition-all duration-500"
        htmlFor="userPassword"
      >
        Password
      </label>
      <button
        className="bi bi-eye-fill absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
        type="button"
        onClick={handleToggleShowPassword}
      >
        <span>
          {" "}
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
    </div>
  );
}

export default Password;

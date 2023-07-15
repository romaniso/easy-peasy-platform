import { projectAuth } from "../firebase/config";

let error = null;

const signUp = async (email, password) => {
  error = null;

  try {
    const res = await projectAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    if (!res) {
      throw new Error("Something went wrong");
    }
  } catch (err) {
    error = err.message;
    console.log(error);
  }
};

const userSignUp = () => {
  return { error, signUp };
};

export default userSignUp;

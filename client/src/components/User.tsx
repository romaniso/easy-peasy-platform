class User {
  constructor(email, name, password, rememberMe, newUser = true) {
    this.email = email;
    this.name = name;
    this.password = password;
    this.rememberMe = rememberMe;
    this.newUser = newUser;
  }
}

export default User;

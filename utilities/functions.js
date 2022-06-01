export const validateError = (errorCode) => {
  switch (errorCode) {
    case "auth/email-already-in-use":
      return "Email is already in use";
    case "auth/weak-password":
      return "Your password is too weak or is less than 6 characters long";
    case "auth/user-disabled":
      return "This user account has been disabled";
    case "auth/user-not-found":
      return "Email does not match any user";
    case "auth/wrong-password":
      return "Wrong password";
    default:
      return "";
  }
};

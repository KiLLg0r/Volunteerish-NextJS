export const validateError = (errorCode) => {
  switch (errorCode) {
    case "auth/invalid-email":
      return {
        type: "email",
        error: "Invalid email",
      };
    case "auth/email-already-in-use":
      return {
        type: "email",
        error: "Email is already in use",
      };
    case "auth/weak-password":
      return {
        type: "password",
        error: "Your password is too weak or is less than 6 characters long",
      };
    case "auth/user-disabled":
      return {
        type: "email",
        error: "This user account has been disabled",
      };
    case "auth/user-not-found":
      return {
        type: "email",
        error: "Email does not match any user",
      };
    case "auth/wrong-password":
      return {
        type: "password",
        error: "Wrong password",
      };
    default:
      return "";
  }
};

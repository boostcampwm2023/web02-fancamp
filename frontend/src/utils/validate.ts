export const validateSign = {
  isEmailOk: (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@([a-zA-Z0-9.-]+\.)+[a-zA-Z]{2,}$/;
    const result = emailRegex.test(email);
    return result;
  },
  isPasswordOk: (password: string) => {
    const result = password.length >= 4 && password.length <= 20;
    return result;
  },
};

export const validateMessageInputText = (inputText: string) => {
  const trimedInputText = inputText.trim();
  if (trimedInputText.length === 0) {
    return false;
  }
  if (trimedInputText.length >= 36) {
    return false;
  }
  return true;
};

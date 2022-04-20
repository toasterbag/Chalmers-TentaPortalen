import { isSome, None, Option, Some } from "@app/std/option";

const minLength = (password: string): Option<string> => {
  const length = 12;
  if (password.length < length) {
    return Some(`Password has to be at least ${length} characters.`);
  }
  return None;
};
const maxLength = (password: string): Option<string> => {
  const length = 64;
  if (password.length > length) {
    return Some(`Password can not be longer than ${length} characters.`);
  }
  return None;
};
const requireUppercaseLetters = (password: string) => {
  if (password.length < 24 && !/[A-Z]/.test(password)) {
    return Some("Passwords must include uppercase letters.");
  }
  return None;
};
const requireLowercaseLetters = (password: string) => {
  if (password.length < 24 && !/[a-z]/.test(password)) {
    return Some("Passwords must include lowercase letters.");
  }
  return None;
};
const requireDigits = (password: string) => {
  if (password.length < 24 && !/[0-9]/.test(password)) {
    return Some("Passwords must include digits.");
  }
  return None;
};
const requireSpecialCharacters = (password: string) => {
  if (password.length < 24 && !/[^A-Za-z0-9]/.test(password)) {
    return Some("Passwords must include special characters.");
  }
  return None;
};

export const validatePassword = (password: string): Array<string> =>
  [
    minLength,
    maxLength,
    requireUppercaseLetters,
    requireLowercaseLetters,
    requireDigits,
    requireSpecialCharacters,
  ]
    .map((fn) => fn(password))
    .filter(isSome)
    .map((res) => res.val);

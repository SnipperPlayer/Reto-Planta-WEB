export function validatePassword (password) {
  function fail (message) {
    return message;
  }

  if (password === null || password === undefined) throw new Error('password is required');
  if (typeof password !== 'string') throw new Error('password must be a string');
  if (password.length < 8) return fail('Must be at least 8 characters long');
  if (password.length > 128) return fail('Must be at most 128 characters long');
}

export default validatePassword;

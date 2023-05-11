export function validateUsername (username) {
  function fail (msg) {
    return msg;
  }

  if (username === undefined || username === null) throw new Error('username is required');
  if (typeof username !== 'string') throw new Error('username must be a string');
  if (username.length < 3) return fail('Must be at least 3 characters long');
  if (username.length > 30) return fail('Must be at most 30 characters long');
  if (!/^[a-zA-Z0-9_\-]+$/.test(username)) return fail('Must only contain alphanumeric characters, underscores, and dashes');
}

export default validateUsername;

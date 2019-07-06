const connectionURI =
  process.env.DATABASE_URL || 'postgres://localhost:5432/sep';

module.exports = { connectionURI };

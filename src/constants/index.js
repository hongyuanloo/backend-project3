const ROLES = { ADMIN: "admin", USER: "user" };

const REFRESH_TOKEN_LIFESPAN = 60 * 60; // in seconds
const ACCESS_TOKEN_LIFESPAN = 60 * 60; // in seconds

module.exports = { ROLES, REFRESH_TOKEN_LIFESPAN, ACCESS_TOKEN_LIFESPAN };

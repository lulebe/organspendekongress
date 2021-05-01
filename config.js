module.exports = {
  DB_USER: process.env.DB_USER || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || "testpw",
  PORT: process.env.PORT || 8888,
  COOKIE_SECRET: process.env.COOKIE_SECRET || "testsecret",
  ADMIN_PW: process.env.ADMIN_PW || "test",
  MJ_APIKEY_PUBLIC: process.env.MJ_PUB || "",
  MJ_APIKEY_PRIVATE: process.env.MJ_PRIV || "",
  production: process.env.NODE_ENV === "production"
}
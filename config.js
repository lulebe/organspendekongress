module.exports = {
  DB_USER: process.env.DB_USER || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || "testpw",
  PORT: process.env.PORT || 8888,
  COOKIE_SECRET: process.env.COOKIE_SECRET || "testsecret",
  ADMIN_PW: process.env.ADMIN_PW || "test",
  MJ_APIKEY_PUBLIC: process.env.MJ_PUB || "",
  MJ_APIKEY_PRIVATE: process.env.MJ_PRIV || "",
  production: process.env.NODE_ENV === "production",
  vapid: process.env.VAPID || 'BDDG1SbhV0RKqN86R2v7B7FKAYeMdCtDQYM71jLvB_Ttr60rPCzOCPHbrKdakmS67CTCBw9MjzgKsD2zF-lRcPM',
  vapidPrivate: process.env.VAPID_PRIVATE || '7vG_BDqsnuLAtDB1jvBBrz1eGqZqwTEyaKeYwLMWkiY'
}
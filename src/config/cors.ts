const corsConfig = {
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.CORS_ALLOWED_FROM.split(",")
      : "*",
};

export { corsConfig };

const baseURLs = {
  development: "http://localhost:3000/api/v1/",
  staging: "",
  production: "",
  test: "",
};

const baseURL = baseURLs[process.env.NODE_ENV || "development"];

export default baseURL;

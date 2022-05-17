const app = require("./app");

app.listen(app.get("port"), () => {
  console.log(`App ${app.get("name")} listening on port ${app.get("port")}`);
});
const passport = require("passport");
const cookieParser = require("cookie-parser");
exports.isAuth = (req, res, done) => {
  return passport.authenticate("jwt");
};

exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtractor = function (req) {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDdjNGNmYWRiYjgzZjkyYThjMTdiMyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxMjIwMjc0M30.zmwQTjOXd0Ao36C41388MVwO0PSsCGt7Gx5FyyMapiQ";
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDZkOGMxNmI0ZGYwOTkzMjBlMjE1NCIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzEyMTIxNDUyfQ.0iUKdRXvOoNjlfO603tXzCd5IeHU3SoyV9Nof0cywpE";
  return token;
};

const passport = require("passport");
const config = require("./environment");
const GoogleStrategy = require("passport-google-token").Strategy;
const { Strategy, ExtractJwt } = require("passport-jwt");
const User = require("../models").user;
const Company = require("../models").company;
const Role = require("../enums/roles.enum");
const Token = require("../models").token;
const StatusUser = require("../enums/status.user.enum");

function jwtStrategy() {
  var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.secret
  };

  passport.use(
    new Strategy(opts, async (token, done) => {
      let user;
      let userId;
      if (token.type !== config.jwt.refresh.type) {
        userId = token.id;
      } else {
        const tokenId = await Token.findOne({ tokenId: token.id });
        if (tokenId) {
          userId = tokenId.userId;
        } else {
          return done(null, false);
        }
      }
      if (token.role === Role.Executor) {
        user = await Company.findById(userId);
      } else {
        user = await User.findById(userId);
      }
      const data = user;
      if (data) {
        return done(null, data);
      } else {
        return done(null, false);
      }
    })
  );
}

function googleStrategy() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id }).then(user => {
          if (user) {
            done(null, user);
          } else {
            new User({
              name: profile.name.givenName,
              surname: profile.name.familyName,
              email: profile.emails[0].value,
              status: StatusUser.verified,
              role: Role.Customer,
              googleId: profile.id
            })
              .save()
              .then(user => {
                done(null, user);
              });
          }
        });
      }
    )
  );
}

module.exports = {
  initialize: () => passport.initialize(),
  authenticateJwt: () => passport.authenticate("jwt", { session: false }),
  authenticateGoogle: () =>
    passport.authenticate("google-token", {
      session: false,
      scope: ["profile", "email"],
      state: "myState"
    }),
  jwtStrategy,
  googleStrategy
};

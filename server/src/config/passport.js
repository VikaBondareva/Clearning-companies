const passport = require("passport");
const config = require("./environment");
const GitHubStrategy = require("passport-github").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const VKontakteStrategy = require("passport-vkontakte").Strategy;
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
        userId = tokenId.userId;
      }
      if (token.role === Role.Executor) {
        user = await Company.findById(userId);
      } else {
        user = await User.findById(userId);
      }
      // const data = user.toObject();
      const data = user;
      console.log(data);
      if (data) {
        return done(null, data);
      } else {
        return done(null, false);
      }
    })
  );
}

function githubStrategy() {
  passport.use(
    new GitHubStrategy(
      {
        clientID: config.github.clientID,
        clientSecret: config.github.clientSecret,
        callbackURL: `/api/auth/github/redirect`
      },
      (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        User.findOne({ githubId: profile.id }).then(user => {
          if (user) {
            console.log(`user is: ${user}`);
            done(null, user);
          } else {
            new User({
              username: profile.username,
              name: "",
              surname: "",
              role: Role.Customer,
              status: StatusUser.verified,
              githubId: profile.id,
              email: profile.emails[0].value
            })
              .save()
              .then(user => {
                console.log(`new user: ${user}`);
                done(null, user);
              });
          }
        });
      }
    )
  );
}

function googleStrategy() {
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: `/api/auth/google/redirect`
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id }).then(user => {
          if (user) {
            console.log(`user is: ${user}`);
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
                console.log(`new user: ${user}`);
                done(null, user);
              });
          }
        });
      }
    )
  );
}

function vkontakteStrategy() {
  passport.use(
    new VKontakteStrategy(
      {
        clientID: config.vkontakte.clientID,
        clientSecret: config.vkontakte.clientSecret,
        callbackURL: `/api/auth/vk/redirect`
      },
      (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        User.findOne({ vkontakteId: profile.id }).then(user => {
          if (user) {
            console.log(`user is: ${user}`);
            done(null, user);
          } else {
            new User({
              name: profile.name.givenName,
              surname: profile.name.familyName,
              email: profile.emails[0].value,
              status: StatusUser.verified,
              role: Role.Customer,
              vkontakteId: profile.id
            })
              .save()
              .then(user => {
                console.log(`new user: ${user}`);
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
  authenticateGithub: () =>
    passport.authenticate("github", {
      session: false,
      scope: ["profile", "email"]
    }),
  authenticateGoogle: () =>
    passport.authenticate("google", {
      session: false,
      scope: ["profile", "email"],
      state: "myState"
    }),
  authenticateVkontakte: () =>
    passport.authenticate("vkontakte", { session: false, scope: ["email"] }),
  jwtStrategy,
  githubStrategy,
  googleStrategy,
  vkontakteStrategy
};

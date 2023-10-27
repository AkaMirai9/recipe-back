import passport from 'passport';
import passportJwt from 'passport-jwt';
import MockedUser from '../model/const/mocked-user';

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
};

passport.use(new JwtStrategy(jwtOptions, (jwtPayload, done) => {
    const user = MockedUser.find(user => user.id === jwtPayload.id);
    if (user) {
        done(null, user);
    } else {
        done(null, false);
    }
}));

export default passport;

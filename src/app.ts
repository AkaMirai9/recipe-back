import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import http from 'http';
import recipes from "./routes/recipes";
import cors from 'cors'
import passport from "./auth/passport";
import passportJwt from "passport-jwt";
import MockedUser from "./model/const/mocked-user";
import auth from "./routes/auth";

const app = express();

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

app.use('/auth', auth);
app.use('/recipes', recipes);

const httpServer  = http.createServer(app);

httpServer.listen(8000, () => {
    console.log('Listening on port 8000');
})

module.exports = app;

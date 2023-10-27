import express from 'express';
import jwt from 'jsonwebtoken';
import mockedUser from "../model/const/mocked-user";

const router = express.Router();

router.post('/login', (req, res, next) => {
    const { username, password } = req.body;

    if (mockedUser.find((user) => user.username === username)?.password === password) {
        const token = jwt.sign({ username }, 'votre_clé_secrète');
        return res.json({ token });
    } else {
        res.status(401).json({
            message: "Informations de connections erronées"
        })
    }
});

export default router;

import { verifyToken } from "../util/jwtUtil.js";

const authentication = (req, res, next) => {

    console.log(req.cookies)
    const { token } = req.cookies

    if (!token) {
        res.status(401).json("Unauthorized");
        res.end();
    } else {
        const user = verifyToken(token);

        if (!user) {
            res.status(401).json("Unauthorized");
            res.end();
        } else {
            req.user = {
                id: user.id,
                isAdmin: user.isAdmin
            };
    
            res.cookie("token", token, { 
                maxAge: process.env.EXPIRES_IN * 1000,
                secure: true,
                httpOnly: true
            })
            next();
        }
    }
};

const verifyUser = (req, res, next) => {
    authentication(req, res, next, () => {
        if(req.user.id === req.body.author || req.user.isAdmin){
            next();
        } else {
            res.status(401).json("You should login as your user account or admin");
        }
    })
}

export { authentication, verifyUser }
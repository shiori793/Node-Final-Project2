import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET_KEY = process.env.SECRET_JWT_KEY;
const EXPIRES_IN = process.env.EXPIRES_IN;

function generateToken(payload) {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN + 's' })
}

function verifyToken (token) {
    return jwt.verify(token, SECRET_KEY)
}

export { generateToken, verifyToken }
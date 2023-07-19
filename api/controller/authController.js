import User from "../model/User.js";
import { hashPassword, comparePassword } from "../util/passwordUtil.js";
import { generateToken } from "../util/jwtUtil.js";

const registerController = (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    User.findOne({
      $or: [
            { email : email },
            { username: username }
          ]
    })
    .then((err, foundUser) => {
      if(!err){
        if(foundUser){
          res.status(400).json("Username or Email already exists!");
        } else {
          
          const hashedPassword = hashPassword(password);

          hashedPassword.then(async (hashedPassword) => {
            const newUser = new User({
              ...req.body,
              password: hashedPassword,
            });
            await newUser.save();
            res
              .status(200)
              .header('Content-Type', 'application/json')
              .json('User created');
          });
        }
      } else {
        res.status(400).json(err);
      }
    })
  } catch (error) {
    res.status(400).json(err);
  }
};

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email : email });
    if (!user){
      res.status(400).json("Invalid email");
    } else {
        
      const compareResult = comparePassword(password, user.password);

      compareResult.then((compared) => {
        if (!compared) {
          res.status(400).json("Invalid password");
        }

        const token = generateToken({
          id: user._id,
          isAdmin: user.isAdmin
        });

        res
          .cookie("token", token, { httpOnly: true, maxAge: process.env.EXPIRES_IN * 1000 })
          .status(200)
          .header('Content-Type', 'application/json')
          .json({
            id: user._id,
            username: user.username,
            isAdmin: user.isAdmin
          })
      })
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const logoutController = (req, res) => {
  res.
    cookie("token", '')
    .status(200)
    .header('Content-Type', 'application/json')
    .json('Successfully log out');
}

export { registerController, loginController, logoutController };

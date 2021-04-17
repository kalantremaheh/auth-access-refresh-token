const createError = require("http-errors");
const User = require("../Models/User.model");
const { authSchema } = require("../helpers/validation_schema");
const {
  singAccessToken,
  singRefreshToken,
  verifyRefreshToken,
} = require("../helpers/jwt_helper");
const client = require("../helpers/inti_redis");


module.exports = {
    register:async (req, res, next) => {
        console.log(req.body);
        try {
          // const { email, password} = req.body
          // if(!email || !password) throw createError.BadRequest()
          const result = await authSchema.validateAsync(req.body);
          console.log(result);
      
          const doesExist = await User.findOne({ email: result.email });
          if (doesExist)
            throw createError.Conflict(`${result.email} is alreay been register`);
      
          const user = new User(result);
          const saveUser = await user.save();
          const accessToken = await singAccessToken(saveUser.id);
          const refreshToken = await singRefreshToken(saveUser.id);
          res.send({ accessToken, refreshToken });
      
        } catch (error) {
          if (error.isJoi === true) error.status = 422;
          next(error);
        }
      },

      login: async (req, res, next) => {
        try {
          const result = await authSchema.validateAsync(req.body);
      
          const user = await User.findOne({ email: result.email });
          if (!user) throw createError.NotFound("User not register");
      
          const isMatch = await user.isValidPassword(result.password);
          if (!isMatch) throw createError.Unauthorized("Username/password not valid");
      
          const accessToken = await singAccessToken(user.id);
          const refreshToken = await singRefreshToken(user.id);
      
          res.send({ accessToken, refreshToken });
        } catch (error) {
          if (error.isJoi === true)
            return next(createError.BadRequest("Invalid Username/Password"));
          next(error);
        }
      },

      refreshToken: async (req, res, next) => {
        try {
          const { refreshToken } = req.body;
          if (!refreshToken) throw createError.BadRequest();
          const userId = await verifyRefreshToken(refreshToken);
      
          const accessToken = await singAccessToken(userId);
          const refToken = await singRefreshToken(userId);
      
          res.send({ accessToken: accessToken, refreshToken: refToken });
        } catch (error) {
          next(error);
        }
    },
    
    logout: async (req, res, next) => {
        try {
          const { refreshToken } = req.body;
          if (!refreshToken) throw createError.BadRequest();
          const userId = await verifyRefreshToken(refreshToken);
          client.DEL(userId, (err, value) => {
            if (err) {
              console.log(err.message);
              throw createError.InternalServerError();
            }
            console.log(value)
            res.sendStatus(204)
          });
        } catch (error) {
          next(error);
        }
        res.send("logout route");
      }
}
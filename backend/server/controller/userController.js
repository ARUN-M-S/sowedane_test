require("dotenv").config();
const UserModel = require("../model/userSchema");
const TokenModel = require("../model/tokenSchema");
const bcrypt = require("bcrypt");
const { validate, loginValidation } = require("../util/validationSchema");
const sendEmail = require("../util/sendEmail");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const registration = async (req, res) => {
  console.log(process.env.BASE_URL);
  console.log( req.body,"call is her");
  try {
    const { firstName, lastName, phone, email, password } = req.body;
    const data = { firstName, lastName, phone, email, password };
    const user = await UserModel.findOne({ email: email });
    if (user) {
      res.status(409).send({ error: "User already exists" });
    } else {
      const { error } = validate(data);
      if (error) {
        const message = error.details[0].message;
        res.status(400).send({ error: message });
      } else {
        const hashedPw = await bcrypt.hash(password, 12);
        const registerUser = new UserModel({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phone: req.body.phone,
          email: req.body.email,
          password: hashedPw,
        });
        const user = await registerUser.save();

        const token = await new TokenModel({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex"),
        }).save();
        console.log(process.env.BASE_URL);
        const url = `${process.env.BASE_URL}user/${user._id}/verify/${token.token}`;
        await sendEmail(user.email, "Verify Email", url);

        res.status(201).send({
          message: "An Email send to your account please verify",
          user: user,
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};

const verification = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send({ error: "Invalid Link" });

    const token = await TokenModel.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).send({ error: "Invalid Link" });

    await UserModel.updateOne({ _id: user._id, verified: true });
    await token.remove();

    res.status(200).send({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!user.verified) {
        let token = await TokenModel.findOne({ userId: user._id });
        if (!token) {
          const token = await new TokenModel({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
          }).save();
          const url = `${process.env.BASE_URL}user/${user._id}/verify/${token.token}`;
          await sendEmail(user.email, "Verify Email", url);
        }
        return res
          .status(400)
          .send({ message: "An Email send to your account please verify" });
      }

      if (isMatch) {
        let tokens = jwt.sign(
          { _id: this._id, role: "user" },
          process.env.SECRET_KEY
        );
        res.cookie("jwtoken", tokens, {
          expiresIn: "1h",
          httpOnly: true,
        });
        return res
          .status(200)
          .send({
            user,
            message: "Logged in successfully",
            token: tokens,
            user: user,
          });
      }
    } else {
      res.status(401).send({ error: "Invalid login details" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
const userProfile = async(req,res)=>{
  const id=req.params.id
  const userDetails= await UserModel.findOne({_id:id });
  res.status(200).json(userDetails)

}
const updateProfile=async(req,res)=>{
  const data=req.body
  const id = req.params.id
  // const userUpdate= await UserModel.findByIdAndUpdate({_id:id},{firstName:data.firstname,lastName:data.lastname,phone:data.phone})
  const userUpdate= await UserModel.findByIdAndUpdate(id,{firstName:data.firstname,lastName:data.lastname,phone:data.phone})
  
 res.status(201).send({message:"Updated Successfully"})
}

module.exports = { registration, login, verification,userProfile,updateProfile };

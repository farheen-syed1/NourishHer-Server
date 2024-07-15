const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../Models/userModel');
const dotenv = require('dotenv');
dotenv.config();
const secretKey = process.env.secretKey;

const register = async (req, res) => {
    let user = req.body;

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return res.status(500).send({ message: "Error while generating Salt" });
        }

        bcrypt.hash(user.password, salt, async (err, hashedPassword) => {
            if (err) {
                return res.status(500).send({ message: "Error while hashing password" });
            }

            user.password = hashedPassword;

            try {
                let newUser = await userModel.create(user);
                res.status(201).send({ message: "User Registered", user: newUser });
            } catch (err) {
                console.error(err);
                res.status(500).send({ message: "Error while registering user" });
            }
        });
    });
};


const login =async (req, res) => {
    let userCred = req.body;

    try {
        const user = await userModel.findOne({ email: userCred.email });

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        bcrypt.compare(userCred.password, user.password, (err, isMatch) => {
            if (err) {
                return res.status(500).send({ message: "Error while comparing passwords" });
            }

            if (isMatch) {
                jwt.sign({ email: userCred.email }, secretKey, (err, token) => {
                    if (err) {
                        return res.status(500).send({ message: "Error while generating token" });
                    }

                    res.send({
                        message: "Login Success",
                        token: token,
                        userid: user._id,
                        name: user.name
                    });
                });
            } else {
                res.status(403).send({ message: "Incorrect password" });
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Some Problem while login" });
    }
}


console.log(secretKey,"secretkey")
module.exports = {
    register,
    login
};

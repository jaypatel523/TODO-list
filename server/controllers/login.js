const User = require('../models/user');
const validator = require('validator');
const bcrypt = require('bcryptjs');


const emailValidation = (email) => {
    return validator.isEmail(email);
}

const usernameValidation = (username) => {
    if (!validator.isAlphanumeric(username)) return false;
    return true;
}




const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                res.send({ msg: "Login Successfull", user: user })
            }
            else {
                throw new Error('password didn\'t match');
            }
        }
        else {
            throw new Error('please do register first');
        }
    } catch (error) {
        console.log(error);
        res.send({ msg: error.message });
    }



}

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!usernameValidation(username)) {
            throw new Error('please provide a valid username');
        }
        if (!emailValidation(email)) {
            throw new Error('please provide a valid email');
        }
        if (password.length < 1) {
            throw new Error('please provide a valid password');
        }

        const dbemail = await User.findOne({ email: email });
        const dbusername = await User.findOne({ username: username });

        if (dbemail) {
            res.send({ msg: 'user already registered' });
        }
        else if (dbusername) {
            res.send({ msg: 'this username is not available' });
        }
        else {
            if (username && password) {
                const newUser = new User(req.body);
                await newUser.save();
                res.send({ msg: 'registered successfully', newUser });
            }
            else {
                res.send({ msg: 'please provide proper creadentials' })
            }
        }
    }
    catch (error) {
        res.send({ msg: 'something went wrong' });
    }
}


const logout = async (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            expires: new Date(0)
        }).send({ msg: 'logout success' });
    }
    catch (error) {
        console.log({ msg: error });
    }
}


module.exports = { login, register, emailValidation, logout };
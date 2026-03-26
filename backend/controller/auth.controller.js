import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import handleError from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { name, email, password, adminJoinCode } = req.body;

    if (!name || !email || !password) {
        return next(handleError(400, 'All fields are required'));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(handleError(409, 'User already exists'));
    }

    let role = 'user';

    if (
        adminJoinCode &&
        adminJoinCode.trim() === process.env.ADMIN_JOIN_CODE
    ) {
        role = 'admin';
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        username: name,
        email,
        password: hashedpassword,
        role
    });

    try {
        await newUser.save();
        return res.status(201).json({
            success: true,
            role,
            message: 'User registered successfully'
        });
    } catch (error) {
        return next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password || email === '' || password === '') {
            return next(handleError(400, 'All fields are required'));
        }

        const user = await User.findOne({ email });
        if (!user) {
            return next(handleError(404, 'User not found'));
        }
        //compare password
        const validpassord = await bcrypt.compare(password, user.password)
        if (!validpassord) {
            return next(handleError(401, 'Invalid password'));
        }
        
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);

        const { password: pass, ...rest } = user._doc

        res.status(200).cookie("access_token", token, { httpOnly: true })
            .json({ rest,token,role:user.role, success: true, message: 'Login successfull' });
    }
    catch (error) {
        return next(error);
    }
}

export const userProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return next(handleError(404, 'User not found'));
        }
        const { password: pass, ...rest } = user._doc;

        res.status(200).json({ rest })

    } catch (error) {
        return next(error);
    }
}

export const updateUserProfile = async (req, res, next) => {
    try {
        const { email, name } = req.body;

        const user = await User.findById(req.user.id)

        if (!user) {
            return next(handleError(404, "User not found "))
        }

        user.username = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            user.password = await bcrypt.hash(req.body.password, 10);
        }

        const updatedUser = await user.save()
        const { password: pass, ...rest } = user._doc

        return res.status(200).json(rest)

    }
    catch (error) {
        return next(error)
    }
}

export const signout = async (req, res, next) => {
    try {
        res
            .clearCookie("access_token")
            .status(200)
            .json("User successfully logged out")
    } catch (error) {
        return next(error)
    }
}
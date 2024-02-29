import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from 'jsonwebtoken';

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body;

        // validations
        if (!name) {
            return res.status(400).send({ message: "Name is required" })
        }
        if (!email) {
            return res.status(400).send({ message: "Email is required" })
        }
        if (!password) {
            return res.status(400).send({ message: "Password is required" })
        }
        if (!phone) {
            return res.status(400).send({ message: "Phone is required" })
        }
        if (!address) {
            return res.status(400).send({ message: "Address is required" })
        }

        // Check of existing user on the basis of email
        const userExist = await userModel.findOne({ email })

        if (userExist) {
            return res.status(200).send({
                success: false,
                message: "already registered please login",
            })
        }

        const hashpassword = await hashPassword(password);

        // save
        const user = await new userModel({ name, email, password: hashpassword, phone, address, answer }).save();

        res.status(201).send({
            success: true,
            message: "user registered successfully",
            user
        })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Registeraion error",
            error
        })
    }
}


export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body

        // validations
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Error in email or password"
            })
        }
        // check user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email not registered"
            })
        }

        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(201).send({
                success: false,
                message: "Invalid password"
            })
        }

        // Token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '4d' });

        res.status(201).send({
            success: true,
            message: "User logged in successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token
        })

    } catch (error) {
        console.log(error);
        res.status(400).send({
            success: false,
            message: "Error in login",
            error
        })
    }
}

// forgot password 
export const forgotpasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;

        if (!email) {
            res.status(400).send({ message: "email is required" });
        }

        if (!answer) {
            res.status(400).send({ message: "answer is required" });
        }

        if (!newPassword) {
            res.status(400).send({ message: "newPassword is required" });
        }

        const user = await userModel.findOne({ email, answer })

        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong Email or Password"
            })
        }

        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, { password: hashed });
        res.status(201).send({
            success: true,
            message: "Password reset successfully"
        })

    } catch (error) {
        console.group(error);
        res.status(404).send({
            success: false,
            message: "something went wrong",
            error
        })
    }
}


// test controller
export const testController = async (req, res) => {
    console.log("Protected Route");
    await res.status(201).send({
        message: "Inside protected route"
    })
}


// update User
export const updateProfileController = async (req, res) => {
    try {
        const { name, email, password, address, phone } = req.body;
        const user = await userModel.findById(req.user._id);

        // password
        if (password && password.length < 6) {
            return res.json({ error: "Password is required and 6 character long" })
        }

        const hashed = password ? await hashPassword(password) : undefined

        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            password: hashed || user.password,
            phone: phone || user.phone,
            address: address || user.address,

        }, { new: true })


        res.status(201).send({
            success: true,
            message: "user updated successfully",
            updatedUser,
        })

    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            message: "Error while updating user",
        })
    }
}


// get all users controller
export const getallusersContoller = async (req, res) => {
    try {
        const Allusers = await userModel.find({});

        res.status(201).send({
            success: true,
            message: "All users fetched successfully",
            Allusers,
            totalCount: Allusers.length,

        })

    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            message: "Error while getting all users",
        })
    }
}


// delete user
export const deleteUserController = async (req, res) => {
    try {
        const { id } = req.params
        const category = await userModel.findByIdAndDelete(id);

        res.status(201).send({
            success: true,
            message: "delete user controller",
            category

        })

    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error while deleting category "
        })
    }
}
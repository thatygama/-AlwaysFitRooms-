const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const UserController = {
    getAllUsers: async (req, res) => {
        try {
          const users = await User.findAll();
    
          return res.status(200).json(users);
        } catch (error) {
          console.error('Error:', error);
          return res.status(500).json({ message: 'Error' });
        }
      },
    getUserById: async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findByPk(userId);

        if (!user) {
        return res.status(404).json({ message: 'User not found!' });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Error' });
    }
    },
    createUser: async (req, res) => {
        const { name, email, password, permission } = req.body;

        try {
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ error: "Email already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = await User.create({
                name,
                email,
                password: hashedPassword,
                permission: permission || 2
            });

            res.status(201).json({ message: "User created successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    },

    loginUser: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(401).json({ error: "Authentication failed. Please check that all the data entered is correct. " });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ error: "Authentication failed. Please check that all the data entered is correct. " });
            }

            const token = jwt.sign({ userId: user.id }, "your-secret-key", {
                expiresIn: "1h"
            });

            res.cookie("jwt", token, { httpOnly: true, secure: true, sameSite: "strict" });
            res.json({ message: "Authentication successful" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
};

module.exports = UserController;

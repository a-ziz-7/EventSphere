import db from "../db/db.js";
import bcrypt from "bcrypt";

// Helper function to hash passwords
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Authentication Middleware
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).send("Unauthorized");
  }
};

// User registration endpoint
export const registerUser = async (req, res) => {
  const { user_name, first_name, last_name, email, phone, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await db.query(
      'SELECT * FROM "user" WHERE user_name = $1 OR email = $2',
      [user_name, email]
    );
    if (existingUser.rows.length > 0) {
      return res.status(400).send("User already exists.");
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Insert the new user into the database
    await db.query(
      'INSERT INTO "user" (user_name, first_name, last_name, email, phone, password) VALUES ($1, $2, $3, $4, $5, $6)',
      [user_name, first_name, last_name, email, phone, hashedPassword]
    );

    res.status(201).send(req.body);
  } catch (err) {
    console.error("Error registering user:", err.stack);
    res.status(500).send("Server error.");
  }
};

// User login endpoint
export const loginUser = async (req, res) => {
  const { user_name, password } = req.body;

  try {
    // Find the user by username
    const result = await db.query('SELECT * FROM "user" WHERE user_name = $1', [
      user_name,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).send("Invalid credentials.");
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid credentials.");
    }

    req.session.user = {
      id: user.id,
      user_name: user.user_name,
      first_name: user.first_name,
      last_name: user.last_name,
    };

    res.send(req.session.user);
    console.log("Login Successful");
  } catch (err) {
    console.error("Error logging in:", err.stack);
    res.status(500).send("Server error.");
  }
};

// User logout endpoint
export const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Failed to logout.");
    }
    res.clearCookie("connect.sid"); // Clear session cookie
    res.send("Logout successful.");
  });
};

export { isAuthenticated };

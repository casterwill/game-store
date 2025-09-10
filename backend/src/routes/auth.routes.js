import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { prisma } from "../prisma.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

const router = express.Router();
let saltRounds = 10;

const JWT_SECRET = process.env.JWT_SECRET || "singkongbakarkeju";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "udangbakarbalado";

const createAccessToken = (user) => {
  return jwt.sign(
    { userId: user.id, role: user.role }, // simpan role di token
    JWT_SECRET,
    { expiresIn: "15m" }
  );
};

const createRefreshToken = async (user) => {
  const refreshToken = jwt.sign({ userId: user.id }, JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });
  await prisma.refreshToken.create({
    data: {
      token: refreshToken,
      userId: user.id,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      revoked: false,
    },
  });
  return refreshToken;
};

// Register
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });
    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ error: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(401).json({ error: "Incorrect password" });

    const accessToken = createAccessToken(user);
    const refreshToken = await createRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/refresh_token", async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    const payload = jwt.verify(token, JWT_REFRESH_SECRET);
    const savedToken = await prisma.refreshToken.findUnique({
      where: { token },
    });

    if (!savedToken || savedToken.revoked || savedToken.expiresAt < new Date())
      return res.status(401).json({ error: "Invalid token" });

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    const newAccessToken = createAccessToken(user);
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
});

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(401).json({ error: "Invalid or expired token" });
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ error: "No token provided" });
  }
};

// Example of a protected route
router.get("/protected", authenticateJWT, (req, res) => {
  res.json({ message: `You are authorized user ${req.user.userId}`, user: req.user });
});

export default router;

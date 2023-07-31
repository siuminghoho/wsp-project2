import { Router } from "express";
import { memoRoute } from "./routes/memoRoutes";
import { authRoute } from "./routes/authRoutes";
import { userRoute } from "./routes/userRoutes";

export const router = Router();

router.use("/memos", memoRoute);
router.use("/auth", authRoute);
router.use("/user", userRoute);

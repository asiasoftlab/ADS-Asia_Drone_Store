import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { userRoutes } from "./Routes/user/userRoutes.ts";
import { userController } from "./Controllers/user/userControllers.ts";
import { userRepository } from "./Repository/user/userRepository.ts";
import { userService } from "./Service/user/userService.ts";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const userRepo = new userRepository();
const userSvc = new userService(userRepo);
const userCtrl = new userController(userSvc);
const userRouter = new userRoutes(userCtrl);

app.use("/", userRouter.getUserRoutes());


const PORT = process.env.PORT || 7878;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
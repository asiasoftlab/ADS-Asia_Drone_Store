import { Router } from "express";
import { AdminController } from "./admin.controller.ts";
import { adminMiddleware } from "../../Middleware/authMiddleware.ts";

export class AdminRoutes {
    private router: Router;
    private adminController: AdminController;

    constructor() {
        this.router = Router();
        this.adminController = new AdminController();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        // Admin login does not require token
        this.router.post("/login", this.adminController.login);

        // Protected routes
        this.router.get("/dashboard", adminMiddleware, this.adminController.getDashboard);
    }

    public getAdminRoutes(): Router {
        return this.router;
    }
}

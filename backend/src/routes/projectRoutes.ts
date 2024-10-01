import { Router } from "express";
import { listProjects, postProject } from "../controllers/ProjectController";

const router = Router();

router.get("/", listProjects);
router.get("/:id", listProjects);
router.post("/", postProject);

export default router;

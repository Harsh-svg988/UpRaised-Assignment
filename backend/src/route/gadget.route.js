import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
    createGadget,
    getAllGadgets,
    updateGadget,
    decommissionGadget,
    selfDestruct,
} from "../controllers/gadget.controller.js";

const router = express.Router();

router.use(protectRoute);

router.route("/").get(getAllGadgets).post(createGadget);

router.route("/:id").patch(updateGadget).delete(decommissionGadget)

router.route("/:id/self-destruct").post(selfDestruct);

export default router;
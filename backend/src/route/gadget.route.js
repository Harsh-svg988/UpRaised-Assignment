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

// router.use(protectRoute);
/**
 * @swagger
 * components:
 *   schemas:
 *     Gadget:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique identifier for the gadget
 *         name:
 *           type: string
 *           description: Name of the gadget
 *         status:
 *           type: string
 *           enum: [Available, Deployed, Destroyed, Decommissioned]
 *           description: Status of the gadget
 *         codeName:
 *           type: string
 *           description: Unique code name for the gadget
 *         successRate:
 *           type: number
 *           format: float
 *           description: Mission success probability for the gadget
 *         decommissionedAt:
 *           type: string
 *           format: date-time
 *           nullable: true
 *           description: Timestamp when the gadget was decommissioned
 */

/**
 * @swagger
 * /gadgets:
 *   get:
 *     summary: Retrieve a list of all gadgets
 *     tags: [Gadgets]
 *     responses:
 *       200:
 *         description: A list of gadgets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Gadget'
 */

/**
 * @swagger
 * /gadgets:
 *   post:
 *     summary: Add a new gadget to the inventory
 *     tags: [Gadgets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Gadget'
 *     responses:
 *       201:
 *         description: Gadget created successfully
 */

/**
 * @swagger
 * /gadgets/{id}:
 *   patch:
 *     summary: Update an existing gadget's information
 *     tags: [Gadgets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The gadget ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Gadget'
 *     responses:
 *       200:
 *         description: Gadget updated successfully
 */

/**
 * @swagger
 * /gadgets/{id}:
 *   delete:
 *     summary: Decommission a gadget
 *     tags: [Gadgets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The gadget ID
 *     responses:
 *       200:
 *         description: Gadget decommissioned successfully
 */

/**
 * @swagger
 * /gadgets/{id}/self-destruct:
 *   post:
 *     summary: Trigger the self-destruct sequence for a gadget
 *     tags: [Gadgets]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The gadget ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               confirmationCode:
 *                 type: string
 *                 description: Confirmation code to authorize self-destruct
 *     responses:
 *       200:
 *         description: Gadget self-destructed successfully
 */

router.route("/").get(getAllGadgets).post(createGadget);

router.route("/:id").patch(updateGadget).delete(decommissionGadget)

router.route("/:id/self-destruct").post(selfDestruct);

export default router;
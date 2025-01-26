import Gadget from "../models/gadget.model.js";

// List of cool spy gadget codenames
const codenameList = [
    'The Nightingale', 
    'The Phantom Shadow', 
    'The Black Mirage', 
    'The Silent Specter', 
    'The Ghost Hawk', 
    'The Crimson Viper', 
    'The Silver Serpent', 
    'The Midnight Falcon', 
    'The Stealth Wolf', 
    'The Arctic Wolf'
];

// Generating codename from the list
async function generateCodename() {
    const randomIndex = Math.floor(Math.random() * codenameList.length);
    return codenameList[randomIndex];
}

// Get All Gadgets
export const getAllGadgets = async (req, res) => {
    try {
        const { status } = req.query;
        const whereClause = status ? { status } : {};

        const gadgets = await Gadget.findAll({ where: whereClause });
        res.status(200).json(gadgets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create Gadget
export const createGadget = async (req, res) => {
    try {
        const { name } = req.body;
        const codeName = await generateCodename();
        const successRate = Math.floor(Math.random() * 41) + 60;

        const gadget = await Gadget.create({
            name,
            codeName,
            status: "Available",
            successRate,
        });

        res.status(201).json(gadget);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Gadget
export const updateGadget = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, status } = req.body;

        const gadget = await Gadget.findByPk(id);

        if (!gadget) {
            return res.status(404).json({ error: "Gadget not found" });
        }

        await gadget.update({ name, status });
        res.status(200).json(gadget);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Gadget
export const decommissionGadget = async (req, res) => {
    try {
        const { id } = req.params;

        const gadget = await Gadget.findByPk(id);

        if (!gadget) {
            return res.status(404).json({ error: "Gadget not found" });
        }

        await gadget.update({
            status: "Decommissioned",
            decommissionedAt: new Date(),
        });

        res.status(200).json(gadget);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Self Destruct Gadget
export const selfDestruct = async (req, res) => {
    try {
        const { id } = req.params;
        const { confirmationCode } = req.body;

        const expectedCode = Math.random().toString(36).substring(7);

        if (confirmationCode !== expectedCode) {
            return res.status(400).json({
                message: "Invalid confirmation code",
                expectedCode,
            });
        }

        const gadget = await Gadget.findByPk(id);
        if (!gadget) {
            return res.status(404).json({ error: "Gadget not found" });
        }

        await gadget.update({ status: "Destroyed" });
        res.status(200).json({ message: "Gadget self-destructed successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

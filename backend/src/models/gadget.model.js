import { Sequelize } from "sequelize";
import { sequelize } from "../lib/db.js";

const Gadget = sequelize.define('Gadget', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM(["Available", "Deployed", "Destroyed", "Decommissioned"]),
        defaultValue: 'Available'
    },
    codeName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    successRate: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    decommissionedAt: {
        type: Sequelize.DATE,
        allowNull: true
    }
})

export default Gadget;
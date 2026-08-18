import { Counter } from "../models/counter.model.js";

const generateSequenceId = async (name, prefix, digits = 4) => {
    const counter = await Counter.findOneAndUpdate(
        { name },
        { $inc: { sequence: 1 } },
        {
            new: true,
            upsert: true
        }
    );

    return `${prefix}${String(counter.sequence).padStart(digits, "0")}`;
};

export default generateSequenceId;
import mongoose from "mongoose";

const webhookSchema = new mongoose.Schema(
    {
        eventId: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        eventType: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const Webhook = mongoose.model("Webhook", webhookSchema)
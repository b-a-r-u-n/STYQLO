

const verifyShiprocketWebhook = (req, res, next) => {

    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {

        return res.status(401).json({
            success: false,
            message: "Missing webhook API key"
        });
    }

    if ( apiKey !== process.env.SHIPROCKET_WEBHOOK_SECRET) {

        return res.status(401).json({
            success: false,
            message: "Invalid webhook API key"
        });
    }

    next();
};

export { verifyShiprocketWebhook }
import express from "express";
import { Product } from "../models/product.model.js";

const router = express.Router();

router.get("/sitemap.xml", async (req, res) => {
  try {
    const products = await Product.find()
      .select("slug updatedAt")
      .lean();

    const staticUrls = [
      "https://styqlo.com/",
      "https://styqlo.com/products",
      "https://styqlo.com/about",
      "https://styqlo.com/contact",
      "https://styqlo.com/faq",
      "https://styqlo.com/size-guide",
      "https://styqlo.com/shipping-policy",
      "https://styqlo.com/return-policy",
      "https://styqlo.com/privacy-policy",
      "https://styqlo.com/terms",
      "https://styqlo.com/disclaimer",
    ];

    const staticUrlXml = staticUrls
      .map(
        (url) => `
    <url>
        <loc>${url}</loc>
    </url>`
      )
      .join("");

    const productUrls = products
      .filter((product) => product.slug)
      .map(
        (product) => `
    <url>
        <loc>https://styqlo.com/product/${product.slug}</loc>
        ${
          product.updatedAt
            ? `<lastmod>${new Date(product.updatedAt).toISOString()}</lastmod>`
            : ""
        }
    </url>`
      )
      .join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrlXml}
${productUrls}
</urlset>`;

    res
      .status(200)
      .set("Content-Type", "application/xml")
      .send(sitemap);
  } catch (error) {
    console.error("Sitemap generation error:", error);

    res
      .status(500)
      .send("Unable to generate sitemap");
  }
});

export default router;
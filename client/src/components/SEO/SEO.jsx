import { Helmet } from "react-helmet-async";

const SITE_URL = "https://styqlo.com";
const SITE_NAME = "STYQLO";

const SEO = ({
    title,
    description,
    canonical,
    image,
    noIndex = false,
    children
}) => {
    const canonicalUrl = canonical
        ? `${SITE_URL}${canonical}`
        : SITE_URL;

    return (
        <Helmet>
            <html lang="en" />

            <title>{title}</title>

            <meta
                name="description"
                content={description}
            />

            <meta
                name="robots"
                content={
                    noIndex
                        ? "noindex, nofollow"
                        : "index, follow"
                }
            />

            <link
                rel="canonical"
                href={canonicalUrl}
            />

            {/* Open Graph */}
            <meta
                property="og:type"
                content="website"
            />

            <meta
                property="og:title"
                content={title}
            />

            <meta
                property="og:description"
                content={description}
            />

            <meta
                property="og:url"
                content={canonicalUrl}
            />

            <meta
                property="og:site_name"
                content={SITE_NAME}
            />

            {image && (
                <meta
                    property="og:image"
                    content={image}
                />
            )}

            {/* Twitter */}
            <meta
                name="twitter:card"
                content="summary_large_image"
            />

            <meta
                name="twitter:title"
                content={title}
            />

            <meta
                name="twitter:description"
                content={description}
            />

            {image && (
                <meta
                    name="twitter:image"
                    content={image}
                />
            )}

            {children}
        </Helmet>
    );
};

export default SEO;
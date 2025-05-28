export const isStaticPath = (path) => {
    const staticPrefixes = [
        "/_next",
        "/images",
        "/favicon.ico",
        "/robots.txt",
        "/webmanifest.json",
    ];

    // Check if it starts with a known static prefix
    if (staticPrefixes.some((prefix) => path.startsWith(prefix))) {
        return true;
    }

    // Check file extensions using regex
    const staticFilePattern = /\.(png|jpe?g|svg|gif|webp|ico|css|js|woff2?|ttf|eot|map)$/i;
    return staticFilePattern.test(path);
};
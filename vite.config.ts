import path from "path";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
    plugins: [svgr(), react()],
    resolve: {
        alias: {
            "@api": path.resolve(__dirname, "./src/api"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@context": path.resolve(__dirname, "./src/context"),
            "@domains": path.resolve(__dirname, "./src/domains"),
            "@hooks": path.resolve(__dirname, "./src/hooks"),
            "@router": path.resolve(__dirname, "./src/router"),
            "@services": path.resolve(__dirname, "./src/services"),
            "@pages": path.resolve(__dirname, "./src/pages"),
            "@layouts": path.resolve(__dirname, "./src/layouts"),
            "@utils": path.resolve(__dirname, "./src/utils"),
            "@store": path.resolve(__dirname, "./src/store"),
            "@assets": path.resolve(__dirname, "./src/assets"),
            "@app-types": path.resolve(__dirname, "./src/app-types"),
            "@design-system": path.resolve(__dirname, "./src/design-system"),
        },
    },
});

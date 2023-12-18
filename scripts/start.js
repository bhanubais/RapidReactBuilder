import * as esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";
import { devServerConfig } from "../config/devServerConfig.js";

const isDevelopment = process.env.NODE_ENV !== "production";

async function start() {
  let ctx = await esbuild.context({
    entryPoints: [devServerConfig.entryFile], // Entry file from config
    outdir: devServerConfig.outDir, // Output directory from config
    bundle: true,
    // Include any other configurations from devServerConfig if necessary
    minify: !isDevelopment,
    sourcemap: isDevelopment,
    plugins: [sassPlugin()],
    define: {
      "process.env.NODE_ENV": `"${process.env.NODE_ENV}"`
    }
  });

  let { host, port } = await ctx.serve({
    servedir: devServerConfig.outDir // Serve directory from config
  });

  console.log(
    `Server running at ${devServerConfig.protocol}://${host}:${port}/`
  );
}

start().catch((e) => console.error(e));

import esbuild from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
const docsDir = path.resolve('docs');

fs.mkdirSync(docsDir, { recursive: true });

// Read the compiled Tailwind CSS emitted by `vite build`
const assetsDir = path.join(distDir, 'assets');
const cssFile = fs.readdirSync(assetsDir).find((name) => name.endsWith('.css'));
if (!cssFile) {
  throw new Error('Could not find compiled CSS file in dist/assets. Run `npm run build` first.');
}
const compiledCss = fs.readFileSync(path.join(assetsDir, cssFile), 'utf8');

// Bundle the React app as a self-contained IIFE script with inline data-URL assets
const result = await esbuild.build({
  entryPoints: [path.resolve('src/main.tsx')],
  bundle: true,
  minify: true,
  write: false,
  format: 'iife',
  platform: 'browser',
  target: ['es2020'],
  jsx: 'automatic',
  loader: {
    '.jpg': 'dataurl',
    '.jpeg': 'dataurl',
    '.png': 'dataurl',
    '.webp': 'dataurl',
    '.svg': 'dataurl',
    '.css': 'empty',
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
});

const bundledJs = result.outputFiles[0].text.replace(/<\/script/gi, '<\\/script');

const html = `<!doctype html>
<html lang="en" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Yuki Ayasawa</title>
    <meta name="description" content="Personal presentation card of Yuki Ayasawa." />
    <meta property="og:title" content="Yuki Ayasawa" />
    <meta property="og:description" content="Personal presentation card of Yuki Ayasawa." />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700&family=JetBrains+Mono:wght@400;500&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <style>${compiledCss}</style>
  </head>
  <body>
    <div id="root"></div>
    <script>${bundledJs}</script>
  </body>
</html>
`;

fs.writeFileSync(path.join(docsDir, 'index.html'), html, 'utf8');
fs.writeFileSync(path.join(docsDir, '.nojekyll'), '', 'utf8');
console.log(`Built standalone single-file page at docs/index.html (${(html.length / 1024).toFixed(1)} kB)`);

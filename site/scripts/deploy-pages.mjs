// Publish dist-pages/ to the gh-pages branch of this repository (GitHub Pages review preview).
// Run via `npm run deploy:pages`, which builds first. The branch holds build output only and is
// replaced on every deploy; source history stays on main.
import { execFileSync } from 'node:child_process';
import { existsSync, rmSync } from 'node:fs';
import path from 'node:path';

const site = path.resolve(import.meta.dirname, '..');
const out = path.join(site, 'dist-pages');
if (!existsSync(path.join(out, 'index.html'))) throw new Error('dist-pages/index.html missing: run npm run build:pages');

const git = (args, cwd = out) => execFileSync('git', args, { cwd, stdio: ['ignore', 'pipe', 'inherit'] }).toString().trim();
const remote = git(['remote', 'get-url', 'origin'], site);
const source = git(['rev-parse', '--short', 'HEAD'], site);

rmSync(path.join(out, '.git'), { recursive: true, force: true });
git(['init', '-q', '-b', 'gh-pages']);
git(['add', '-A']);
git(['-c', 'user.name=Tech Transpire preview', '-c', 'user.email=preview@users.noreply.github.com', 'commit', '-q', '-m', `Review preview built from ${source}`]);
git(['push', '-q', '--force', remote, 'gh-pages']);
rmSync(path.join(out, '.git'), { recursive: true, force: true });
console.log(`Deployed review preview (from ${source}) to gh-pages: https://himanshu-1-1.github.io/Tech-Transpire/`);

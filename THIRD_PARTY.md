# Third-party software

This source bundle excludes node_modules and Electron binaries. `npm ci` downloads packages pinned by package-lock.json. Packaged binaries built from it include Electron/Chromium and their own license notices.

- Electron: https://github.com/electron/electron — MIT; Chromium and bundled components have additional notices shipped with Electron.
- electron-builder: https://github.com/electron-userland/electron-builder — MIT (build-time tooling).
- Ghostery adblocker: https://github.com/ghostery/adblocker — MPL-2.0. This app uses the local filtering engine, not Ghostery's browser extension/service. No Ghostery endorsement is implied.
- EasyList / EasyPrivacy: https://easylist.to — GPL v3-or-later or CC BY-SA 3.0 dual-license. Used under GPL terms here; see filters/SOURCES.md.

All transitive dependencies retain their respective copyright and license terms. Review the downloaded dependency tree and include applicable notices/source obligations in any redistributed build. No affiliation with YouTube, GitHub, Wikipedia, Reddit, DuckDuckGo, Mozilla, Google or any browser vendor is implied.

## Vendored icons

Selected Lucide interface icons: ISC license; see `ui/licenses/lucide.txt`. Selected Simple Icons brand marks: CC0-1.0; see `ui/licenses/simple-icons.txt`. Brand/trademark rights remain with their owners; icon licensing does not grant endorsement or trademark rights. Sources and hashes are recorded in `ui/licenses/sources.json`. These assets are local and are not fetched while browsing.

- resedit and pe-library: https://github.com/jet2jet/resedit-js and https://github.com/jet2jet/pe-library-js — MIT, build-time Windows PE resource tooling only.

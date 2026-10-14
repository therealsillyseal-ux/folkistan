# Folkistan 0.1.4 — Windows-first experimental browser

A real Electron/Chromium desktop browser shell, with a restrained animated interface. This is runnable starter source, **not an audited replacement for Chrome, Firefox, Brave or Edge**. Windows execution and end-to-end updating have not been manually verified. Do not use for banking, sensitive accounts or untrusted extensions.

## Windows installer and updates

Install `Folkistan-Setup-0.1.4-x64.exe` from this repository’s GitHub Releases. It bundles the runtime and does not need Node.js. Older portable versions need this one-time manual installation. Subsequent published versions are checked after 30 seconds and every six hours while the installed app runs; downloads happen in the background, but installing always requires confirmation to restart. Turn off automatic checks in Settings; manual checks remain available. See UPDATES.md. It is unsigned and has not been run on Windows. Do not disable Windows protections to launch it. The source workflow below is provided for review and development.

## Run source on Windows 10/11 (64-bit)

1. Install the current **Node.js LTS** from https://nodejs.org (include npm).
2. Extract this entire ZIP to a folder you own. Do not run from inside the ZIP.
3. Double-click **Start-Folkistan.cmd**. First launch uses `npm ci` to download the pinned dependencies and Electron from their distribution servers. It may take a few minutes.
4. Alternatively, open PowerShell in the extracted folder:

```powershell
npm ci
npm test
npm start
```

No admin access should be required. If your managed computer prohibits scripts or installations, ask your administrator; do not bypass its security controls.

## Build an unsigned Windows installer

Run **Build-Windows.cmd**, or:

```powershell
npm ci
npm test
npm run build:win
```

Output: `release/Folkistan-Setup-0.1.4-x64.exe`. The installer bundles the Electron runtime, not a tiny native executable. It is unsigned; Windows may warn. Do not disable SmartScreen or antivirus. Source review, code signing and security testing are prerequisites for distributing this as a trusted browser. A Windows folder build is also available with `npm run build:win:folder`.

## What works in the source

- Real website tabs, back/forward/reload, search/address bar, link opening, context menu.
- First-run onboarding: theme, full/compact sidebar, search provider, blocking, tab sleeping, optional bookmark import. Preferences stay local.
- DuckDuckGo search by default; Brave Search and Google are optional choices. Dark mode by default, with light/system alternatives.
- Collapsible sidebar using the header button; native website bounds adjust with it. Full sidebar: 208px. Compact: 64px. Sidebar and toolbar share one background, without a vertical dividing edge.
- Compact tabs center the site icon; the upper-right audio control mutes/unmutes without activating the tab. A muted-speaker indicator remains available to unmute. Close appears in the upper-left on hover or keyboard focus. Controls also work in full-width mode.
- Per-tab mute preferences persist across sleep/wake and profile restoration. Known website marks are bundled locally; other sites use a generic globe rather than an external favicon service.
- Vertical tabs; right-click a tab to pin/unpin. Close buttons; Ctrl+T/W/L/R/Tab; F5.
- Lazy session restore: only the active restored page is loaded.
- Automatic sleeping after 5/10/20 minutes; manual rest for inactive tabs. Active, pinned, loading and audible tabs are exempt. Reloading a sleeping tab loses its DOM, navigation stack, scroll position and unsaved form data.
- Ad/tracker network and cosmetic filtering enabled by default, using a local Ghostery filtering engine and bundled EasyList/EasyPrivacy. Does not require a Ghostery account or service. No remote filter updates at runtime.
- Local bookmarks; HTML bookmark import (Firefox, Zen, Chrome, Brave, Edge and other browsers that export standard Netscape bookmark HTML). Chromium Bookmarks JSON import also supported.
- Experimental unpacked Chromium extension loading, removal, and restoration. Not full Chrome Web Store or Firefox extension support. Extension popups and browser-action UI are not implemented. Some APIs may conflict with the blocker.
- Light, dark and system themes; short CSS transitions; respects reduced-motion settings.
- Sandboxed, isolated website renderers with no Node/preload bridge from this app; browser controls in a separate local session. Explicit IPC sender checks; remote content cannot directly issue browser commands.
- Default certificate validation; no ignore-certificate flags or bypass UI. Downloads require choosing a save location and are never automatically opened.
- Local warnings for HTTP, punycode domains and IP-address URLs; blocks URL credentials and non-HTTP(S) navigation.

## Important limits

**Not a true Chromium fork.** Electron is a practical prototype host. It has a significant bundled runtime, and its maintainers explicitly caution about arbitrary untrusted web content. These defensive settings are not a security audit. Full Chrome extension compatibility would require another substantial architecture/engineering phase.

**Not a phishing-reputation service.** Address heuristics do not detect most phishing. No Safe Browsing feed, download malware scanner, breach checker, publisher-signed auto-updater, password manager, browser sync, or encrypted profile is supplied. Do not interpret HTTPS or the blocker icon as a safety guarantee.

**No “import everything” claim.** Passwords, history, cookies, live sessions, extensions and browser profiles are not imported. No other browser's encrypted data is accessed.

**No guaranteed ad-free YouTube.** YouTube changes frequently. The bundled lists cannot promise to block its ads. GPU acceleration is left enabled, but video performance, codecs, DRM/Widevine services, streaming logins and hardware compatibility are not verified on Windows. Camera, microphone, location, notifications, Bluetooth/USB and screen capture are denied; calls and screen sharing are therefore intentionally unavailable. File uploads still use Chromium's normal file chooser.

**No performance claims.** There is no measured RAM, startup, battery or YouTube benchmark. One loaded page can use hundreds of MB independent of the UI. No RAM numbers or fake protection counters are shown. The blocked counter reflects this session's filtering-engine events, not a security score.

## Design preview

Open `ui/index.html` in an existing browser to inspect the UI offline. It says **DESIGN PREVIEW**, has working local tab/settings interactions, and deliberately refuses to pretend to browse. Actual website browsing requires `npm start`. Local UI assets have no fonts, images, scripts or trackers loaded from a CDN.

## Data and privacy

See **PRIVACY.md**. Folkistan settings/bookmarks/restored tab addresses are plaintext in Electron's user-data directory (normally `%APPDATA%\Folkistan`); cookies and website storage are in its persistent web session. No separate portable profile directory is implemented. Deleting the EXE does not delete this profile.

## Keep the prototype current

Before every release, review the latest stable Electron security patches and dependency advisories; update `package.json` and `package-lock.json` together, test, and rebuild. `npm audit` is not a substitute for browser security review. Bundled versions and lists are snapshots, not a maintenance promise. Refresh filters from the URLs in `filters/SOURCES.md`, preserving license terms, then rebuild and test. Installed Windows builds make GitHub update checks by default; see PRIVACY.md and UPDATES.md. Filter updates require a rebuild.

## Development

`main.cjs`: lifecycle, sessions, native views, permissions, blocking, imports, extensions.
`preload.cjs`: narrow control bridge, not installed in website renderers.
`lib/core.cjs`: URL validation, local warnings, bookmark validation.
`ui/`: plain HTML/CSS/JS; no React or animation framework.
`test/`: pure logic tests using Node's built-in runner.

License: GPL-3.0-only for project source. Dependencies retain their own licenses; see THIRD_PARTY.md.

## Approved cat icon

The user-approved cat-and-original-wig artwork is embedded into the Windows app executable and the installer, with 16–256px ICO representations. The same artwork appears in the native window, sidebar title, and new-tab mark. The resource-editing build hook verifies preservation of unrelated resources; no additional runtime dependency or network request is introduced. Windows execution remains unverified.

## Reproducible source assets

`npm run prepare:build` reconstructs the approved icon from checksum-verified base64 sources and downloads EasyList/EasyPrivacy only when absent. The packaged browser uses local snapshots; it does not fetch filters at runtime. For a deliberate list refresh use `npm run fetch:filters -- --refresh`, review licenses, then rebuild. GitHub Actions builds Windows installers and publishes update metadata on a stable version bump in package.json. No personal profile data or GitHub token is embedded in the app.

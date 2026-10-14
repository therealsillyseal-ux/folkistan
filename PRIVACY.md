# Privacy and threat-model notes

## No added analytics

Folkistan source adds no analytics SDK, crash-report submission, advertising IDs, account registration, cloud sync, telemetry endpoint or monetized search redirect. No claim is made that Chromium itself or every website/extension makes zero background requests. Network behavior needs independent auditing before production use.

## Expected network traffic

- Navigation, embedded resources, service workers, DNS, certificate checks and website requests behave according to Chromium/Electron and the websites visited. Websites can track, fingerprint and set cookies. This is not Tor, a VPN or an anti-fingerprinting browser.
- Submitted search text goes to DuckDuckGo by default, or to Brave Search/Google if you explicitly select one. Typing does not request search suggestions.
- Static shortcut tiles do not preconnect or fetch external icons.
- Blocklists are included in packaged builds and parsed locally. Source build preparation downloads missing lists from easylist.to. The runtime does not download lists, send browsing history to Ghostery, or call a reputation service. Dependencies, including the filter engine, need their own audit.
- Loading an extension permits that extension to make requests within its capabilities. There is no extension audit or malware verification.
- First development setup/build downloads packages and runtime files from npm/Electron and builder distribution sources. The installed Windows build checks this public GitHub repository for application releases after 30 seconds and every six hours while running, and downloads newer installers by default. GitHub receives normal request metadata such as IP address and client headers, not browsing history from this updater. Disable automatic checks in Settings; pressing Check now still contacts GitHub. Installation requires explicit confirmation to restart. Source and older portable builds do not auto-update.

## Local storage

Settings, bookmark titles and URLs, restored tab titles/URLs, onboarding completion and preferences, and loaded extension folder paths are stored in plaintext `folkistan.json` under Electron's user-data directory. The profile is not encrypted. Tabs are saved periodically, so a crash may lose the latest changes. Website cookies, caches and storage live in a separate persistent web session in the same profile directory. A portable executable does not mean a portable profile.

Clear website data closes tabs and clears session storage/cache, but keeps bookmarks and settings. It does not securely erase disk contents, saved downloads or all OS/browser network caches. Profile deletion is manual with the app closed.

## Defaults

Node integration is off for web pages. Context isolation, sandboxing, web security and normal certificate verification remain enabled. External application protocols, file/data/javascript top-level addresses and remote downloads opening automatically are not supported. Permissions are denied except fullscreen. Permission prompts, per-site exceptions, passkeys, WebAuthn and account login flows are not tested.

## Not provided

No phishing-reputation checks, malware scanner, download reputation, encrypted credential store, managed-device policy support, publisher-signed auto-updates or security response operation. HTTP/punycode/IP warnings are cautionary heuristics, not protection against all malicious destinations. No security badge means a site is trustworthy.

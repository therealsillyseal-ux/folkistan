# Updates — 0.1.4

## Users

Install the Windows x64 setup build once, including if upgrading from an older portable EXE. The app keeps its existing Electron user-data directory and does not intentionally delete bookmarks or settings. Back up important data first; do not run two copies simultaneously.

Installed Windows builds check https://github.com/therealsillyseal-ux/folkistan/releases after 30 seconds and every six hours while running. New stable versions download in the background. Settings shows actual check/download status and offers Restart & install when ready. A confirmation appears before restart; save unfinished forms. Updates do not install on ordinary quit.

Automatic update checks can be disabled in Settings. Manual Check now remains available. Development, Linux and portable builds do not use this update feed.

## Security limits

This prototype and its installers are unsigned. HTTPS and metadata SHA-512 integrity checks are not publisher-signature authentication. A compromised repository or release account can distribute malicious updates. There is no claim of a production-grade secure update chain. Do not bypass Windows protections. Code signing, release-account hardening and independent review are required before trusting this as a daily browser.

## Maintainers

Review Electron security patches/dependency advisories, update dependencies and lockfile together, test, then bump package.json to a new stable version. The Windows release workflow builds NSIS and publishes its installer, blockmap and latest.yml as one draft before making it public. Published versions are not overwritten. Review the Actions result and downloaded assets before announcing a release. Filters are fetched at build time, bundled locally and refreshed by rebuilding.

The app uses the public GitHub provider without shipping a GitHub token. The workflow uses only GitHub’s ephemeral Actions token with repository contents-write permission. Production signing secrets must never be committed.

## Verification

Node unit tests exercise supported/unsupported updater states, scheduling opt-out, event progress, cancellation and explicit installation confirmation. These mocks do not prove real Windows installation or a 0.1.4-to-newer upgrade. That end-to-end Windows test remains outstanding.

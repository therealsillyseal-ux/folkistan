# Verification for 0.1.3

## Performed

- Seven Node built-in logic tests: address/search routing, prohibited schemes/credentials, allowed navigation, heuristic warnings, bookmark cleanup and Chromium JSON traversal, search-provider routing.
- Native Electron 44.7.2 smoke tests on Linux/Xvfb: first-run onboarding and completion; preference persistence; full/compact sidebar; tab creation/pinning; light/dark settings; blocking engine initialization/toggling; privileged-protocol rejection; real native loopback website rendering with no exposed Node or app bridge; an actual tracker request blocked and counted; bookmark saving; a minimal unpacked Manifest V3 content-script extension loaded, injected and removed; inactive-tab sleeping; no UI renderer exceptions.
- HTTPS example.com content was rendered separately with normal certificate verification. This is not a general compatibility test.
- UI inspected at desktop and 390px preview sizes, including onboarding, settings, bookmarks and collapsed-sidebar states. Desktop Windows app itself has a 620px minimum width; 390px is preview-only responsive QA.
- Windows x64 portable packaging performed on Linux. Generated PE files are not signed.

## Limitations

The container-native smoke harness used a test-only `--no-sandbox` flag to launch Electron inside this container. This flag is NOT present in Folkistan's source launchers, product code or packaged Windows entry point. Renderer preferences still requested sandboxing, but these tests do not certify OS-level sandbox effectiveness.

Windows execution, clean-machine setup, Windows sandbox behavior, antivirus compatibility, video playback, GPU/battery/RAM benchmarks, DRM, browser/extension store compatibility, and malicious-site penetration tests have NOT been performed. No independent security or privacy audit is claimed. The test extension is deliberately minimal and is not evidence that arbitrary extensions work.

Source and binary are experimental. Avoid sensitive accounts. The bundled runtime/filter snapshots require maintained updates before real-world distribution.

## Compact audio-control revision

Verified in an offline UI harness: playing/muted/hover states, independent close and audio controls, background-tab mute does not activate the tab, no renderer exceptions, and a borderless sidebar sharing the window surface. Verified in native Electron on Linux: actual webContents audio-mute toggling, muted preference survives unloading/recreating a sleeping tab, and compact close works. Windows audio output itself is still untested.

## Bare tab controls

Removed the circular backgrounds from close and audio badges, including hover/focus states. Transparent hit areas, native mute behavior and the selected-tab surface are retained.

## Approved app icon

Build-time icon integration covers the app PE resource group, native window icon, portable launcher and local UI. Resource editing preserves unrelated resource entries and does not sign the executable. Real Windows display/caching behavior remains untested.

## 0.1.4 update revision

Fourteen Node tests passed, including seven updater-state tests. Native Linux regression passed for real webContents mute/unmute, background-tab controls, sleep/wake mute retention and closing tabs. Windows installer execution and a real installed-version-to-newer-version update remain untested. GitHub targeted secret-scanning service was unavailable because Advanced Security is not enabled; this is not a clean service scan result. Only an explicit source/assets whitelist is published, excluding all personal profiles and generated builds.

## Published 0.1.4 build

GitHub Actions Windows runner completed the NSIS build and published v0.1.4 with installer, blockmap and latest.yml. The downloaded 131,863,120-byte installer matches latest.yml SHA-512 and the GitHub asset SHA-256 (`0e19d10ad98e142e74c56aaa197abd7ac16db475b0338b4980cc5d7ccc206695`). This verifies build/publication and transfer integrity, not publisher authentication or Windows runtime behavior. Native Linux Settings also correctly disables updating in unsupported source builds. End-to-end Windows installation and upgrading to a newer version are still outstanding.

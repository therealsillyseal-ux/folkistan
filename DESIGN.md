# Design direction

The goal is a considered browser interface, not a product landing page or a claim of human authorship.

Applied decisions:
- Replaced the huge two-line marketing headline with a modest, task-focused prompt.
- Removed decorative all-caps product slogans and repeated claims.
- Search remains the primary action; real bookmarks and compact website shortcuts come next.
- Website shortcuts are not feature cards. No fabricated activity, protection scores or testimonials.
- Selected one coherent Lucide control-icon family, checked for sizing/weight consistency; Simple Icons supplies recognizable website/browser marks. Only selected vectors are bundled; no whole icon framework or runtime CDN.
- One accent, system typography, restrained borders, no background blur, no decorative gradient hero, no continuous animations. Motion is limited to short state transitions and loading indicators and respects reduced motion.
- App defaults remain dark; light/system variants are available. Full and collapsed sidebars use matching native website bounds.

Research:
- Nielsen Norman Group, Aesthetic and Minimalist Design: https://www.nngroup.com/articles/aesthetic-minimalist-design/
- Lucide icon design guide: https://lucide.dev/contribute/icon-design-guide
- Simple Icons source and licensing guidance: https://github.com/simple-icons/simple-icons

These sources support usability and consistency choices. There is no scientifically established checklist that proves an interface is “human-made,” and no such claim is made here.

## Sidebar revision from user references

Removed the decorative logo tile, uppercase workspace label and profile footer. Full mode uses literal tab navigation and a utility toolbar. Compact mode uses 64px of window space and centered site marks, with an upper-right audio toggle and upper-left close on hover/focus. The sidebar shares the window/toolbar background without a vertical separator. No blur, acrylic material or animated waveform is needed. Sound controls use locally bundled Lucide audio-lines, volume-x and x icons.

User-requested refinement: sound/mute and close glyphs have no circular background in any state. The tab rectangle, transparent hit areas and keyboard-focus affordances remain.

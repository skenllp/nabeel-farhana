# Nabeel & Farhana — Wedding Invitation Website

A premium, single-page wedding invitation built with plain HTML5, CSS3 and vanilla
JavaScript (ES6). The signature moment is **"The Nikah Arch"** — two mihrab-shaped
gold doors, draped with a jasmine (mullapoo) garland, that open on tap to reveal
the couple's names.

## Run it

No build step needed.

- **Easiest:** double-click `index.html` to open it in your browser.
- **Recommended (for fonts/icons to load reliably and for the music to work
  the same way it will once hosted):** serve the folder with any static server, e.g.
  ```bash
  npx serve .
  # or
  python3 -m http.server 8000
  ```
  then visit `http://localhost:8000`.

## Folder structure

```
Wedding-Invitation/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    ├── images/
    │   ├── bride.jpg
    │   ├── groom.jpg
    │   ├── couple.jpg
    │   ├── couple_wide.jpg          (unused now, kept as a spare backdrop option)
    │   ├── floral-header-bg.svg     (blurred floral hero backdrop)
    │   └── og-share.jpg             (1200×630 preview image for WhatsApp/social links)
    ├── music/                (empty — add your own track, see below)
    ├── icons/                (empty — icons are Font Awesome + inline SVG)
    └── fonts/                (empty — fonts load from Google Fonts CDN)
```

## Editing content

Everything editable lives in **one object** at the top of `script.js`:

```js
const weddingData = {
  groomName: "...",
  brideName: "...",
  weddingDate: "2026-08-15",
  weddingTime: "12:00",
  venue: "...",
  address: "...",
  googleMaps: "",     // paste a Google Maps share link to override the auto-search link
  rsvpNumber: "",      // RSVP button is currently disabled — see below
  parents: { groom: "...", bride: "..." },
  music: "assets/music/music.mp3"
};
```

Change any value and every section (hero, countdown, details card) updates
automatically — no HTML editing required.

### Adding background music
Drop an MP3 file at `assets/music/music.mp3` (or update the `music` path above).
The floating music button only appears once the browser confirms the file can
play, so it's safe to leave this empty — the button simply stays hidden.

### WhatsApp / social sharing preview (OG image)
The `<meta property="og:image">` tag in `index.html` points at
`assets/images/og-share.jpg`. Swap that file for a different image any time —
keep it roughly 1200×630px for the sharpest preview. Note: WhatsApp and most
apps require this URL to be a full `https://...` address once the site is
hosted, so update the `og:image` (and `og:url`) tags to your live domain
before sharing the link.

### Ring particles on opening
When someone taps **"Open the Invitation,"** a burst of small gold rings
floats up and fades out over the arch. This is handled by
`spawnRingParticles()` in `script.js` and only plays once per page load.

### RSVP
An RSVP button was intentionally left out per your request. If you'd like one
later, set `rsvpNumber` to a WhatsApp number (with country code, no spaces or
`+`) and add a button in the details section linking to:
`https://wa.me/<rsvpNumber>`.

### Directions button
By default the "Get Directions" button builds a Google Maps search link from
the venue name and address. For pinpoint accuracy, open Google Maps, find the
exact venue, tap **Share → Copy link**, and paste it into `googleMaps` in
`weddingData`.

## Tech used
HTML5, CSS3 (custom properties, no framework), vanilla JS (ES6), Google Fonts
(Cormorant Garamond, Cinzel, Jost, Mrs Saint Delafield), Font Awesome (icons),
AOS (scroll reveal), GSAP (loaded for future use / subtle parallax fallback is
plain JS so the page works even if the CDN is blocked).

## Notes
- Fully responsive: tested breakpoints at ~480px, ~640px, ~780px, ~1024px.
- Respects `prefers-reduced-motion`.
- Images are pre-compressed for fast loading; swap in your own via the same
  filenames to keep everything wired up.

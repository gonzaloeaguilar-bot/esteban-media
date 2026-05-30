# Hero video placeholders

The homepage `<Hero />` references two files that don't ship in git:

- `/public/video/hero.mp4` — looped, muted background reel (~10–20s, ≤4 MB ideal)
- `/public/video/hero-poster.jpg` — first-frame poster (used as fallback + while video loads)

## Where to source until Esteban delivers real footage

Use CC0 / royalty-free sources only. **Do not AI-generate.**

- [Coverr](https://coverr.co) — free cinematic loops
- [Pexels Videos](https://www.pexels.com/videos/) — CC0
- [Mixkit](https://mixkit.co/free-stock-video/) — free with attribution-free license

Pick something atmospheric and South-Florida-flavored if possible (coastline,
palms at dusk, urban dusk). Drop the files in this directory and the hero
section picks them up with no code change.

## When Esteban delivers real footage

Replace both files. Consider moving the video to Mux or Cloudinary if it's
>4 MB — see `CLAUDE.md` "Media hosting" notes.

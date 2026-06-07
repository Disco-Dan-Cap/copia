# Copia imagery direction — app photography via Higgsfield

Art direction + production manifest for the app's photographic layer. Governs every generated image. Companion to `copia-frontend-design.md` (its Photography section is the source of these rules).

## The locked template

Every prompt is built on this base:

> [SUBJECT], editorial food photography, golden-hour natural light, warm tones, soft film grain, shallow depth of field, texture and natural imperfections welcome, no people, no hands, no text

**Rules:**
1. **Nostalgia lives in the objects, not the architecture** (Garrison, 2026-06-05). Wooden crates, galvanized cans, enamel colanders, pulp cartons, mason jars, twine: yes. Houses, coops, barns, stands: tidy and cared-for — charming, never derelict. A fresh-painted bungalow with a fifty-year-old watering can is the register.
2. **No people, no hands, no faces** — AI tells live there, and the brand doesn't need them. A figure turned away at distance is the absolute maximum, used rarely.
3. **Imperfect produce on purpose.** Splits, dust, dirt, uneven sizes — fights the waxy AI look and matches the directive.
4. **Archetype drives the scene.** backyard → bungalow yards, small coops, porch tables · suburban → raised beds, garage-side stands · small-farm → field rows, orchard, farm gate, Hill Country horizon · specialty → workbench, kitchen, jars and loaves.
5. **Formats:** listings = 1:1 masters · seller vignettes = 3:2. Model: nano_banana_pro request (routes to current top model). Final delivery: webp via sharp at build time.
6. **Review gate:** every image checked against this doc before its URL enters the manifest. Mismatched light, waxy surfaces, mangled text/labels, or sad architecture = regenerate.
7. **Jars and bread carry no readable labels.** Plain kraft tags or bare glass — generated text is a tell, and Copia products wouldn't shout anyway.

## Manifest

Status: ✅ delivered — all 50 downloaded, converted to webp (`scripts/fetch-photos.mjs`), and wired into seed data + components (2026-06-05). The gradient stays as the designed fallback. Calibration shots fill three slots.

**Mira's Half-Acre — suburban, East Austin** (vignette ✅ calibration garden)
- l-miras-tomatoes ✅ Heirloom tomatoes, weathered tray, market stall (calibration)
- l-miras-eggs ✅ Backyard eggs, pulp carton, window light (calibration)
- l-miras-basil ✅ hf_20260605_172253_29492708 (basil, galvanized bucket)
- l-miras-cherry ✅ hf_20260605_172256_91738de0 (pulp pints, architecture-rule pass)
- l-miras-lettuce ✅ hf_20260605_172258_2361f4b8 (crate, kitchen window)
- l-miras-peas ✅ hf_20260605_172259_c1968501 (kraft bag, open pods — batch best)
- l-miras-squash ✅ hf_20260605_172301_17346c68 (enamel colander, scattered dirt)
- l-miras-zinnias ✅ hf_20260605_172303_e35dd6cd (tin can + mason jar; embossed "Ball MASON" accepted as real-object exception)
- l-miras-jalapenos ✅ hf_20260605_172751_897ce831

**The Honey & The Comb — specialty, South Lamar** (vignette ✅ tidy hives at golden hour, wildflowers)
- l-honey-wildflower ✅ hf_20260605_172753_f1a2e29a
- l-honey-comb ✅ hf_20260605_172755_45ca815d
- l-honey-propolis ✅ hf_20260605_172800_001e8ff4 (tag blank as ordered)

**Wimberley Hill Farm — small-farm, Hill Country** (vignette ✅ field rows, cedar fence, Hill Country horizon)
- l-wim-peaches ✅ hf_20260605_172801_6e9304fe
- l-wim-chard ✅ hf_20260605_172802_1f4e6820
- l-wim-csa ✅ hf_20260605_172804_484118e2 (Hill Country horizon — set highlight)

**Cherrywood Backyard — backyard, East Austin** (vignette ✅ neat bungalow backyard, small beds, string lights off)
- l-cherry-tomatoes ✅ hf_20260605_172805_bbead874 (porch + unlit string lights, architecture-rule pass)
- l-cherry-herbs ✅ hf_20260605_172807_6ea4b39a

**Dripping Springs Market Garden — small-farm** (vignette ✅ market-garden rows, morning, drip lines)
- l-drip-shishito ✅ hf_20260605_172809_ae87230d (note: blister marks read slightly grilled; regen candidate)
- l-drip-squash ✅ summer squash stacked at field edge
- l-drip-melon ✅ cantaloupe whole + cut wedge, board

**Mueller Microgreens — suburban, Mueller** (vignette ✅ tidy garage grow shelves, trays, daylight + grow light mix)
- l-mueller-pea ✅ pea microgreens tray, scissors-cut corner
- l-mueller-lettuce ✅ butter lettuce, clean roots
- l-mueller-sunflower ✅ sunflower shoots tray close-up

**Lockhart Orchard Co. — small-farm, Lockhart** (vignette ✅ orchard rows, ladder against tree, cared-for)
- l-lock-peaches ✅ freestone peaches, halved one showing pit
- l-lock-plums ✅ methley plums, dusty bloom on skin

**Hyde Park Hens — backyard, Hyde Park** (vignette ✅ charming small coop, fresh paint, hens at distance)
- l-hyde-eggs ✅ pasture eggs, mixed shells, basket
- l-hyde-duck ✅ duck eggs, larger, pale, straw

**Buda Sourdough — specialty, Buda** (vignette ✅ kitchen workbench, flour, banneton baskets)
- l-buda-country ✅ country loaf, scored crust, crumb shot
- l-buda-focaccia ✅ rosemary focaccia, olive oil sheen
- l-buda-rye ✅ seeded rye sliced on board

**Bastrop Berry Patch — small-farm, Bastrop** (vignette ✅ berry rows, pine edge, picking crates)
- l-bastrop-blackberry ✅ blackberries, pulp pint, stained fingers ABSENT — berries only
- l-bastrop-jam ✅ jam jar, bare glass, kraft tag, spoon

**Round Rock Roots — suburban, Round Rock** (vignette ✅ big backyard rows, neat shed, suburban fence line)
- l-rr-carrots ✅ rainbow carrots, tops on, dirt dusted
- l-rr-beets ✅ golden beets, greens attached
- l-rr-onions ✅ spring onions bunched, wet

**South Congress Salsa & Preserves — specialty, SoCo** (vignette ✅ canning kitchen, jar rows, copper pot)
- l-soco-salsa ✅ salsa jar open, roasted tomatoes beside
- l-soco-pickles ✅ dill pickle jar, dill fronds
- l-soco-figs ✅ fig preserves, halved figs on board

**Totals:** 50 of 50 GENERATED and DELIVERED (2026-06-05) — converted to webp and wired into the seed (`Listing.photo` / `Seller.photo`) and every fill-bearing component, with the gradient kept as the designed fallback. Full URL ledger with raw links: `case-study/imagery-contact-sheet.html` — the wiring prompt's source of truth. Two shipped with open flags for a later regen pass: l-drip-shishito (char marks), v-soco-preserves (illegible jar labels). All others passed editorial review.

## Seller avatars (added 2026-06-06)

Replaces the `avatarGradient` color squares. 5 grower faces (fictional people, environmental portraits, avatar-scale) + 7 farm/group logos (Garrison chose AI logos over SVG monograms; regenerated as a locked single-style set — forest-green line emblem on cream, no text). All 1:1. Gradient stays as the fallback, same pattern as listing photos. Filenames below are the Higgsfield job stems (full-res .png at the CDN base in the contact sheet).

FACES → /photos/avatar-{sellerId}.webp:
- miras-half-acre ✅ hf_20260606_203414_7985e9da
- cherrywood-backyard ✅ hf_20260606_203415_596f5e48
- mueller-microgreens ✅ hf_20260606_203417_6f6cdb96
- hyde-park-hens ✅ hf_20260606_213308_858dbd29
- round-rock-roots ✅ hf_20260606_203420_39243fa0

LOGOS → /photos/avatar-{sellerId}.webp (per-farm distinct colors — Garrison's call 2026-06-06: independent businesses shouldn't share a brand family; superseded the first forest-on-cream set):
- honey-and-the-comb ✅ hf_20260606_214003_d5f4e0c1 (honeycomb + bee, honey-gold bg)
- wimberley-hill-farm ✅ hf_20260606_214004_214eb64d (hills + sun, sky-blue bg)
- dripping-market-garden ✅ hf_20260606_214006_618ddb19 (droplet + sprout, cream bg, teal)
- lockhart-orchard ✅ hf_20260606_214007_04a52cc2 (fruit tree, peach bg)
- buda-sourdough ✅ hf_20260606_214008_40fc3310 (loaf + wheat, tan bg)
- bastrop-berry-patch ✅ hf_20260606_214009_cea0176f (berries, lavender bg)
- soco-preserves ✅ hf_20260606_214011_8f09990e (jar + pepper, tomato-red bg)

Source URLs for all 12 are in case-study/seller-avatars-final.html (each <img> src; swap `_min.webp` → `.png` for full-res).

## Delivery pipeline

DONE (2026-06-05): `scripts/fetch-photos.mjs` parses the contact-sheet URLs, downloads all 50, converts to webp (sharp, listing 800×800 / vignette 1200×800), and saves to `public/photos/{manifest-id}.webp`. The seed carries an optional `photo` field (`Listing.photo` / `Seller.photo`), assigned by id; every fill-bearing component renders the photo over the gradient, so a session-created listing (no photo) still shows its picked gradient — the photo is additive, the gradient is the designed fallback.

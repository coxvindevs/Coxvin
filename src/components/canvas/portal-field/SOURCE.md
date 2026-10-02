# Portal Field provenance

Source: https://github.com/MengTo/threeui
Revision: 68802d5428071ada5c20db8094b1649e6bb770ed
Package inspected: @designcodeio/threeui 1.2.0 (downloaded to /tmp; not installed).
License: MIT, Copyright (c) 2026 Meng To. Included in LICENSE.

Authored HTML SHA-256:
f90e34f83d5179217c6f0928d633ec4a8201b00cfb980b374b5df76a9f167a6e
This matches the f90e34f83d51 revision supplied in the experiment brief.

Authored renderer: src/shaders/neuform-isolated/sources/portal-field.html.
Collection boundary: src/shaders/portal-field/PortalFieldCollection.tsx.
Original effect host: src/shaders/neuform-isolated/NeuformBatchEffects.tsx.

The GLSL is extracted from the authored HTML. The only shader change adds
u_portalCenter and expresses its x coordinate in aspect-correct normalized
viewport units. The original noise, two arcs, warp, glow, wash, tone mapping,
alpha and additive blending are retained. u_mouse stays neutral because the
requested inertial interaction now controls the actual portal axis.

The local React host replaces the upstream iframe/CDN/demo shell with the
project's Three.js runtime (0.160.1; upstream HTML uses r134). It adds lifecycle
cleanup, capped DPR with backing-pixel resolution, visibility pausing, context
restoration, reduced motion, and the requested palette/axis/interaction.
No other field variants are shipped or initialized.

Before stack: #080807 base; hero-light-field.avif at z0/opacity .6;
two-pass HalftoneCanvas at z1/opacity 1/normal blend; 144px bottom fade at z2;
scroll darkening 0-.6 at z3; content z10; grain .25/color-dodge at z20.
The halftone has a three-second .31,.75,.22,1 reveal. The image moves -100px
to +100px on scroll. Content entrances use the existing independent timeline.
The halftone owns one WebGL context with a scalar-field render target and
display pass; it pauses offscreen and disposes its resources on unmount.

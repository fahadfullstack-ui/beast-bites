## Overview
Add a new section after the existing `science-section` on `product-detail.html` that matches the provided "UNPARALLELED QUALITY" design: a bold header and two side‑by‑side comparison cards (Creapure® vs Generic Creatine) with images, purity callouts, bullet lists, and a footnote.

## HTML Changes
1. Insert immediately after `</section>` of the science block (`product-detail.html` around 267):
```
<section class="quality-section">
  <div class="quality-header">
    <h2>UNPARALLELED QUALITY</h2>
  </div>
  <div class="quality-grid">
    <div class="quality-card quality-creapure">
      <div class="quality-media"><img src="images/60.png" alt="Creapure"></div>
      <div class="quality-content">
        <div class="quality-label">Creapure®</div>
        <div class="quality-purity">98% Purity</div>
        <ul class="quality-list quality-list-good">
          <li>Highest creatine purity</li>
          <li>Sourced from Germany</li>
          <li>NSF Certified</li>
          <li>FDA‑Registered</li>
        </ul>
      </div>
    </div>
    <div class="quality-card quality-generic">
      <div class="quality-media"><img src="images/64.png" alt="Generic Creatine"></div>
      <div class="quality-content">
        <div class="quality-label">Generic Creatine</div>
        <div class="quality-purity">40–63% Purity</div>
        <ul class="quality-list quality-list-bad">
          <li>No quality control</li>
          <li>Unknown source</li>
          <li>No certifications</li>
          <li>Not FDA‑Registered</li>
        </ul>
      </div>
    </div>
  </div>
  <p class="quality-footnote">Creapure® is directly sourced from Germany, guaranteeing the highest purity and quality.</p>
</section>
```

## CSS Styles (append near product detail styles)
```
.quality-section { background:#fff; border-radius:10px; box-shadow:0 4px 10px rgba(0,0,0,.08); padding:50px 20px; margin:0 0 60px; }
.quality-header { text-align:center; max-width:1024px; margin:0 auto 30px; }
.quality-header h2 { font-size:36px; font-weight:900; text-transform:uppercase; color:#000; }
.quality-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:20px; max-width:1200px; margin:0 auto; }
.quality-card { display:flex; gap:20px; background:#fff; border:1px solid #e5e7eb; border-radius:12px; padding:20px; align-items:center; }
.quality-creapure { border-color:#a7f3d0; box-shadow:0 5px 20px rgba(16,185,129,.08); }
.quality-generic { border-color:#e5e7eb; }
.quality-media { flex:0 0 220px; height:140px; border-radius:10px; overflow:hidden; background:#f8f9fa; display:flex; align-items:center; justify-content:center; }
.quality-media img { width:100%; height:100%; object-fit:cover; }
.quality-content { flex:1; }
.quality-label { font-weight:700; color:#0f172a; margin-bottom:6px; }
.quality-purity { font-size:28px; font-weight:900; color:#06b6d4; margin-bottom:12px; }
.quality-list { list-style:none; margin:0; padding:0; display:grid; gap:6px; }
.quality-list-good li { color:#0b8f6e; font-weight:600; }
.quality-list-bad li { color:#475569; font-weight:600; }
.quality-list-good li::before { content:"✓"; color:#10b981; font-weight:900; margin-right:8px; }
.quality-list-bad li::before { content:"×"; color:#ef4444; font-weight:900; margin-right:8px; }
.quality-footnote { text-align:center; color:#6b7280; font-size:12px; margin-top:20px; }
@media (max-width:768px){ .quality-header h2{font-size:28px;} .quality-grid{grid-template-columns:1fr; gap:15px;} .quality-media{flex:0 0 160px; height:120px;} }
```

## Assets
- Use existing images in `/images` (`60.png` for Creapure®, `64.png` for generic) as placeholders; you can replace with specific photos later.

## Verification
1. Open the product detail page and confirm the new section appears directly below the science block.
2. Check hover/contrast, list icons, and footnote rendering.
3. Resize to mobile and ensure cards stack, images shrink, and text remains legible.

## Notes
- Colors align with current palette (greens/teals used in testimonials and science). Typography matches other section headers.
- No dependencies added; pure HTML/CSS like the rest of the page.

Confirm to proceed and I will implement these changes exactly and verify in the local preview.
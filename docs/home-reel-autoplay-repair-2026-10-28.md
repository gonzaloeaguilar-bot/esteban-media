# Homepage Reel autoplay repair

The visible Great Reviewer Reel card should behave as a muted, looping preview
when it reaches the carousel viewport. It uses the real YouTube player only;
the decorative progress strip and duplicate play controls are removed. Tapping
the card still opens the existing full player sheet.

Evidence: a fresh 390 by 844 public-browser inspection found the live card
with a static source preview plus an extra orange play control. When the card
entered the viewport, its YouTube iframe mounted. The repair makes that real
player loop and removes the simulated controls.

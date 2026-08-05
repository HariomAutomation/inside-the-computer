# Definition of Done (DoD) Checklist

A feature, lesson, simulator, or Pull Request (PR) is considered **DONE** and ready for release only when all items below pass:

## 📋 Quality & Verification Criteria
- [ ] **Type Safety**: `npx tsc --noEmit` returns **0 TypeScript errors**.
- [ ] **Production Build**: `npx vite build` completes cleanly with 0 warnings or broken imports.
- [ ] **Automated Testing**: Unit and Component tests pass (`npm run test`).
- [ ] **Mobile Responsiveness**: UI adapts dynamically to Mobile (375px), Tablet (768px), and Desktop (1440px+).
- [ ] **60 FPS Animation Performance**: Animations use hardware-accelerated CSS transforms or Framer Motion without layout thrashing.
- [ ] **Accessibility (a11y)**: Keyboard navigation, screen-reader ARIA labels, and color contrast ratios meet WCAG AA standards.
- [ ] **Documentation Updated**: Relevant spec or guide updated in `/docs` if modifying engine architecture or schemas.
- [ ] **No Console Errors**: Zero unhandled exceptions or console errors during interactive testing.

# Requirements Document

## Introduction

This feature extends the existing dark/light mode toggle — already implemented on the Auth page — to every page and component across the entire WebDev Software Solutions website. The site is built with Next.js 16, React 19, Tailwind CSS v4, and TypeScript. A `ThemeContext` already exists at `src/context/ThemeContext.tsx`, it stores the theme preference in `localStorage`, toggles the `dark` class on `<html>`, and is already provided at the root layout level.

The work involves:
1. Placing the theme toggle button in the `Navbar` (and `TopBar`) so it is accessible on every page.
2. Refactoring every component to use `useTheme()` and apply conditional Tailwind classes — matching the pattern already established in `AuthPage.tsx`.
3. Updating `globals.css` so that CSS custom properties flip correctly under the `.dark` selector, giving a smooth, flash-free experience.

The end result: a visitor can switch themes from any page, the preference persists across sessions, and every surface — navigation, hero, sections, cards, modals, footer, admin dashboard, user profile, blog, careers, portfolio, about, contact, privacy, terms — renders correctly in both modes.

---

## Glossary

- **Theme_Toggle**: The Sun/Moon icon button that switches between dark and light modes.
- **ThemeContext**: The existing React context at `src/context/ThemeContext.tsx` that provides `theme`, `toggleTheme`, and `setTheme`.
- **AppShell**: The `src/components/AppShell.tsx` wrapper that renders `TopBar`, `Navbar`, page content, and `Footer` on all non-admin routes.
- **Navbar**: The `src/components/Navbar.tsx` sticky top navigation bar present on every public page.
- **TopBar**: The `src/components/TopBar.tsx` thin announcement/contact bar above the Navbar.
- **Dark_Mode**: The visual state where the site uses a dark background (`slate-950` / `slate-900`) with light text.
- **Light_Mode**: The visual state where the site uses a white/light-gray background with dark text.
- **Dark_Variant**: A Tailwind CSS `dark:` class prefix that applies styles when the `dark` class is present on the `<html>` element.
- **FOUC**: Flash Of Unstyled Content — a visible flicker between themes during server-side render hydration.
- **Reduced_Motion**: The `prefers-reduced-motion: reduce` media query that disables animations for accessibility.
- **WCAG_AA**: Web Content Accessibility Guidelines 2.1 Level AA contrast ratio standard (minimum 4.5:1 for normal text).
- **Admin_Dashboard**: The `src/components/AdminDashboard.tsx` full-screen workstation UI at the `/admin` route.
- **Component**: Any `.tsx` file inside `src/components/` that renders UI and currently uses hardcoded color classes.

---

## Requirements

### Requirement 1: Theme Toggle Button in Navbar

**User Story:** As a site visitor, I want a dark/light mode toggle button in the main navigation bar, so that I can switch themes from any page without navigating away.

#### Acceptance Criteria

1. THE Navbar SHALL render a Theme_Toggle button (Sun icon in dark mode, Moon icon in light mode) in the desktop navigation bar, to the right of the navigation links and before the CTA button.
2. THE Navbar SHALL render the Theme_Toggle button in the mobile menu drawer as well, ensuring it is accessible on all screen sizes.
3. WHEN the Theme_Toggle button is clicked, THE ThemeContext SHALL switch the active theme and persist the new value to `localStorage` under the key `webdev-theme`.
4. WHILE Dark_Mode is active, THE Navbar SHALL render its background, text, borders, logo, and dropdown panels using the dark color palette already established in the scrolled state (`slate-950/95`, `slate-800`, `slate-100` text).
5. WHILE Light_Mode is active, THE Navbar SHALL render its background, text, borders, logo, and dropdown panels using the light color palette (`white/95`, `slate-200`, `slate-900` text) as it currently does in the unscrolled state.
6. THE Theme_Toggle button SHALL have an accessible `aria-label` that reads "Switch to light mode" or "Switch to dark mode" depending on the current theme.

---

### Requirement 2: Theme Toggle in TopBar

**User Story:** As a site visitor, I want the top announcement bar to respect the active theme, so the entire header area feels visually consistent.

#### Acceptance Criteria

1. WHILE Dark_Mode is active, THE TopBar SHALL render with `bg-slate-950` background, `slate-400` text, and `slate-800` borders.
2. WHILE Light_Mode is active, THE TopBar SHALL render with `bg-white` background, `slate-600` text, and `slate-200` borders.
3. THE TopBar language switcher and social icon buttons SHALL apply appropriate dark/light hover and active states matching the selected theme.

---

### Requirement 3: Theme-Aware CSS Custom Properties in globals.css

**User Story:** As a developer, I want the global stylesheet to declare dark-mode overrides via CSS custom properties, so that all components inherit correct base colors without repetitive conditional logic.

#### Acceptance Criteria

1. THE globals.css SHALL declare a `:root` block with light-mode CSS custom properties for `--color-bg`, `--color-surface`, `--color-text-primary`, `--color-text-secondary`, `--color-border`.
2. THE globals.css SHALL declare a `.dark` selector block that overrides those same CSS custom properties with dark-mode values.
3. WHEN the `dark` class is toggled on the `<html>` element, THE site SHALL reflect the new base colors within a single paint cycle with no reflow visible to the user.
4. THE `body` element SHALL use `var(--color-bg)` as its background-color so that the default page background switches without per-component changes.
5. THE `body` element SHALL use `var(--color-text-primary)` as its default text color so inherited text color switches automatically.

---

### Requirement 4: Dark/Light Mode for All Page-Level Components

**User Story:** As a site visitor, I want every page on the site — Home, About, Services, Portfolio, Blog, Careers, Contact, Team, Privacy, Terms — to render correctly in both dark and light modes, so that my theme preference is respected everywhere.

#### Acceptance Criteria

1. THE Hero, AboutUsPage, ServicesPage, ServiceDetailPage, PortfolioShowcasePage, ProjectDetailPage, BlogDetailPage, CareersPage, ContactUsPage, ContactQuotePage, PrivacyPolicyPage, TermsOfServicePage, TeamMemberProfilePage SHALL each call `useTheme()` and apply conditional className strings for background, text, border, and card surface colors.
2. WHEN a page-level component renders in Dark_Mode, THE component's outermost wrapper SHALL use a dark background (minimum `bg-slate-900` or `bg-[#0b0f17]`) and light text (`text-slate-100` or `text-white`).
3. WHEN a page-level component renders in Light_Mode, THE component's outermost wrapper SHALL use a white or light-gray background (`bg-white` or `bg-slate-50`) and dark text (`text-slate-900`).
4. THE Breadcrumb component SHALL accept a `theme` prop derived from `useTheme()` in each parent page and render breadcrumb trails with correct colors in both modes.
5. WHEN a user navigates between pages, THE active theme SHALL be maintained without flickering or reverting, because `ThemeContext` persists through the React tree across route transitions.
6. ALL text-on-background combinations SHALL meet WCAG_AA contrast ratio (4.5:1 for normal text, 3:1 for large text) in both Dark_Mode and Light_Mode.

---

### Requirement 5: Dark/Light Mode for Shared Section Components

**User Story:** As a site visitor, I want all reusable section components on the home page and interior pages to render correctly in both themes, so that the site feels consistent throughout.

#### Acceptance Criteria

1. THE MeetOurTeamSection, OurServicesSection, RecentProjectsSection, TestimonialsSection, TechStackSection, TechnologyIndexSection, GlobalTrustSection, GlobalEcosystemSection, FaqAndExperienceSection, WorkingProcessSection, CallToActionBanner, LatestNewsSection, ParallaxShowcaseSection, ClientLogosSection, WhoWeBring, ServiceFeatureCards SHALL each call `useTheme()` and apply conditional classes for background, card surfaces, text, and border colors.
2. WHILE Dark_Mode is active, card surfaces within section components SHALL use `bg-slate-900` or `bg-slate-800` with `border-slate-700` or `border-slate-800` borders.
3. WHILE Light_Mode is active, card surfaces within section components SHALL use `bg-white` or `bg-slate-50` with `border-slate-200` or `border-slate-100` borders.
4. IF a section component has a gradient or decorative background, THEN THE component SHALL render the gradient with appropriate opacity and hue for each theme (e.g., lighter tints in Light_Mode, deeper hues in Dark_Mode).
5. THE Footer SHALL apply dark/light styles through `useTheme()` — specifically the background, link colors, border, and legal text SHALL change to match the active theme.

---

### Requirement 6: Dark/Light Mode for Modal and Overlay Components

**User Story:** As a site visitor, I want all modals, overlays, and dialogs to respect my theme preference, so that the experience is consistent even when interacting with detail views.

#### Acceptance Criteria

1. THE BlogDetailModal, ProjectDetailModal, ProjectOrderModal, QuoteInquiryModal, TeamDetailModal, GoogleAuthModal, UserProfileModal SHALL each call `useTheme()` and apply conditional classes for their backdrop, panel background, text, input fields, and action buttons.
2. WHILE Dark_Mode is active, modal panels SHALL use `bg-slate-900` or `bg-slate-950` backgrounds with `border-slate-800` borders.
3. WHILE Light_Mode is active, modal panels SHALL use `bg-white` backgrounds with `border-slate-200` borders.
4. WHEN a modal is opened while the theme is Light_Mode, THE modal backdrop SHALL use `bg-slate-900/70` to maintain sufficient contrast regardless of theme.
5. THE modal close button (X icon) SHALL have a visible hover state in both Dark_Mode and Light_Mode using the established color patterns.

---

### Requirement 7: Dark/Light Mode for Admin Dashboard

**User Story:** As an admin user, I want the Admin Dashboard to support both dark and light modes, so that I can work comfortably in either environment.

#### Acceptance Criteria

1. THE AdminDashboard SHALL call `useTheme()` and apply conditional class strings for its sidebar, main content area, table rows, form inputs, and action buttons.
2. WHILE Light_Mode is active on the Admin_Dashboard, THE sidebar SHALL use `bg-white` with `border-slate-200`, and the main content area SHALL use `bg-slate-50`.
3. WHILE Dark_Mode is active on the Admin_Dashboard, THE sidebar SHALL use `bg-slate-950` with `border-slate-800`, and the main content area SHALL use `bg-slate-900`.
4. THE AdminCareersManager subcomponent SHALL also call `useTheme()` and apply matching dark/light conditional class strings.
5. THE admin data tables, cards, and form fields SHALL render with readable contrast and visible borders in both Dark_Mode and Light_Mode.

---

### Requirement 8: Dark/Light Mode for User Profile Page

**User Story:** As a logged-in user, I want the User Profile page to respect my theme preference, so that the portal experience is visually consistent with the rest of the site.

#### Acceptance Criteria

1. THE UserProfilePage SHALL call `useTheme()` and apply conditional classes for its background, profile card, form inputs, save button, and inquiry list.
2. THE UserProfileModal SHALL call `useTheme()` and apply conditional classes for its panel, form fields, and buttons.
3. WHILE Light_Mode is active, profile form inputs SHALL use `bg-white border-slate-300 text-slate-900` styling.
4. WHILE Dark_Mode is active, profile form inputs SHALL use `bg-slate-950 border-slate-700 text-slate-100` styling.

---

### Requirement 9: FOUC Prevention and Hydration Safety

**User Story:** As a site visitor, I want the page to load with the correct theme immediately, so that I do not see a flash of the wrong theme before JavaScript initializes.

#### Acceptance Criteria

1. THE `<html>` element in `layout.tsx` SHALL include an inline `<script>` tag that reads `localStorage.getItem('webdev-theme')` and adds the `dark` class synchronously before first paint, preventing FOUC.
2. THE `ThemeProvider` SHALL continue to use `suppressHydrationWarning` on the `<html>` element (already present) to prevent React hydration mismatch warnings when the inline script modifies `className` before hydration.
3. WHEN no theme preference is stored in `localStorage`, THE inline script SHALL apply the `dark` class if `window.matchMedia('(prefers-color-scheme: dark)').matches` returns true, otherwise apply no class (defaulting to Light_Mode).
4. IF `localStorage` is unavailable (e.g., private browsing restrictions), THEN THE inline script SHALL catch the exception and default to Dark_Mode without throwing.
5. THE `ThemeProvider` SHALL initialize its React state to match whatever the inline script applied, ensuring the first render is consistent with the DOM.

---

### Requirement 10: Transition Animation and Reduced Motion

**User Story:** As a site visitor, I want theme switches to animate smoothly, but I want that animation disabled if I have requested reduced motion in my OS settings.

#### Acceptance Criteria

1. THE `<html>` element SHALL have a CSS transition on `background-color` and `color` with a duration of 200ms and `ease` timing when the theme changes.
2. WHEN `prefers-reduced-motion: reduce` is active, THE CSS transition on theme change SHALL be set to `transition: none` so the theme switches instantly.
3. THE theme toggle button itself SHALL have a rotate or scale micro-animation on click (100ms) to provide tactile feedback.
4. WHEN `prefers-reduced-motion: reduce` is active, THE toggle button micro-animation SHALL be disabled.

---

### Requirement 11: Theme Toggle Accessibility

**User Story:** As a keyboard or screen reader user, I want the theme toggle button to be fully accessible, so that I can switch themes without relying on a mouse.

#### Acceptance Criteria

1. THE Theme_Toggle button SHALL be focusable and operable via the keyboard (Enter and Space keys).
2. THE Theme_Toggle button SHALL have a visible focus ring in both Dark_Mode and Light_Mode that meets WCAG_AA contrast requirements.
3. THE Theme_Toggle button's `aria-label` SHALL dynamically read "Switch to light mode" when Dark_Mode is active and "Switch to dark mode" when Light_Mode is active.
4. WHEN the theme changes, THE Theme_Toggle button SHALL update its `aria-label` immediately so screen reader users receive accurate information without navigating away.

---

### Requirement 12: Theme Persistence Across Navigation

**User Story:** As a returning visitor, I want my theme preference saved so that I do not have to re-select it on every visit or every page navigation.

#### Acceptance Criteria

1. THE ThemeContext SHALL write the selected theme to `localStorage` under the key `webdev-theme` on every theme change.
2. WHEN a user opens a new browser tab to the same site, THE new tab SHALL read `localStorage` and apply the stored theme before first render via the FOUC-prevention inline script.
3. WHEN a user navigates between pages using the Next.js router (client-side navigation), THE theme SHALL not reset because `ThemeContext` remains mounted in the root layout.
4. WHEN a user performs a hard browser refresh, THE inline `<script>` in `layout.tsx` SHALL reapply the stored theme before paint so the page loads in the correct mode.

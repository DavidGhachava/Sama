# SAMA Restaurant React Mockup

This is the React/Vite SAMA Asian Cuisine mockup with Framer Motion animations, generated local food imagery, a full menu page, and a reserve page.

## Fast editing

Most SAMA content changes are in:

```text
src/data/samaConfig.js
```

Change:

- Restaurant name, subtitle, phone, location, Instagram
- Phone, email, address, Instagram
- Lunch sets
- Featured dishes and prices
- Full menu categories
- Gallery images

## Colors

The live React colors are CSS variables in:

```text
src/styles/theme.css
```

The current palette is dark charcoal, cream, amber, gold, and rust orange for a premium Asian restaurant feel.

## How to use

Run the mockup locally:

```bash
npm install
npm run dev
```

The live URL should be shown by Vite, usually:

```text
http://127.0.0.1:5174/
```

## Structure

- `src/App.jsx` controls homepage, menu page, and reserve page.
- `src/components/` contains the header, hero, lunch cards, dish cards, menu page, reserve page, gallery, visit section, and footer.
- `src/data/samaConfig.js` contains the editable restaurant data.
- `src/styles/` contains the theme variables, base styles, and component styles.
- `public/images/sama/` contains 12 generated local images for SAMA.

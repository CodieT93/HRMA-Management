# 🎨 Company Customization Guide

This guide explains how to easily customize the HR Management Application for different companies by updating colors, fonts, and branding elements.

## 📁 File Structure

The design system is centralized in one file for easy customization:

```
client/src/styles/global.scss
```

This file contains all the design tokens (colors, fonts, spacing) that control the entire application's appearance.

## 🎯 Quick Customization

### 1. Brand Colors

To change the main brand colors for a new company, update these variables in `global.scss`:

```scss
// Primary Brand Colors (Main company color)
$primary-500: #0ea5e9;  // Change this to your company's main color
$primary-600: #0284c7;  // Darker shade for hover states
$primary-700: #0369a1;  // Even darker for active states

// Secondary Brand Colors (Accent color)
$secondary-500: #d946ef;  // Change this to your company's accent color
$secondary-600: #c026d3;  // Darker shade
$secondary-700: #a21caf;  // Even darker
```

### 2. Company Examples

#### Tech Company (Blue/Green)
```scss
$primary-500: #3b82f6;   // Blue
$secondary-500: #10b981; // Green
```

#### Healthcare (Teal/Purple)
```scss
$primary-500: #14b8a6;   // Teal
$secondary-500: #8b5cf6; // Purple
```

#### Finance (Navy/Gold)
```scss
$primary-500: #1e40af;   // Navy
$secondary-500: #f59e0b; // Gold
```

#### Retail (Red/Orange)
```scss
$primary-500: #dc2626;   // Red
$secondary-500: #ea580c; // Orange
```

### 3. Typography

To change fonts, update these variables:

```scss
// Font Families
$font-family-primary: 'Your-Font', -apple-system, BlinkMacSystemFont, sans-serif;
$font-family-heading: 'Your-Heading-Font', -apple-system, BlinkMacSystemFont, sans-serif;
```

### 4. Semantic Colors

Customize status colors if needed:

```scss
// Success (usually green)
$success-500: #22c55e;

// Warning (usually yellow/orange)
$warning-500: #f59e0b;

// Error (usually red)
$error-500: #ef4444;

// Info (usually blue)
$info-500: #3b82f6;
```

## 🔧 Step-by-Step Customization Process

### Step 1: Choose Your Brand Colors

1. Identify your company's primary brand color
2. Choose a complementary secondary color
3. Ensure good contrast ratios for accessibility

### Step 2: Update global.scss

1. Open `client/src/styles/global.scss`
2. Find the "COMPANY BRANDING CUSTOMIZATION" section
3. Update the color values
4. Save the file

### Step 3: Test Your Changes

1. Run the development server: `npm run dev`
2. Check all pages to ensure colors look good
3. Verify text contrast is readable
4. Test on different screen sizes

### Step 4: Fine-tune (Optional)

1. Adjust spacing if needed
2. Modify border radius for different visual style
3. Update shadows for depth preferences

## 🎨 Color Palette Generator

Use these tools to generate complete color palettes:

- [Coolors.co](https://coolors.co/) - Generate color palettes
- [Adobe Color](https://color.adobe.com/) - Professional color tools
- [Material Design Colors](https://material.io/design/color/) - Google's color system

## 📱 Responsive Considerations

The design system includes responsive breakpoints:

```scss
$breakpoint-sm: 640px;   // Mobile
$breakpoint-md: 768px;   // Tablet
$breakpoint-lg: 1024px;  // Desktop
$breakpoint-xl: 1280px;  // Large desktop
```

## ♿ Accessibility

The color system is designed with accessibility in mind:

- All text has sufficient contrast ratios
- Color is not the only way to convey information
- Focus states are clearly visible
- Semantic colors follow WCAG guidelines

## 🚀 Advanced Customization

### Custom Components

If you need to create company-specific components:

1. Create new SCSS files in `client/src/components/`
2. Import the global design system: `@import '../styles/global';`
3. Use the design tokens for consistency

### Custom Themes

For multiple themes (light/dark), you can:

1. Create theme-specific CSS custom properties
2. Use CSS classes to switch between themes
3. Store theme preference in localStorage

## 📋 Checklist for New Company Setup

- [ ] Update primary brand color (`$primary-500`)
- [ ] Update secondary brand color (`$secondary-500`)
- [ ] Test color contrast on all pages
- [ ] Verify colors work on mobile devices
- [ ] Check that all interactive elements are visible
- [ ] Test with different user preferences (high contrast, etc.)
- [ ] Update any company-specific content (logos, text)
- [ ] Document the color choices for future reference

## 🔍 Troubleshooting

### Colors Not Updating
- Make sure you're editing `global.scss`
- Check that the development server is running
- Clear browser cache
- Verify CSS is being imported correctly

### Poor Contrast
- Use a contrast checker tool
- Ensure text is readable on all backgrounds
- Consider using darker/lighter shades if needed

### Inconsistent Styling
- All components should import from `global.scss`
- Use CSS custom properties (var(--color-name))
- Avoid hardcoded color values

## 📞 Support

If you need help with customization:

1. Check this guide first
2. Look at the existing color examples
3. Test changes in a development environment
4. Consider hiring a designer for complex branding needs

---

**Remember**: The beauty of this system is that you only need to change colors in one place (`global.scss`) and they'll update throughout the entire application! 🎉

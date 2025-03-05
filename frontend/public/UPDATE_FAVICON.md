# Updating the Favicon for Block Party

We've created a custom SVG block icon (`block-icon.svg`) that can be used to replace the default React logo in the browser tab. Follow these steps to update all the necessary files:

## Quick Method (Online Converter)

1. Go to https://favicon.io/favicon-converter/
2. Upload the `block-icon.svg` file
3. Download the generated favicon package
4. Replace the following files in the `public` folder:
   - `favicon.ico`
   - `logo192.png`
   - `logo512.png`

## Manual Method (For More Control)

If you prefer to use other tools or want more control over the process:

1. Convert the SVG to ICO format:
   - Use an online converter like https://convertio.co/svg-ico/
   - Upload `block-icon.svg` and download the ICO file
   - Replace `favicon.ico` in the public folder

2. Create PNG versions:
   - Use an image editor or online service to convert `block-icon.svg` to PNG
   - Create versions at 192x192 and 512x512 sizes
   - Replace `logo192.png` and `logo512.png` in the public folder

The `manifest.json` file has already been updated to use the name "Block Party" instead of "React App". 
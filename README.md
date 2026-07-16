# Génération d'une app de calcul de taxes par IA

##Prompts

### Prompts originaux de Benoit


À la question "What should we build today?", j'ai d'abord répondu:

```
Tax calculator for Quebec with the possibility of including tip.
```

Puis, en voyant l'application, j'ai dit

```
I would like to add the possibility to have either in French or English.
```

### Prompt de Stéphane

```
Create a complete web app manifest file to make my website installable as a Progressive Web App. Include appropriate icons, theme colors, display preferences, and orientation settings. Generate the necessary HTML code for linking the manifest and verifying proper implementation.
```

### Prompt complet

```
I would like you to build a tax calculator for Quebec with the possibility of including tip (as a percentage of the subtotal or a fixed amount). The tip should be optional. By default the amount for the calculator should be for the subtotal but it should also be possible to invoke inverse tax on this Quebec tax calculation component. For this we need a toggle for an inverseTax boolean (with label "Taxes inverses" in French and "Inverse taxes" in English) that you will place below the amount input field. The label for the amount input box needs to be "Sous-total (avant taxes)" for the forward calculation and "Total (après taxes)" for the inverse tax calculation. All optional features should be changed using a toggle instead of a checkbox.

The QST should be calculated on the subtotal not the sum of the subtotal and the GST.

Make sure you round the QST and GST amounts before calculating the total with taxes.

The top banner should have the name of the app ("Calculateur de taxes du Québec" in French) and below in small font, the purpose of the app ("Calculez les taxes du Québec (TPS + TVQ) avec pourboire optionnel" in French). Allow for a logo on the left for the banner.

In the result panel, you should put:
- Subtotal
- GST
- QST
- Total with taxes
- Tip amount (if the option was selected)
- Grand total (sum of total with taxes and tip amount)

It should be possible to consult the app either in French or English and it will be French by default.

The input fields for the amount and the tip amount should be of type number and not type text.

Make my website installable as a Progressive Web App. Include appropriate icons, theme colors, display preferences, and orientation settings. Generate the necessary HTML code for linking the manifest and verifying proper implementation. The PWA should be built by using the vite-plugin-pwa plugin to generate the list of assets to install. For the web app manifest, use these values for these fields:

- name: "Calculateur de taxes du Québec | Quebec Tax Calculator"
- short_name:"Taxes QC"
- description:" Calculez les taxes du Québec (TPS + TVQ) avec pourboire optionnel | Calculate Quebec taxes (GST + QST) with optional tip calculation"
- theme_color":"#2563eb"
- background_color":"#f0f9ff"
- lang:"fr-CA"

You should provide icons images and the screenshots and specify them in the manifest.

Based on the manifest, generate the Open Graph metadata and include it in the HTML file. The URL of the app will be https://piweb.hubformation.ca/prof01/taxes so that's what you should use for the og:url metadata. The main language will be fr_CA.
```

Puis

```
Can you change the presentation of the amounts so that in French it is using fr-ca (100,00 $ for instance) and in English it is using en-ca ($100.00 for instance)?
```

#### Réponse

I've successfully built your Quebec Tax Calculator with all the requested features:

Main Features:

- Forward tax calculation (subtotal → total with taxes)
- Inverse tax calculation (total with taxes → subtotal) with a toggle
- Optional tip calculation (percentage or fixed amount)
- Bilingual support (French/English, defaults to French)
- GST (5%) and QST (9.975%) calculated on subtotal
- All amounts properly rounded before final calculations

Design:

- Clean, professional interface with blue theme
- Calculator icon logo in the header banner
- Toggle switches instead of checkboxes
- Responsive layout with separate input and results panels
- Language switcher in the top-right corner

PWA Implementation:

- Fully installable Progressive Web App
- App icons (192x192, 512x512, and maskable variant)
- App screenshots for mobile and desktop
- Complete web manifest with proper metadata
- Service worker for offline functionality
- Open Graph metadata for social sharing 

Technical Details:

- The app correctly labels the amount field based on calculation mode
- QST and GST are calculated on the subtotal (not cumulative)
- All tax amounts are rounded to 2 decimal places before calculating totals
- Number input fields for amount and tip
- Results show: Subtotal, GST, QST, Total with taxes, Tip amount (when enabled), and Grand total

The application is ready to use and can be installed on any device as a native-like app.

Sur https://bolt.new/~/sb1-kz72e46x attaché à benoit.dubuc@hubformation.ca

### Prompt abrégé pour les formations

Version anglaise:

```
I would like you to build a tax calculator for Quebec with the possibility of including tip (as a percentage of the subtotal or a fixed amount). The tip should be optional. By default the amount for the calculator should be for the subtotal but it should also be possible to invoke inverse tax on this Quebec tax calculation component. For this we need a toggle for an inverseTax boolean (with label "Taxes inverses" in French and "Inverse taxes" in English) that you will place below the amount input field. The label for the amount input box needs to be "Sous-total (avant taxes)" for the forward calculation and "Total (après taxes)" for the inverse tax calculation. All optional features should be changed using a toggle instead of a checkbox.

The QST should be calculated on the subtotal not the sum of the subtotal and the GST.

The top banner should have the name of the app ("Calculateur de taxes du Québec" in French) and below in small font, the purpose of the app ("Calculez les taxes du Québec (TPS + TVQ) avec pourboire optionnel" in French). Allow for a logo on the left for the banner.

In the result panel, you should put:
- Subtotal
- GST
- QST
- Total with taxes
- Tip amount (if the option was selected)
- Grand total (sum of total with taxes and tip amount)

It should be possible to consult the app either in French or English and it will be French by default.
```

Puis

```
Make sure you round the QST and GST amounts before calculating the total with taxes.
```

Puis

```
The input fields for the amount and the tip amount should be of type number and not type text.
```

Puis

```
Can you change the presentation of the amounts so that in French it is using fr-ca (100,00 $ for instance) and in English it is using en-ca ($100.00 for instance)?
```

## Déploiement

Ça prend quelques secondes pour mettre en ligne :

```
npm run build && rsync -r --delete dist/ prod.hubformation.ca:/web/hubformation/projets/apps/web/taxes/
```

mais de conway

```
npm run build && rsync -r --delete dist/ prod:/web/hubformation/projets/apps/web/taxes/ 
```
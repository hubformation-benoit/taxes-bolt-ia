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
I would like you to build a tax calculator for Quebec with the possibility of including tip (percentage of fixed amount). The tip should be optional. By default the amount for the calculator should be for the subtotal but it should also be possible to invoke inverse tax on this Quebec tax calculation component. For this we need a toggle for an inverseTax boolean (with label "Taxes inverse" in French and "Inverse tax" in English) that you will place below the amount input field. The label for the amount input box needs to be "Sous-total (avant taxes)" for the forward calculation and "Total (après taxes) for the inverse tax calculation.

The top banner should have the name of the app (Calculateur de taxes du Québec in french) and below in small font, the purpose of the app ("Calculez les taxes du Québec (TPS + TVQ) avec pourboire optionnel" in French). Allow for a logo on the left for the banner.

In the result panel, you should put:
- subtotal
- gst
- qst
- total with taxes
- tip amount
- grand total (sum of total with taxes and tip amount)

It should be possible like to consult the app either in French or English and it will be French by default.

The input fields for the amount and the tip amount should be of type number and not type text.

The web app manifest file should be
{"name":"Calculateur de taxes du Québec | Quebec Tax Calculator","short_name":"Taxes QC","description":" Calculez les taxes du Québec (TPS + TVQ) avec pourboire optionnel | Calculate Quebec taxes (GST + QST) with optional tip calculation","start_url":"/","display":"standalone","orientation":"portrait-primary","theme_color":"#2563eb","background_color":"#f0f9ff","lang":"fr-CA","scope":"/","categories":["finance","utilities","productivity"],"icons":[{"src":"/icons/icon-72x72.png","sizes":"72x72","type":"image/png","purpose":"maskable any"},{"src":"/icons/icon-96x96.png","sizes":"96x96","type":"image/png","purpose":"maskable any"},{"src":"/icons/icon-128x128.png","sizes":"128x128","type":"image/png","purpose":"maskable any"},{"src":"/icons/icon-144x144.png","sizes":"144x144","type":"image/png","purpose":"maskable any"},{"src":"/icons/icon-152x152.png","sizes":"152x152","type":"image/png","purpose":"maskable any"},{"src":"/icons/icon-192x192.png","sizes":"192x192","type":"image/png","purpose":"maskable any"},{"src":"/icons/icon-384x384.png","sizes":"384x384","type":"image/png","purpose":"maskable any"},{"src":"/icons/icon-512x512.png","sizes":"512x512","type":"image/png","purpose":"maskable any"}],"shortcuts":[{"name":"Taxes Qc","short_name":"Calculer tx","description":"Ouvrir le calculateur de taxes directement | Open the tax calculator directly","url":"/","icons":[{"src":"/icons/icon-192x192.png","sizes":"192x192"}]}],"screenshots":[{"src":"/screenshots/desktop-screenshot.png","sizes":"1280x720","type":"image/png","form_factor":"wide","label":"Calculateur des taxes du Québec | Quebec Tax Calculator (desktop)"},{"src":"/screenshots/mobile-screenshot.png","sizes":"390x844","type":"image/png","form_factor":"narrow","label":"Calculateur des taxes du Québec | Quebec Tax Calculator (mobile)"}]}

You should provide icons images and the screenshots as specified in the manifest.

Make my website installable as a Progressive Web App. Include appropriate icons, theme colors, display preferences, and orientation settings. Generate the necessary HTML code for linking the manifest and verifying proper implementation. The PWA should be built by using the vite-plugin-pwa plugin to generate the list of assets to install.

Based on the manifest, generate the Open Graph metadata and include it in the HTML file. The URL of the app will be https://apps.hubformation.ca/taxes so that's what you should use for the og:url metadata. The main language will be fr_CA.
```


Then
```
The tip should be optional so add a toggle for that. The inverse tax should use a toggle instead of a checkbox. The result pane should show the tip amount before the grand total and the tip amount should be calculated on the subtotal (amount before taxes)
``

Then
```
The QST should be calculated on the subtotal not the sum of the subtotal and the GST.
````

https://bolt.new/~/sb1-ftgi3btw (attaché à benoit.dubuc@toumoro.com)

## Déploiement

Ça prend quelques secondes pour mettre en ligne :

```
npm run build && rsync -r --delete dist/ prod.hubformation.ca:/web/hubformation/projets/apps/web/taxes/
```

mais de conway

```
npm run build && rsync -r --delete dist/ prod:/web/hubformation/projets/apps/web/taxes/ 
```
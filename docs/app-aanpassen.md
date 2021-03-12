# Maak je eigen wandelapp

Deze handleiding kan gebruikt worden om de app aan te passen voor jouw wandelproject.
Enige handigheid met programmeercode en webhosting is vereist.

## Code downloaden
[Download de code van het project](https://github.com/VEZwolle/wandelapp/archive/master.zip) naar je eigen computer.

## Accounts aanmaken
De app maakt gebruik van een tweetal externe services.
Maak hiervoor (gratis) accounts aan en pas de gegevens aan in het `.env` bestand, in de hoofdmap van het project.

### Mapbox
Mapbox wordt gebruikt voor het renderen van de routekaart.
Maak een account aan via https://account.mapbox.com/auth/signup/ en kopieer je [access token](https://docs.mapbox.com/help/glossary/access-token/) naar het `.env` bestand.

### Google Analytics
Google Analytics wordt gebruikt voor statistieken en het opslaan van de 5-sterren beoordelingen. Maak een Universal Analytics-property aan, zie https://support.google.com/analytics/answer/10269537. Kopieer daarna je [tracking-ID](https://support.google.com/analytics/answer/7372977) naar het `.env` bestand.

## Installeren

### Installeer Node.js
Om de app lokaal te kunnen testen moet je [Node.js](https://nodejs.org/) hebben geïnstalleerd.

### Installeer de dependencies
Voer onderstaand command uit vanuit je terminal, in de hoofdmap van het project:
```bash
npm install
```

### Start de app
Start de lokale server, zodat je de app kan testen in je browser:
```bash
npm run serve
```

## Route aanpassen
Alle checkpoints, filmpjes en routepaden zijn geconfigureerd in `sections.json` in de hoofdmap van het project.

### Section velden
Elk section object bevat de volgende velden:
| Veld   | Type     | Beschrijving                                                        | Voorbeeld                                             |
| ------ | -------- | ------------------------------------------------------------------- | ----------------------------------------------------- |
| code   | `string` | Unieke code voor dit checkpoint (wordt gebruikt als URL slug)       | `"e6d26z"`                                            |
| name   | `number` | Naam die wordt getoond voor dit checkpoint                          | `"Startpunt"`                                         |
| videos | `array`  | Array met video objecten (zie hieronder)                            | *Zie hieronder*                                       |
| camera | `object` | [CameraOptions][cameraoptions] om de route goed in beeld te brengen | `{"center": [6.086, 52.547], "zoom": 15}`             |
| radius | `number` | Aantal meter waarbinnen het checkpoint wordt geactiveerd            | `20`                                                  |
| route  | `array`  | Array met [long, lat] punten van de route naar het checkpoint.      | `[[6.087, 52.547], [6.087, 52.548], [6.087, 52.548]]` |

[cameraoptions]: https://docs.mapbox.com/mapbox-gl-js/api/properties/#cameraoptions

> Tip: gebruik een tool als https://geojson.io/ voor het uitstippelen van de route array.

### Video velden
Elk video object bevat de volgende velden
| Veld | Type     | Beschrijving                                 | Voorbeeld                            |
| ---- | -------- | -------------------------------------------- | ------------------------------------ |
| key  | `string` | Unieke key voor deze video                   | `"ze2in5_volwassenen"`               |
| slug | `string` | URL slug voor deze video                     | `"volwassenen"`                      |
| name | `string` | Naam die wordt getoond voor deze video       | `"Volwassenen"`                      |
| icon | `string` | Afbeelding die wordt getoond voor deze video | `"adults"`                           |
| src  | `string` | URL naar het videobestand                    | `"https://voorbeeld.nl/filmpje.mp4"` |

## Publiceren
Zodra je de app klaar hebt kun je hem online zetten. Hiervoor moet je een hosting omgeving hebben waarop je de code kan publiceren.

> Tip: [Netlify](https://www.netlify.com/) is een geschikt platform om de web app op te hosten. Ze bieden een ruim gratis account aan.

### Productiebuild maken
Je kunt de code niet 1-op-1 kopiëren naar de hosting omgeving. Eerst moet er een productiebuild gemaakt worden, d.m.v. het volgende command:
```bash
npm run build
```

Dit command maakt de `/dist` map aan. Hierin vind je gebundelde en 'minified' code, die je kunt uploaden naar je hosting omgeving.

> Problemen met URL's? Stel je server in om alle requests naar `index.html` te leiden. Zie https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations.

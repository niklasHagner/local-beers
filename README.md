# local-beers 🍺

## API deactivated December 2022 😔

From
https://systembevakningsagenten.se/
```
Systembolaget tvingar oss stänga
För en tid sedan blev vi kontaktade av en advokatfirma som företräder Systembolaget. De ansåg att vi bröt mot de allmänna villkoren, närmare bestämt punkt 1.7:

"Det är inte tillåtet att använda tekniska lösningar eller automatiska verktyg som exempelvis så kallade agenter, robotar, crawlers eller spindlar i anslutning till Webbplatsen eller Appen för att registrera eller reproducera information, lämna eller göra beställningar, nyttja tjänster eller för att samla in information från eller om Webbplatsen eller Appen i syfte att tillhandahålla funktioner eller tjänster relaterat till marknadsföring av, eller information om alkoholdrycker eller alkoholdrycksliknande preparat."

Tydligen räcker det med att surfa in på Systembolagets webb för att godkänna dessa villkor.

De bad om en förklaring och vi förklarade att det stämmer, vi hämtar automatiskt information och vi läser robots.txt (som har varit praxis för webben sedan 90-talet), där det framgår att det är ok att crawla sidorna.

Advokaternas svar är att det inte innebär att det är tillåtet att "skrapa sidan på det sätt Systembevakningsagenten gör". Det ses som en "omständighet" att "Systembolagets webbplats gjorts sökbar för söktjänster", man får fortfarande inte hämta information från webbplatsen med tekniska lösningar.

Det är givetvis tråkigt att Systembolaget för första gången sedan 2008 väljer att höra av sig till oss via advokater, istället för att föra en sansad dialog. Men vi är inte de enda, andra tjänster och personer har också kontaktats. Systembolaget verkar vilja dölja något, eftersom de ser det som nödvändigt att tysta andra. Skälet att deras uppdrag skulle vara så känsligt och att de därför måste vara de enda som tillhandahåller sin information, håller inte riktigt.

Även om Systembolaget är ett statligt bolag så omfattas de inte fullt ut av offentlighetsprincipen, vilket betyder att information som rör bolaget eller som bolaget skapar inte nödvändigtvis är offentlig handling som är tillgänglig för medborgare. Trots att en utredning redan 2004 föreslog sätt att öka insynen har ingenting hänt ännu.

Med detta sagt stänger Systembevakningsagenten ner sin verksamhet den 9 december 2022, efter 14 år. Vi har varken tid eller pengar att föra någon strid mot ett statligt monopol. Tack till alla som använt tjänsten och engagerat er, vi vet att den har varit uppskattad!

```

## Description

* show newest beers (with ratebeer rankings) in Systembolaget's assortment
* find your closest Systembolag and list noteable beers in stock

* design inspired by brew for mac :smile:
![image](https://i.imgur.com/nyQxGha.png)

## Howto
* `npm install`, `node server.js`, browse to `localhost`
* `server.js` serves `public/index.html` which calls endpoints on the server for retrieving json data

* built on https://systembevakningsagenten.se/api

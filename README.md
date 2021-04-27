# Esercitazione 2
Sviluppare un webserver che gestisca la raccolta di informazioni relative a una linea di produzione.

Supponiamo di avere una linea di produzione dalla quale arrivano chiamate API che contengono gli aggiornamenti riguardo le lavorazioni che vengono eseguite.

Le api dovranno fornire gli endpoint per:
- poter salvare i nuovi log: `POST /api/logs`
- poter vedere i log: `GET /api/logs`
- poter vedere lo stato attuale della linea: `GET /api/status`
- poter vedere l'ultimo stato disponibile per una commessa: `GET /api/commesse/:codice`

### POST /api/logs
Permette di salvare un nuovo log.

Esempio del contenuto del body:
```jsonc
{
    "data": "2021-04-27T09:22:51.313Z", // Date, è la data del log
    "commessa": "a2021_01", // string, rappresenta il codice dell'ordine
    "cliente": "ITS Kennedy", // string
    "prodotto": "tappo", // string
    "quantitaPrevista": 100, // number, è la quantità prevista dall'ordine
    "stato": "attiva", // string, può essere attiva, conclusa, cancellata, errore
    "quantitaProdotta": 15, //number
    "errore": null // o una stringa che descrive l'errore che si è verificato
}
```
Ogni log viene salvato come nuovo record a database, senza controllare se è cambiato qualcosa.

### GET /api/logs
Permette di tornare i log salvati, filtrabili per:
- intervallo di date
- commessa
- stato

I filtri devono essere combinabili tra di loro.


### GET /api/status
Torna l'ultimo log disponibile se ci sono aggiornamenti nelle ultime 2 ore, altrimenti torna:

```json
{
    "stato": "idle"
}
```

### GET /api/commesse/:codice
Ritorna l'ultimo log disponibile per il codice commessa richiesto, se non è presente alcun log per quel codice torna 404.



## Indicazioni generali:
- tutte le librerie di cui avete bisogno sono già configurate nel file ```package.json```, lanciate ```npm install``` prima di avviare il programma.
- c'è un unico schema da creare, quello dei log. Tutte le API funzionano lavorando con quello schema.
- per la chiamata GET `/api/status` è necessario calcolare la data 2 ore indietro. `moment` è già installato e il codice per calcolare quella data è:
```javascript
const moment = require('moment');

const twoHoursAgo = moment().subtract(2, 'h').toDate();
```
- non fatevi ingannare dalla API `GET /api/commesse/:codice`, il fatto che accetti il codice e non un id non cambia nulla. Il parametro è sempre accessibile tramite `req.params.codice`.



## Bonus
- sviluppare una API `GET /api/commesse` che torna la lista delle commesse presenti a sistema, con le informazioni generali e l'ultimo stato:
```json
    [{
        "commessa": "a2021_01",
        "cliente": "ITS Kennedy",
        "prodotto": "tappo",
        "quantitaPrevista": 100,
        "stato": "attiva"
    }, {
        ...
    }]
```
- sviluppare una API `GET /api/commesse/:codice/logs` che torni i log della commessa, o 404 se il codice non esiste.
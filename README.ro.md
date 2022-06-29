[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)]()

![Logo](https://firebasestorage.googleapis.com/v0/b/volunteerish-ed549.appspot.com/o/documentation%2FLogo.png?alt=media&token=2357a1c1-7f34-47c6-b1d0-449d67904e00)

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)]()

#  Volunteerish

Volunteerish este o aplicație web NextJS, construită folosind Firebase pentru autentificare și baza de date, care conectează direct, fără intermediari, oamenii care au nevoie de ajutor cu cei care sunt dispuși să facă să ajute.[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)]()

## ➤ Caracteristici

- Comutare mod luminos / mod întunecat
- Suport pentru limbi multiple
- Suport pentru mărimea fontului
- Disponibil pe mai multe platforme
- Mesagerie integrată în aplicație
- Optimizat pentru SEO
- Mobile friendly

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)]()

## Autentificare

Pagina de autentificare oferă comutarea modului întunecat, schimbarea limbii și opțiunea de recuperare a parolei uitate.

![Login page](https://firebasestorage.googleapis.com/v0/b/volunteerish-ed549.appspot.com/o/documentation%2Flogin.png?alt=media&token=6f1926c8-764a-4d86-bda5-ed20be4b71ee)

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)]()

## Înregistrare

Pagina de înregistrare oferă și ea opțiunea de a comuta modul întunecat și de a schimba limba. Atât pagina de autentificare, cât și pagina de înregistrare au un sistem de eroare explicit, care oferă utilizatorului informațiile corecte despre ceea ce este greșit și unde.

![Register page](https://firebasestorage.googleapis.com/v0/b/volunteerish-ed549.appspot.com/o/documentation%2Fregister.png?alt=media&token=fcf8dfb2-ac30-4718-8644-38e83837ebfe)

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)]()

## ➤ Acasă

Meniul Acasă conține informații precum persoane care au fost ajutate, persoane care sunt în prezent ajutate și anunțuri postate de utilizator. Există, de asemenea, informații despre numărul de puncte (a se vedea mai multe în secțiunea magazinului) și numărul de persoane ajutate.

![Home menu](https://firebasestorage.googleapis.com/v0/b/volunteerish-ed549.appspot.com/o/documentation%2Fhome.png?alt=media&token=02c5b9b4-8343-4dcf-872e-d53212283563)

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)]()

## ➤ Anunțuri

În secțiunea de anunțuri, utilizatorii pot răspunde la cererile altor persoane de ajutor, precum și să posteze cererile de ajutor. În partea de sus a meniului se află un filtru cu care utilizatorii pot filtra anunțurile în funcție de: țară, stat, oraș, dificultate, data publicării. De asemenea, în colțul din dreapta jos se află butonul cu care utilizatorii pot adăuga anunțuri de ajutor.

![Announces page](https://firebasestorage.googleapis.com/v0/b/volunteerish-ed549.appspot.com/o/documentation%2Fannounces.png?alt=media&token=a64b452d-afc3-480d-ae9d-f900f23fd10d)

Când apăsați butonul, un meniu se va deschide acolo unde se va completa, după cum caz, cu descrierea anunțului, dificultatea acestuia și categoria din care face parte anunțul. Detalii precum țara, statul și orașul sunt introduse automat din datele furnizate de utilizator la înregistrare și pot fi modificate.

![Add new announce page](https://firebasestorage.googleapis.com/v0/b/volunteerish-ed549.appspot.com/o/documentation%2FaddAnnounce.png?alt=media&token=4f3ceefb-58e7-49d3-8a75-687cbadf27d6)

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)]()

## ➤ Magazim

În secțiunea magazinului există un mini magazin cu produse personalizate cu logo -ul și sloganul nostru sau cu alte accesorii sau articole vestimentare. Acestea pot fi cumpărate cu punctele obținute atunci când utilizatorul ajută o persoană.

Punctele sunt calculate în funcție de categoria din care aparțin anunțurile și dificultatea acesteia.

![Shop](https://firebasestorage.googleapis.com/v0/b/volunteerish-ed549.appspot.com/o/documentation%2Fshop.png?alt=media&token=c5dd5111-1ac4-454c-8f71-2371ee582a7c)

### Coș de cumpărături

În coșul de cumpărături puteți vedea toate produsele adăugate, gestionați -le cantitatea sau le eliminați din coș. Aici puteți vedea câte produse aveți în coș, costul total al acestora, punctele disponibile și dacă le puteți cumpăra sau nu.

![Shopping cart](https://firebasestorage.googleapis.com/v0/b/volunteerish-ed549.appspot.com/o/documentation%2Fcart.png?alt=media&token=72cbb378-6b32-4167-b662-8e113779de0b)

### Pagina produsului

În pagina produsului puteți vedea informații despre preț, dacă produsul este în stoc, puteți vizualiza câteva imagini ale produsului și puteți citi descrierea acestuia.

![Product page](https://firebasestorage.googleapis.com/v0/b/volunteerish-ed549.appspot.com/o/documentation%2Fproduct.png?alt=media&token=1281ec4f-fb6e-4ac0-9441-a313602bd67a)

### Achiziții

Platforma are, de asemenea, un sistem de achiziții (numai la nivelul bazei de date), unde când ați cumpărat ceva, acesta este salvat în baza de date sub formă de comenzi. Puteți vizualiza ce produse ați cumpărat, cantitatea lor și când au fost făcute cumpărate.

![Purchases](https://firebasestorage.googleapis.com/v0/b/volunteerish-ed549.appspot.com/o/documentation%2Fpurchases.png?alt=media&token=3535a03f-2c33-440e-8d31-2dda99792d3f)

### Sistemul de puncte

| Category | Easy | Medium | Hard |
| ----------------------- | -- | -- | -- |
| Cumpărături alimentare  | 10 | 25 | 40 |
| Meditații școlare       | 40 | 50 | 60 |
| Cumpărături             | 10 | 10 | 25 |
| Curățenie               | 20 | 35 | 50 |
| Plimbat                 | 15 | 30 | 45 |
| Gătit                   | 25 | 45 | 60 |
| Plata facturilor        | 15 | 20 | 30 |
| Suport emoțional        | 20 | 40 | 60 |
| Muncă fizică            | 40 | 60 | 80 |
| Muncă solicitantă       | 40 | 60 | 80 |

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)]()

## ➤ Mesaje

În secțiunea Mesaje, utilizatorii pot comunica între ei prin mesaje text. Conversațiile pot fi inițiate fie de către persoana care solicită ajutor, fie de către persoana care ajută, din pagina de mesaje.

![Messages](https://firebasestorage.googleapis.com/v0/b/volunteerish-ed549.appspot.com/o/documentation%2Fconversations.png?alt=media&token=0bc2f5cf-4db6-4464-8c38-9393b54c3fa9)

Mesajele sunt transmise instantaneu prin baza de date în timp real. Oferim caracteristici, cum ar fi defilarea în jos și încărcarea paginată.

![Conversation](https://firebasestorage.googleapis.com/v0/b/volunteerish-ed549.appspot.com/o/documentation%2Fmessages.png?alt=media&token=6c393c4b-66b2-4d3b-831d-b7e9f965c61b)

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)]()

## Setări

Pagina Setări este împărțită în 4 pagini: Setările aplicației, Setări contului, Ajutor și asistență și Achiziții.

![Settings mobile](https://firebasestorage.googleapis.com/v0/b/volunteerish-ed549.appspot.com/o/documentation%2FsettingsMobile.png?alt=media&token=6b14a3fd-a9f8-4a23-bf09-b7d205d09482)

### Setările aplicației

În setările aplicației puteți comuta între modul întuneric și lumină, puteți schimba limba aplicației sau puteți schimba dimensiunea fontului, pentru a -l face mai mic sau mai mare.

![App settings](https://firebasestorage.googleapis.com/v0/b/volunteerish-ed549.appspot.com/o/documentation%2Fapp.png?alt=media&token=e6c92908-537d-4ee0-b0f1-07767efb84ec)

### Setările contului

În această pagină, utilizatorul poate schimba informații precum numele, imaginea de profil, e -mailul, își poate verifica e -mailul sau poate schimba adresa sa.

![Account settings](https://firebasestorage.googleapis.com/v0/b/volunteerish-ed549.appspot.com/o/documentation%2Faccount.png?alt=media&token=d96ba252-c992-414b-84ef-8ca4998981cc)

### Ajutor și asistență

Pagina de ajutor oferă răspunsuri pentru cele mai frecvente întrebări.

![Help page](https://firebasestorage.googleapis.com/v0/b/volunteerish-ed549.appspot.com/o/documentation%2Fhelp.png?alt=media&token=02183ad2-57d7-492b-90aa-c5abe9ae22e0)


## Securitate

Pentru securitatea bazei de date, Firebase îmi permite să creez anumite reguli personalizate pentru a limita atât accesul, cât și cererile la baza de date.

![Firebase security](https://firebasestorage.googleapis.com/v0/b/volunteerish-ed549.appspot.com/o/documentation%2Fcode.png?alt=media&token=7883641d-f4b3-4e34-8b3a-ed747d244e25)

Nimeni nu are acces la document cu datele personale ale unui utilizator decât dacă deține documentul, el ajută respectivul sau este ajutat de respectivul respectiv. În acest fel, limităm accesul la datele personale. De asemenea, același principiu se aplică mesajelor.


## Tehnologii

**Client:** React, NextJS, NextUI

**Server:** Node, Firebase

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)]()

## ➤ Framework-uri și resurse

 - [NextJS](https://nextjs.org/) - Am folosit NextJS datorită performanței sale mult mai bune decât React, prin SSR care îmi permite să fac solicitare la baza de date pe server, reducând timpul pe care utilizatorul îl așteaptă să fie livrate datele.
 - [NextUI](https://nextui.org/) - Biblioteca de componente folosite pentru a face proiectarea și responsivitatea aplicației.
 - [SwiperJS](https://swiperjs.com/) - Am folosit acest framework JS pentru a crea meniul „Creați cont nou” care presupune utilizatorul să parcurgă 6 diapozitive și pe pagina unui produs, unde îl folosesc să creez caruselul pentru imagini.
 - [Firebase](https://firebase.google.com/) - Pentru autentificare, stocarea fișierelor, mesajelor și datelor utilizatorilor.
 - [Undraw](https://undraw.co/) - Toate SVG -urile din aplicație au fost preluate de pe acest site.
 - [Printful](https://www.printful.com/) - Am folosit platforma lor pentru a crea produse personalizate pentru magazin. Produsele au fost luate împreună cu pozele și descrierile lor.
 - [SVGR](https://react-svgr.com/) - Folosit pentru a utiliza direct SVG -uri în React.
 - [Country State City](https://github.com/harpreetkhalsagtbit/country-state-city) - Baza de date pentru gestionarea locației precisă și actualizată a utilizatorilor (țară, stat și oraș).
 - [Numbers abbreviation](https://gist.github.com/hanipcode/f1a6b172c37187e5d41b735f14db5278) - Am folosit acest gist pentru o prelucrearea numerelor mari

### Javascript (React)

```javascript
export function abbreviateNumber(number) {
  var s = ["", "K", "M", "B", "T", "P", "E"];
  const tier = (Math.log10(number) / 3) | 0;

  if (tier == 0) return number;

  const suffix = s[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = number / scale;

  return scaled.toFixed(1) + suffix;
}
```
- [Loading spinner](https://www.instagram.com/p/CeITsnjjG0n/) - Am folosit această postare pentru loading spinner

### Javascript (React)

```javascript
const Loading = () => {
  return (
    <section className={styles.wrapper}>
      <div className={`${styles.square} ${styles.r0}`}></div>
      <div className={`${styles.square} ${styles.r1}`}></div>
      <div className={`${styles.square} ${styles.r2}`}></div>
      <div className={`${styles.square} ${styles.r3}`}></div>
      <div className={`${styles.square} ${styles.r4}`}></div>
      <div className={`${styles.square} ${styles.r5}`}></div>
      <div className={`${styles.square} ${styles.r6}`}></div>
      <div className={`${styles.square} ${styles.r7}`}></div>
      <div className={`${styles.square} ${styles.r8}`}></div>
      <div className={`${styles.square} ${styles.r9}`}></div>
      <div className={`${styles.square} ${styles.r10}`}></div>
      <div className={`${styles.square} ${styles.r11}`}></div>
      <div className={`${styles.square} ${styles.r12}`}></div>
      <div className={`${styles.square} ${styles.r13}`}></div>
      <div className={`${styles.square} ${styles.r14}`}></div>
      <div className={`${styles.square} ${styles.r15}`}></div>
      <div className={`${styles.square} ${styles.r16}`}></div>
      <div className={`${styles.square} ${styles.r17}`}></div>
    </section>
  );
};
```
### SCSS

```scss
.wrapper {
  position: absolute;
  inset: 0;
  background-color: var(--nextui-colors-background);
}

.square {
  height: 100vh;
  position: absolute;
  inset: 0;
  animation-duration: 5s;
  animation-iteration-count: infinite;
  border: 3px solid var(--nextui-colors-red500);
  margin: auto;
  height: 20rem;
  width: 20rem;

  &.r0 {
    animation-name: r0;
  }
  &.r1 {
    animation-name: r1;
  }
  &.r2 {
    animation-name: r2;
  }
  &.r3 {
    animation-name: r3;
  }
  &.r4 {
    animation-name: r4;
  }
  &.r5 {
    animation-name: r5;
  }
  &.r6 {
    animation-name: r6;
  }
  &.r7 {
    animation-name: r7;
  }
  &.r8 {
    animation-name: r8;
  }
  &.r9 {
    animation-name: r9;
  }
  &.r10 {
    animation-name: r10;
  }
  &.r11 {
    animation-name: r11;
  }
  &.r12 {
    animation-name: r12;
  }
  &.r13 {
    animation-name: r13;
  }
  &.r14 {
    animation-name: r14;
  }
  &.r15 {
    animation-name: r15;
  }
  &.r16 {
    animation-name: r16;
  }
  &.r17 {
    animation-name: r17;
  }

  @keyframes r0 {
    50% {
      border-radius: 50%;
      -webkit-transform: rotate(270deg);
      transform: rotate(270deg);
      height: 6rem;
    }
  }

  @keyframes r1 {
    50% {
      border-radius: 50%;
      -webkit-transform: rotate(260deg);
      transform: rotate(260deg);
      height: 6rem;
    }
  }

  @keyframes r2 {
    50% {
      border-radius: 50%;
      -webkit-transform: rotate(250deg);
      transform: rotate(250deg);
      height: 6rem;
    }
  }

  @keyframes r3 {
    50% {
      border-radius: 50%;
      -webkit-transform: rotate(240deg);
      transform: rotate(240deg);
      height: 6rem;
    }
  }

  @keyframes r4 {
    50% {
      border-radius: 50%;
      -webkit-transform: rotate(230deg);
      transform: rotate(230deg);
      height: 6rem;
    }
  }

  @keyframes r5 {
    50% {
      border-radius: 50%;
      -webkit-transform: rotate(220deg);
      transform: rotate(220deg);
      height: 6rem;
    }
  }

  @keyframes r6 {
    50% {
      border-radius: 50%;
      -webkit-transform: rotate(210deg);
      transform: rotate(210deg);
      height: 6rem;
    }
  }

  @keyframes r7 {
    50% {
      border-radius: 50%;
      -webkit-transform: rotate(200deg);
      transform: rotate(200deg);
      height: 6rem;
    }
  }

  @keyframes r8 {
    50% {
      border-radius: 50%;
      -webkit-transform: rotate(190deg);
      transform: rotate(190deg);
      height: 6rem;
    }
  }

  @keyframes r9 {
    50% {
      border-radius: 50%;
      -webkit-transform: rotate(180deg);
      transform: rotate(180deg);
      height: 6rem;
    }
  }

  @keyframes r10 {
    50% {
      border-radius: 50%;
      -webkit-transform: rotate(170deg);
      transform: rotate(170deg);
      height: 6rem;
    }
  }

  @keyframes r11 {
    50% {
      border-radius: 50%;
      -webkit-transform: rotate(160deg);
      transform: rotate(160deg);
      height: 6rem;
    }
  }

  @keyframes r12 {
    50% {
      border-radius: 50%;
      -webkit-transform: rotate(150deg);
      transform: rotate(150deg);
      height: 6rem;
    }
  }

  @keyframes r13 {
    50% {
      border-radius: 50%;
      -webkit-transform: rotate(140deg);
      transform: rotate(140deg);
      height: 6rem;
    }
  }

  @keyframes r14 {
    50% {
      border-radius: 50%;
      -webkit-transform: rotate(130deg);
      transform: rotate(130deg);
      height: 6rem;
    }
  }

  @keyframes r15 {
    50% {
      border-radius: 50%;
      -webkit-transform: rotate(120deg);
      transform: rotate(120deg);
      height: 6rem;
    }
  }

  @keyframes r16 {
    50% {
      border-radius: 50%;
      -webkit-transform: rotate(110deg);
      transform: rotate(110deg);
      height: 6rem;
    }
  }

  @keyframes r17 {
    50% {
      border-radius: 50%;
      -webkit-transform: rotate(100deg);
      transform: rotate(100deg);
      height: 6rem;
    }
  }
}

```

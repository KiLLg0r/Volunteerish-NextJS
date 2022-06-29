[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)]()

![Logo](https://firebasestorage.googleapis.com/v0/b/volunteerish-ed549.appspot.com/o/documentation%2FLogo.png?alt=media&token=2357a1c1-7f34-47c6-b1d0-449d67904e00)

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)]()

# Volunteerish

Volunteerish is a NextJS web application, build using Firebase for authentication and database, that connects directly, without intermediaries, people who need help with those who are willing to do good.[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)]()

## ➤ Features

- Light/dark mode toggle
- Multi-language support
- Support for font-size
- Cross platform
- Integrated in-app messaging
- SEO optimized
- Mobile friendly

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)]()

## Login

The login page provide dark mode toggle, language switch and forgot password option.

![Login page](https://firebasestorage.googleapis.com/v0/b/volunteerish-ed549.appspot.com/o/documentation%2Flogin.png?alt=media&token=6f1926c8-764a-4d86-bda5-ed20be4b71ee)

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)]()

## Register

Register page also provide dark mode toggle and language switch. Both login and register page have an explicit error system who give to the user the right information about what is wrong and where.

![Register page](https://firebasestorage.googleapis.com/v0/b/volunteerish-ed549.appspot.com/o/documentation%2Fregister.png?alt=media&token=fcf8dfb2-ac30-4718-8644-38e83837ebfe)

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)]()

## ➤ Home

The Home menu contains information such as people who have been helped, people who are currently being helped, and announcements posted by the user. There is also information about the number of points (See more in the Shop section) and the number of people helped.

![Home menu](https://firebasestorage.googleapis.com/v0/b/volunteerish-ed549.appspot.com/o/documentation%2Fhome.png?alt=media&token=02c5b9b4-8343-4dcf-872e-d53212283563)

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)]()

## ➤ Announces

In the Announcements section, users can respond to other people's requests for help as well as post their requests for help. At the top of the menu is a filter with which users can filter the announcements depending on: country, state, city, difficulty, date of publication. Also in the lower right corner is the button with which users can add help announcements.

![Announces page](https://firebasestorage.googleapis.com/v0/b/volunteerish-ed549.appspot.com/o/documentation%2Fannounces.png?alt=media&token=a64b452d-afc3-480d-ae9d-f900f23fd10d)

When you press the button, a menu will open where it will be completed, as the case may be, with the description of the announcement, its difficulty and the category to which it belongs. Details such as country, state, and city are automatically entered from the data provided by the user upon registration and are subject to change.

![Add new announce page](https://firebasestorage.googleapis.com/v0/b/volunteerish-ed549.appspot.com/o/documentation%2FaddAnnounce.png?alt=media&token=4f3ceefb-58e7-49d3-8a75-687cbadf27d6)

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)]()

## ➤ Shop

In the Shop section there is a mini shop with personalized products with our logo and slogan or with other accessories or clothing items. These can be bought with the points obtained when the user helps a person.

The points are calculated according to the category to which the announcements belongs, and its difficulty.

![Shop](https://firebasestorage.googleapis.com/v0/b/volunteerish-ed549.appspot.com/o/documentation%2Fshop.png?alt=media&token=c5dd5111-1ac4-454c-8f71-2371ee582a7c)

### Shoping cart

In the shopping cart you can see all you added products, manage their quantity or remove them from the cart. Here you can see how many products you have in cart, their total cost, your available points and if you can buy them or not.

![Shopping cart](https://firebasestorage.googleapis.com/v0/b/volunteerish-ed549.appspot.com/o/documentation%2Fcart.png?alt=media&token=72cbb378-6b32-4167-b662-8e113779de0b)

### Product page

In the product page you can see information about the price, if the product is in stock, you can view some images of the product and read their description.

![Product page](https://firebasestorage.googleapis.com/v0/b/volunteerish-ed549.appspot.com/o/documentation%2Fproduct.png?alt=media&token=1281ec4f-fb6e-4ac0-9441-a313602bd67a)

### Purchases

The platform has also a purchases system (only database level) where when you bought something it is saved in the database in the form of orders. You can view what products you bought, their quantity and when the purchase were made.

![Purchases](https://firebasestorage.googleapis.com/v0/b/volunteerish-ed549.appspot.com/o/documentation%2Fpurchases.png?alt=media&token=3535a03f-2c33-440e-8d31-2dda99792d3f)

### Points system

| Category           | Easy | Medium | Hard |
| ------------------ | ---- | ------ | ---- |
| Groceries          | 10   | 25     | 40   |
| School meditations | 40   | 50     | 60   |
| Shopping           | 10   | 10     | 25   |
| Cleaning           | 20   | 35     | 50   |
| Walking            | 15   | 30     | 45   |
| Cooking            | 25   | 45     | 60   |
| Paying of bills    | 15   | 20     | 30   |
| Emotional support  | 20   | 40     | 60   |
| Physical labour    | 40   | 60     | 80   |
| Hard work          | 40   | 60     | 80   |

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)]()

## ➤ Messages

In the Messages section, users can communicate with each other through text messages and pictures. Conversations can be initiated either by the person requesting help or by the person helping, from the messages page.

![Messages](https://firebasestorage.googleapis.com/v0/b/volunteerish-ed549.appspot.com/o/documentation%2Fconversations.png?alt=media&token=0bc2f5cf-4db6-4464-8c38-9393b54c3fa9)

Messages are transmitted instantly via the real-time database. We provide feauture like scroll to botom and paginate loading.

![Conversation](https://firebasestorage.googleapis.com/v0/b/volunteerish-ed549.appspot.com/o/documentation%2Fmessages.png?alt=media&token=6c393c4b-66b2-4d3b-831d-b7e9f965c61b)

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)]()

## Settings

The settings page is divided in 4 pages: App settings, Account settings, Help & Support and Purchases.

![Settings mobile](https://firebasestorage.googleapis.com/v0/b/volunteerish-ed549.appspot.com/o/documentation%2FsettingsMobile.png?alt=media&token=6b14a3fd-a9f8-4a23-bf09-b7d205d09482)

### App settings

In the app settings you can switch between dark and light mode, change the app language or change the font size, to make it smaller or higher.

![App settings](https://firebasestorage.googleapis.com/v0/b/volunteerish-ed549.appspot.com/o/documentation%2Fapp.png?alt=media&token=e6c92908-537d-4ee0-b0f1-07767efb84ec)

### Account settings

In this page the user can change information like name, profile image, email, can verify his email or change his/her address.

![Account settings](https://firebasestorage.googleapis.com/v0/b/volunteerish-ed549.appspot.com/o/documentation%2Faccount.png?alt=media&token=d96ba252-c992-414b-84ef-8ca4998981cc)

### Help & Support

The help page provide answers for the most common questions.

![Help page](https://firebasestorage.googleapis.com/v0/b/volunteerish-ed549.appspot.com/o/documentation%2Fhelp.png?alt=media&token=02183ad2-57d7-492b-90aa-c5abe9ae22e0)

## Security

For the security of the database, Firebase lets me create certain personalized rules to limit both access and Requests at the database.

![Firebase security](https://firebasestorage.googleapis.com/v0/b/volunteerish-ed549.appspot.com/o/documentation%2Fcode.png?alt=media&token=7883641d-f4b3-4e34-8b3a-ed747d244e25)

Nobody has access to the document with a user's personal data unless he holds the document, he's helping the respective or is helped by the respective. In this way we limit access to personal data. Also the same principle applies to messages.

## Tech Stack

**Client:** React, NextJS, NextUI

**Server:** Node, Firebase

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)]()

## ➤ Frameworks and resources

- [NextJS](https://nextjs.org/) - I used NextJS due to its much better performance than React, through SSR that allows me to do request at the server database, reducing the time the user awaits for the data to be delivered
- [NextUI](https://nextui.org/) - Component library used to make the design and the responsiveness of the app.
- [SwiperJS](https://swiperjs.com/) - I used this JS framework to create the "Create new account" menu that assumes the user to go through 6 slides, and on the page of a shop, where I used to create the carousel for pictures.
- [Firebase](https://firebase.google.com/) - for authentication, storage of files, messages and user data
- [Undraw](https://undraw.co/) - All SVGs in the application have been taken from this site
- [Printful](https://www.printful.com/) - I used their platform to create customized products for shop. The products were taken together with their mockups and descriptions
- [SVGR](https://react-svgr.com/) - Used to directly use SVGs in React
- [Country State City](https://github.com/harpreetkhalsagtbit/country-state-city) - Database for precise and upadated location management of users (country, state, and city)
- [Numbers abbreviation](https://gist.github.com/hanipcode/f1a6b172c37187e5d41b735f14db5278) - I used this gist for very large numbers abbreviation

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

- [Loading spinner](https://www.instagram.com/p/CeITsnjjG0n/) - I used this post for the loading spinner

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

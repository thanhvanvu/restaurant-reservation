# Details

Date : 2022-10-27 14:32:02

Directory d:\\UH\\4351 - Fundamental of software\\project\\16 Table availability - Copy

Total : 47 files,  35043 codes, 206 comments, 503 blanks, all 35752 lines

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [back-end/.env](/back-end/.env) | Properties | 4 | 0 | 3 | 7 |
| [back-end/config/db.js](/back-end/config/db.js) | JavaScript | 11 | 1 | 4 | 16 |
| [back-end/controllers/authController.js](/back-end/controllers/authController.js) | JavaScript | 83 | 22 | 13 | 118 |
| [back-end/controllers/reservationController.js](/back-end/controllers/reservationController.js) | JavaScript | 40 | 8 | 6 | 54 |
| [back-end/middlewares/checkCurrentUser.js](/back-end/middlewares/checkCurrentUser.js) | JavaScript | 18 | 4 | 4 | 26 |
| [back-end/middlewares/errorHandler.js](/back-end/middlewares/errorHandler.js) | JavaScript | 24 | 5 | 5 | 34 |
| [back-end/middlewares/verifyToken.js](/back-end/middlewares/verifyToken.js) | JavaScript | 14 | 8 | 5 | 27 |
| [back-end/models/Reservation.js](/back-end/models/Reservation.js) | JavaScript | 59 | 23 | 15 | 97 |
| [back-end/models/User.js](/back-end/models/User.js) | JavaScript | 58 | 1 | 9 | 68 |
| [back-end/package-lock.json](/back-end/package-lock.json) | JSON | 2,398 | 0 | 1 | 2,399 |
| [back-end/package.json](/back-end/package.json) | JSON | 24 | 0 | 1 | 25 |
| [back-end/routes/authRoute.js](/back-end/routes/authRoute.js) | JavaScript | 15 | 1 | 8 | 24 |
| [back-end/routes/reservationRoute.js](/back-end/routes/reservationRoute.js) | JavaScript | 10 | 1 | 7 | 18 |
| [back-end/server.js](/back-end/server.js) | JavaScript | 27 | 9 | 10 | 46 |
| [front-end/README.md](/front-end/README.md) | Markdown | 38 | 0 | 33 | 71 |
| [front-end/package-lock.json](/front-end/package-lock.json) | JSON | 29,365 | 0 | 1 | 29,366 |
| [front-end/package.json](/front-end/package.json) | JSON | 51 | 0 | 1 | 52 |
| [front-end/public/index.html](/front-end/public/index.html) | HTML | 19 | 23 | 1 | 43 |
| [front-end/public/manifest.json](/front-end/public/manifest.json) | JSON | 15 | 0 | 1 | 16 |
| [front-end/src/App.css](/front-end/src/App.css) | CSS | 124 | 2 | 19 | 145 |
| [front-end/src/App.js](/front-end/src/App.js) | JavaScript | 64 | 16 | 12 | 92 |
| [front-end/src/actions/initalData.js](/front-end/src/actions/initalData.js) | JavaScript | 85 | 0 | 2 | 87 |
| [front-end/src/components/AppContext.js](/front-end/src/components/AppContext.js) | JavaScript | 3 | 0 | 2 | 5 |
| [front-end/src/components/Footer/Footer.css](/front-end/src/components/Footer/Footer.css) | CSS | 83 | 0 | 16 | 99 |
| [front-end/src/components/Footer/Footer.js](/front-end/src/components/Footer/Footer.js) | JavaScript | 98 | 0 | 7 | 105 |
| [front-end/src/components/Header/Header.css](/front-end/src/components/Header/Header.css) | CSS | 55 | 0 | 10 | 65 |
| [front-end/src/components/Header/Header.js](/front-end/src/components/Header/Header.js) | JavaScript | 74 | 6 | 7 | 87 |
| [front-end/src/components/Hero/Hero.css](/front-end/src/components/Hero/Hero.css) | CSS | 47 | 0 | 8 | 55 |
| [front-end/src/components/Hero/Hero.js](/front-end/src/components/Hero/Hero.js) | JavaScript | 15 | 0 | 4 | 19 |
| [front-end/src/components/Login/Login.css](/front-end/src/components/Login/Login.css) | CSS | 123 | 0 | 18 | 141 |
| [front-end/src/components/Login/Login.js](/front-end/src/components/Login/Login.js) | JavaScript | 90 | 11 | 20 | 121 |
| [front-end/src/components/Register/Register.css](/front-end/src/components/Register/Register.css) | CSS | 106 | 0 | 15 | 121 |
| [front-end/src/components/Register/Register.js](/front-end/src/components/Register/Register.js) | JavaScript | 105 | 13 | 20 | 138 |
| [front-end/src/components/ReservationHistory/ReservationHistory.css](/front-end/src/components/ReservationHistory/ReservationHistory.css) | CSS | 94 | 1 | 21 | 116 |
| [front-end/src/components/ReservationHistory/ReservationHistory.js](/front-end/src/components/ReservationHistory/ReservationHistory.js) | JavaScript | 80 | 7 | 9 | 96 |
| [front-end/src/components/ReservationHistory/ReservationHistoryItem.js](/front-end/src/components/ReservationHistory/ReservationHistoryItem.js) | JavaScript | 25 | 1 | 6 | 32 |
| [front-end/src/components/Reservation/Reservation.css](/front-end/src/components/Reservation/Reservation.css) | CSS | 292 | 3 | 40 | 335 |
| [front-end/src/components/Reservation/Reservation.js](/front-end/src/components/Reservation/Reservation.js) | JavaScript | 9 | 0 | 2 | 11 |
| [front-end/src/components/Reservation/ReservationItem.js](/front-end/src/components/Reservation/ReservationItem.js) | JavaScript | 491 | 30 | 37 | 558 |
| [front-end/src/components/UserProfile/UserProfile.css](/front-end/src/components/UserProfile/UserProfile.css) | CSS | 248 | 1 | 29 | 278 |
| [front-end/src/components/UserProfile/UserProfile.js](/front-end/src/components/UserProfile/UserProfile.js) | JavaScript | 15 | 0 | 2 | 17 |
| [front-end/src/components/UserProfile/UserProfileItem.js](/front-end/src/components/UserProfile/UserProfileItem.js) | JavaScript | 255 | 3 | 21 | 279 |
| [front-end/src/index.css](/front-end/src/index.css) | CSS | 76 | 2 | 18 | 96 |
| [front-end/src/index.js](/front-end/src/index.js) | JavaScript | 6 | 1 | 2 | 9 |
| [front-end/src/myriad-pro/example.html](/front-end/src/myriad-pro/example.html) | HTML | 21 | 0 | 4 | 25 |
| [front-end/src/myriad-pro/style.css](/front-end/src/myriad-pro/style.css) | CSS | 60 | 1 | 19 | 80 |
| [front-end/src/reducers/AppReducer.js](/front-end/src/reducers/AppReducer.js) | JavaScript | 26 | 2 | 5 | 33 |

[Summary](results.md) / Details / [Diff Summary](diff.md) / [Diff Details](diff-details.md)
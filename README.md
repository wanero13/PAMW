# Projekt na zajęcia "Programowanie aplikacji mobilnych i webowych"
Znajduje się w nim:
 - aplikacja bezstanowa serwująca PDFy - *pamw-serwer*
 - aplikacja stanowa - *pamw-flask* mająca połączenie z bazą danych Redis, w której są przechowywane dane użytkowników oraz identyfikatory sesji
 - aplikacja mobilna realizowana przy pomocy react-native
 - serwer autoryzujacy do aplikacji mobilnej
**Powyższe funkcje są w trakcie realizacji**

## Uruchomienie
Aby uruchomić aplikacje należy wejść do folderu PAWM (czyli lokalizacji pliku docker-compose.yml), a następnie wykonać komendy
**docker-compose build**
**docker-compose up**

Aplikacja główna znajduje się pod adresem **localhost:5000**, natomiast aplikacja serwująca pdfy pod adresem **localhost:3000**. Baza redis wystawiona jest na porcie standardowym 6379.

## Użycie
Aby się zarejestrować należy wejść pod adres **localhost:5000/register** lub **localhost:5000** i kliknąć w guzik **Rejestracja** w panelu nawigacyjnym na górze strony, i wpełnić formularz reestracji. Przykładowe dane: Jan, Kowal, janek, 12345678.
Po kliknięciu przycisku *Zarejestruj*, jeśli operacja się powiedzie, uzytkownik zostanie przekierowany na stronę głowną, na której zostanie wyświetlona informacja o pomyślnej rejstracji.

Następnie użytkownik może się zalogować klikając w panelu nawigacji w guzik **Logowanie**, lub przejść pod adres **localhost:5000/login** i wypełnić formularz logowania danymi konta - na przykład: janek, 12345678. Jeśli logowanie zostanie przeprowadzone poprawnie użytkownik zostanie przekierowany na stronę zalogowania. Aby się wylogować, należy kliknąć przycisk wyloguj w prawym górnym rogu ekranu. Po wylogowaniu użytkownik zostanie znowu przekierowany na strone głowną aplikacji.


## Swagger
Dokumentacja API w Swaggerze znajduje się pod adresem **loclhost:5000/swagger**. Na razie zawiera tylko bardzo prosty przykład.


##Heroku
REST API: **https://tranquil-spire-07170.herokuapp.com**
REST API - dokumentacja w swaggerze(do uzupełnienia): **https://tranquil-spire-07170.herokuapp.com/swagger/**

Aplikacja webowa: **https://hidden-sea-70877.herokuapp.com/**

Istniejące kąto: login:janek , hasło:12345678

##Aplikacja mobilna
Serwer został poszerzony o aplikację mobilną i serwer autoryzujący tą aplikację. W wyniku dostosowania REST API do aplikacji moblinej, znajdująca sie tutaj wersja aplikacji webowej nie jest przystosowana do nowego api. Na heroku nadal jest wystawiona spójna wersja api i aplikacji webowej z przed kilku commitów.

# Event Finder design

## Direction

Przyjazny przewodnik po wspólnym czasie. Jasny interfejs dla osoby przeglądającej wydarzenia na telefonie w ciągu dnia. Spokojne tło i zieleń akcji, wyrazistość zapewniają istniejące zdjęcia kategorii.

## System

- Material UI, Roboto, stała skala typograficzna.
- Ciepłe neutralne tło, jasne powierzchnie, ciemny tekst i leśna zieleń.
- Zaokrąglenia 12–24 px, subtelne obramowania, oszczędne cienie.
- Zdjęcia kategorii są ilustracjami, nie zdjęciami konkretnych wydarzeń.
- Przyciski i pola co najmniej 44 px wysokości; wyraźny fokus.

## Screens

- Start: fotograficzne zaproszenie, bezpośrednie przejście do listy i skróty kategorii.
- Lista: nagłówek, wyszukiwanie, filtry kategorii/miasta/daty/statusu, licznik i sortowanie; fotograficzne wiersze wydarzeń.
- Szczegóły: zdjęcie, osobny tytuł i termin, opis oraz panel lokalizacji i działań. Na telefonie wszystko w jednej kolumnie.
- Formularz: maksymalna szerokość 800 px, sekcje informacji i lokalizacji, czytelne błędy, zapis z postępem.
- Stany: szkielety, brak wyników z resetem filtrów, błąd z ponowieniem, brak wydarzenia z powrotem do listy.

## Scope

Bez dodawania backendu uczestnictwa, profili i komentarzy. Wyszukiwanie i filtry działają na aktualnie pobranej liście. Istniejące operacje tworzenia, edycji i odwołania zostają zachowane.

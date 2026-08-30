# Event Finder

Event Finder to aplikacja webowa do wyszukiwania i zarządzania wydarzeniami. Łączy API w ASP.NET Core z klientem React, zapewniając bazę pod rozbudowę o inteligentne tworzenie wydarzeń, wyszukiwanie i monitoring działania systemu.

## Aktualny zakres

- Wyświetlanie listy wydarzeń pobieranej z REST API.
- Pobieranie pojedynczego wydarzenia po identyfikatorze.
- Trwałe przechowywanie danych w SQLite, migracje EF Core i dane startowe.
- Endpointy zdrowia aplikacji: `/health` oraz `/alive` w środowisku developerskim.

## Architektura

Repozytorium jest podzielone na dwa niezależnie uruchamiane obszary:

```text
web/                         React 19 + TypeScript + Vite
api/
  EventFinder.Api/           ASP.NET Core Web API
  EventFinder.Application/   warstwa przypadków użycia
  EventFinder.Domain/        model domenowy wydarzeń
  EventFinder.Infrastructure/ EF Core, SQLite, migracje i seedowanie
  EventFinder.ServiceDefaults/ wspólne health checks i OpenTelemetry
  EventFinder.AppHost/       host .NET Aspire dla środowiska lokalnego
```

Model wydarzenia obejmuje tytuł, termin, opis, kategorię, status odwołania oraz lokalizację wraz ze współrzędnymi.

## Technologie

- .NET 10 i ASP.NET Core Web API
- Entity Framework Core 10 oraz SQLite
- React 19, TypeScript i Vite
- .NET Aspire
- OpenTelemetry: logi, metryki i ślady rozproszone

## Uruchomienie lokalne

Wymagane są .NET SDK 10 oraz Node.js z npm.

1. Utwórz lokalną konfigurację API na podstawie przykładu:

   ```powershell
   Copy-Item api/EventFinder.Api/appsettings.json.Example api/EventFinder.Api/appsettings.json
   ```

2. Uzupełnij w `api/EventFinder.Api/appsettings.json`:

   - `ConnectionStrings:DefaultConnection` — np. `Data Source=EventFinder.db`;
   - `Cors:AllowedOrigins` — adres uruchomionego klienta, domyślnie Vite używa `http://localhost:5173`.

3. Uruchom backend przez Aspire:

   ```powershell
   dotnet run --project api/EventFinder.AppHost
   ```

   Host uruchamia API, a aplikacja API automatycznie stosuje migracje i seeduje dane przy starcie. Dashboard Aspire pokazuje stan usług oraz telemetrykę lokalnego środowiska.

4. W drugim terminalu uruchom klienta:

   ```powershell
   npm.cmd install --prefix web
   npm.cmd run dev --prefix web
   ```

Klient jest obecnie skonfigurowany do pobierania wydarzeń z `https://localhost:5001/api/activities`. W razie innego portu API należy zaktualizować adres w `web/src/App.tsx`.

## API

| Metoda | Endpoint | Opis |
| --- | --- | --- |
| `GET` | `/api/activities` | Zwraca listę wydarzeń. |
| `GET` | `/api/activities/{id}` | Zwraca wydarzenie o wskazanym identyfikatorze. |
| `GET` | `/health` | Gotowość aplikacji w środowisku developerskim. |
| `GET` | `/alive` | Podstawowy test żywotności w środowisku developerskim. |

Interfejs Swagger jest dostępny w środowisku developerskim po uruchomieniu API.

## Kierunek rozwoju

### Asystent AI podczas dodawania wydarzenia

Planowany moduł oparty o Semantic Kernel pozwoli opisać wydarzenie naturalnym językiem, na przykład: „Warsztaty z fotografii w Warszawie w sobotę o 10:00”. Model NLP zaproponuje uzupełnienie pól formularza, takich jak tytuł, data, opis, kategoria, miasto i miejsce.

Wynik będzie zwracany jako structured output zgodny z kontraktem wydarzenia. Użytkownik zobaczy propozycję w formularzu, zweryfikuje ją i dopiero wtedy zapisze wydarzenie. Walidacja domenowa pozostanie po stronie API — AI nie będzie omijać reguł aplikacji.

### Observability

Projekt wykorzystuje już .NET Aspire i wspólne Service Defaults, które instrumentują logi, metryki oraz ślady HTTP. Kolejny etap rozszerzy dashboard Aspire o obserwowalność pełnego przepływu dodawania wydarzenia, w tym czas odpowiedzi modelu, błędy walidacji i korelację żądań AI z operacjami API — bez rejestrowania wrażliwej treści promptów.

## Plan funkcjonalny

- formularz tworzenia, edycji i odwoływania wydarzeń;
- filtrowanie, wyszukiwanie i paginacja;
- szczegóły wydarzenia oraz widok lokalizacji;
- autoryzacja i profile użytkowników;
- powiadomienia oraz aktualizacje czasu rzeczywistego;
- asystowane przez AI wypełnianie formularza wydarzenia;
- dashboard metryk, śladów i logów w Aspire.

## Licencja

Projekt jest obecnie przeznaczony do rozwoju własnego. Dodaj wybraną licencję przed publiczną dystrybucją.

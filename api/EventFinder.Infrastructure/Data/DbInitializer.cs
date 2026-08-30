using EventFinder.Domain.Activities;

namespace EventFinder.Infrastructure.Data;

public class DbInitializer
{
    public static async Task SeedData(DataContext context)
    {
        if (!context.Activities.Any())
        {
            var activities = new List<Activity>
            {
                new Activity
                {
                    Title = "Spacer i kawa nad Wartą",
                    Date = DateTime.Now.AddDays(2).Date.AddHours(10),
                    Description = "Luźny spacer po Ostrowie Tumskim zakończony kawą. Dobre wydarzenie, żeby poznać nowych ludzi.",
                    Category = "social",
                    City = "Poznań",
                    Venue = "Brama Poznania",
                    Latitude = 52.4084,
                    Longitude = 16.9587
                },
                new Activity
                {
                    Title = "Wieczór planszówek",
                    Date = DateTime.Now.AddDays(3).Date.AddHours(18),
                    Description = "Wspólne granie w proste gry planszowe, bez potrzeby wcześniejszego doświadczenia.",
                    Category = "social",
                    City = "Poznań",
                    Venue = "Klubokawiarnia Meskalina",
                    Latitude = 52.4064,
                    Longitude = 16.9252
                },
                new Activity
                {
                    Title = "Poranny bieg w Cytadeli",
                    Date = DateTime.Now.AddDays(5).Date.AddHours(8),
                    Description = "Spokojne 5 km w grupie, z rozgrzewką i śniadaniem po biegu.",
                    Category = "sport",
                    City = "Poznań",
                    Venue = "Park Cytadela",
                    Latitude = 52.4236,
                    Longitude = 16.9366
                },
                new Activity
                {
                    Title = "Wspólne gotowanie kuchni włoskiej",
                    Date = DateTime.Now.AddDays(7).Date.AddHours(17),
                    Description = "Przygotujemy makaron od podstaw i zjemy kolację przy wspólnym stole.",
                    Category = "food",
                    City = "Poznań",
                    Venue = "Concordia Design",
                    Latitude = 52.4088,
                    Longitude = 16.9177
                },
                new Activity
                {
                    Title = "Kino plenerowe na Jeżycach",
                    Date = DateTime.Now.AddDays(9).Date.AddHours(20),
                    Description = "Seans pod chmurką i rozmowa o filmie po projekcji.",
                    Category = "culture",
                    IsCancelled = true,
                    City = "Poznań",
                    Venue = "Rynek Jeżycki",
                    Latitude = 52.4077,
                    Longitude = 16.8993
                },
                new Activity
                {
                    Title = "Siatkówka na Polu Mokotowskim",
                    Date = DateTime.Now.AddDays(1).Date.AddHours(16),
                    Description = "Rekreacyjna gra dla osób na każdym poziomie. Drużyny ustalimy na miejscu.",
                    Category = "sport",
                    City = "Warszawa",
                    Venue = "Pole Mokotowskie",
                    Latitude = 52.2114,
                    Longitude = 21.0065
                },
                new Activity
                {
                    Title = "Niedzielny brunch dla nowych znajomych",
                    Date = DateTime.Now.AddDays(4).Date.AddHours(11),
                    Description = "Spokojne spotkanie przy brunchu dla osób, które chcą poszerzyć grono znajomych.",
                    Category = "food",
                    City = "Warszawa",
                    Venue = "Hala Koszyki",
                    Latitude = 52.2218,
                    Longitude = 21.0125
                },
                new Activity
                {
                    Title = "Rowerem nad Wisłę",
                    Date = DateTime.Now.AddDays(6).Date.AddHours(14),
                    Description = "Niezbyt szybka trasa po bulwarach, z przerwą na lody i zdjęcia miasta.",
                    Category = "sport",
                    City = "Warszawa",
                    Venue = "Bulwary Wiślane",
                    Latitude = 52.2443,
                    Longitude = 21.0333
                },
                new Activity
                {
                    Title = "Warsztaty ceramiczne",
                    Date = DateTime.Now.AddDays(8).Date.AddHours(18),
                    Description = "Wspólne lepienie z gliny w kameralnej grupie, z miejscem na rozmowę i kreatywność.",
                    Category = "culture",
                    City = "Warszawa",
                    Venue = "Pracownia na Pradze",
                    Latitude = 52.2489,
                    Longitude = 21.0528
                },
                new Activity
                {
                    Title = "Wieczór open mic i muzyka na żywo",
                    Date = DateTime.Now.AddDays(10).Date.AddHours(19),
                    Description = "Posłuchaj lokalnych artystów lub wejdź na scenę. Po występach integracja przy stolikach.",
                    Category = "music",
                    IsCancelled = true,
                    City = "Warszawa",
                    Venue = "Dom Kultury Kadr",
                    Latitude = 52.1775,
                    Longitude = 21.0258
                },
                new Activity
                {
                    Title = "Jesienny spacer po Łazarzu",
                    Date = DateTime.Now.AddDays(-10).Date.AddHours(11),
                    Description = "Odbyty spacer sąsiedzki po Łazarzu, zakończony rozmowami przy kawie.",
                    Category = "social",
                    City = "Poznań",
                    Venue = "Park Wilsona",
                    Latitude = 52.3999,
                    Longitude = 16.9003
                },
                new Activity
                {
                    Title = "Turniej badmintona dla początkujących",
                    Date = DateTime.Now.AddDays(-18).Date.AddHours(17),
                    Description = "Zakończony, przyjazny turniej w parach dobieranych na miejscu.",
                    Category = "sport",
                    IsCancelled = true,
                    City = "Poznań",
                    Venue = "Hala Chwiałka",
                    Latitude = 52.3897,
                    Longitude = 16.9206
                },
                new Activity
                {
                    Title = "Klub książki: reportaż",
                    Date = DateTime.Now.AddMonths(-1).Date.AddHours(18),
                    Description = "Minione spotkanie z rozmową o reportażu i wymianą czytelniczych poleceń.",
                    Category = "culture",
                    City = "Poznań",
                    Venue = "Biblioteka Raczyńskich",
                    Latitude = 52.4071,
                    Longitude = 16.9307
                },
                new Activity
                {
                    Title = "Piknik i frisbee w Skaryszewskim",
                    Date = DateTime.Now.AddDays(-14).Date.AddHours(13),
                    Description = "Minione popołudnie z rekreacyjnym frisbee, przekąskami i poznawaniem ludzi.",
                    Category = "sport",
                    City = "Warszawa",
                    Venue = "Park Skaryszewski",
                    Latitude = 52.2437,
                    Longitude = 21.0441
                },
                new Activity
                {
                    Title = "Degustacja kaw z lokalnej palarni",
                    Date = DateTime.Now.AddMonths(-2).Date.AddHours(16),
                    Description = "Zakończone spotkanie dla miłośników kawy z rozmowami przy wspólnym stole.",
                    Category = "food",
                    City = "Warszawa",
                    Venue = "Praga Koneser Center",
                    Latitude = 52.2551,
                    Longitude = 21.0444
                },
                new Activity
                {
                    Title = "Wiosenny rajd pieszy nad Maltą",
                    Date = DateTime.Now.AddMonths(2).Date.AddHours(9),
                    Description = "Kilka godzin spokojnego marszu wokół Malty, z przerwą na wspólny posiłek.",
                    Category = "sport",
                    City = "Poznań",
                    Venue = "Jezioro Maltańskie",
                    Latitude = 52.4028,
                    Longitude = 16.9860
                },
                new Activity
                {
                    Title = "Nocne zwiedzanie miasta z przewodnikiem",
                    Date = DateTime.Now.AddMonths(3).Date.AddHours(20),
                    Description = "Wieczorna trasa po mniej znanych historiach Poznania, a później wspólne wyjście na herbatę.",
                    Category = "culture",
                    City = "Poznań",
                    Venue = "Stary Rynek",
                    Latitude = 52.4080,
                    Longitude = 16.9344
                },
                new Activity
                {
                    Title = "Letni turniej koszykówki 3x3",
                    Date = DateTime.Now.AddMonths(2).Date.AddHours(12),
                    Description = "Otwarte rozgrywki 3x3 dla amatorów, z miejscem dla pojedynczych zgłoszeń.",
                    Category = "sport",
                    City = "Warszawa",
                    Venue = "OSiR Wola",
                    Latitude = 52.2381,
                    Longitude = 20.9650
                },
                new Activity
                {
                    Title = "Warsztaty fotografii miejskiej",
                    Date = DateTime.Now.AddMonths(3).Date.AddHours(15),
                    Description = "Spacer fotograficzny dla początkujących i zaawansowanych, z omówieniem zdjęć po trasie.",
                    Category = "culture",
                    City = "Warszawa",
                    Venue = "Plac Defilad",
                    Latitude = 52.2319,
                    Longitude = 21.0013
                },
                new Activity
                {
                    Title = "Jesienny wieczór gier i quizów",
                    Date = DateTime.Now.AddMonths(4).Date.AddHours(18),
                    Description = "Drużynowy quiz i gry towarzyskie dla osób, które chcą spotkać się w większej grupie.",
                    Category = "social",
                    City = "Warszawa",
                    Venue = "Dom Kultury Śródmieście",
                    Latitude = 52.2263,
                    Longitude = 21.0161
                }
            };
            
            context.Activities.AddRange(activities);
            await context.SaveChangesAsync();
        }
    }
}

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
                    Category = "Towarzyskie",
                    City = "Poznań",
                    Venue = "Brama Poznania, Wartostrada, Śródka, Zagórze, Poznań, województwo wielkopolskie, 61-122, Polska",
                    Latitude = 52.41169780,
                    Longitude = 16.95168140
                },
                new Activity
                {
                    Title = "Wieczór planszówek",
                    Date = DateTime.Now.AddDays(3).Date.AddHours(18),
                    Description = "Wspólne granie w proste gry planszowe, bez potrzeby wcześniejszego doświadczenia.",
                    Category = "Towarzyskie",
                    City = "Poznań",
                    Venue = "5, Jana Henryka Dąbrowskiego, Jeżyckie Osiedle, Jeżyce, Poznań, województwo wielkopolskie, 60-829, Polska",
                    Latitude = 52.41095230,
                    Longitude = 16.91252190
                },
                new Activity
                {
                    Title = "Poranny bieg w Cytadeli",
                    Date = DateTime.Now.AddDays(5).Date.AddHours(8),
                    Description = "Spokojne 5 km w grupie, z rozgrzewką i śniadaniem po biegu.",
                    Category = "Sport",
                    City = "Park Cytadela",
                    Venue = "Park Cytadela, 61-663, Polska",
                    Latitude = 52.42155015,
                    Longitude = 16.93450220
                },
                new Activity
                {
                    Title = "Wspólne gotowanie kuchni włoskiej",
                    Date = DateTime.Now.AddDays(7).Date.AddHours(17),
                    Description = "Przygotujemy makaron od podstaw i zjemy kolację przy wspólnym stole.",
                    Category = "Kulinarne",
                    City = "Poznań",
                    Venue = "Concordia Design, 3, Zwierzyniecka, Rynek Jeżycki, Jeżyce, Poznań, województwo wielkopolskie, 60-813, Polska",
                    Latitude = 52.40726245,
                    Longitude = 16.91105771
                },
                new Activity
                {
                    Title = "Kino plenerowe na Jeżycach",
                    Date = DateTime.Now.AddDays(9).Date.AddHours(20),
                    Description = "Seans pod chmurką i rozmowa o filmie po projekcji.",
                    Category = "Kultura",
                    IsCancelled = true,
                    City = "Poznań",
                    Venue = "Rynek Jeżycki, Jeżyce, Poznań, województwo wielkopolskie, 60-847, Polska",
                    Latitude = 52.41231680,
                    Longitude = 16.90449580
                },
                new Activity
                {
                    Title = "Siatkówka na Polu Mokotowskim",
                    Date = DateTime.Now.AddDays(1).Date.AddHours(16),
                    Description = "Rekreacyjna gra dla osób na każdym poziomie. Drużyny ustalimy na miejscu.",
                    Category = "Sport",
                    City = "Pole Mokotowskie",
                    Venue = "Pole Mokotowskie, Polska",
                    Latitude = 52.21198575,
                    Longitude = 21.00056014
                },
                new Activity
                {
                    Title = "Niedzielny brunch dla nowych znajomych",
                    Date = DateTime.Now.AddDays(4).Date.AddHours(11),
                    Description = "Spokojne spotkanie przy brunchu dla osób, które chcą poszerzyć grono znajomych.",
                    Category = "Kulinarne",
                    City = "Warszawa",
                    Venue = "Hala Koszyki, Śródmieście, Warszawa, województwo mazowieckie, 00-667, Polska",
                    Latitude = 52.22210850,
                    Longitude = 21.01110331
                },
                new Activity
                {
                    Title = "Rowerem nad Wisłę",
                    Date = DateTime.Now.AddDays(6).Date.AddHours(14),
                    Description = "Niezbyt szybka trasa po bulwarach, z przerwą na lody i zdjęcia miasta.",
                    Category = "Sport",
                    City = "Warszawa",
                    Venue = "Bulwar Flotylli Wiślanej, Powiśle-Solec, Śródmieście, Warszawa, województwo mazowieckie, 00-411, Polska",
                    Latitude = 52.23296170,
                    Longitude = 21.04055360
                },
                new Activity
                {
                    Title = "Warsztaty ceramiczne",
                    Date = DateTime.Now.AddDays(8).Date.AddHours(18),
                    Description = "Wspólne lepienie z gliny w kameralnej grupie, z miejscem na rozmowę i kreatywność.",
                    Category = "Kultura",
                    City = "Warszawa",
                    Venue = "6, Aleja Jerzego Waszyngtona, Saska Kępa, Praga-Południe, Warszawa, województwo mazowieckie, 03-910, Polska",
                    Latitude = 52.23840545,
                    Longitude = 21.05435813
                },
                new Activity
                {
                    Title = "Wieczór open mic i muzyka na żywo",
                    Date = DateTime.Now.AddDays(10).Date.AddHours(19),
                    Description = "Posłuchaj lokalnych artystów lub wejdź na scenę. Po występach integracja przy stolikach.",
                    Category = "Muzyka",
                    IsCancelled = true,
                    City = "Warszawa",
                    Venue = "Dom Kultury Kadr, 32, Wincentego Rzymowskiego, Osiedle Prototypów, Mokotów, Warszawa, województwo mazowieckie, 02-697, Polska",
                    Latitude = 52.17556545,
                    Longitude = 21.00319589
                },
                new Activity
                {
                    Title = "Jesienny spacer po Łazarzu",
                    Date = DateTime.Now.AddDays(-10).Date.AddHours(11),
                    Description = "Odbyty spacer sąsiedzki po Łazarzu, zakończony rozmowami przy kawie.",
                    Category = "Towarzyskie",
                    City = "Poznań",
                    Venue = "Park Wilsona, Głogowska, Grunwald, Łazarz, Poznań, województwo wielkopolskie, 60-738, Polska",
                    Latitude = 52.39832640,
                    Longitude = 16.90330330
                },
                new Activity
                {
                    Title = "Turniej badmintona dla początkujących",
                    Date = DateTime.Now.AddDays(-18).Date.AddHours(17),
                    Description = "Zakończony, przyjazny turniej w parach dobieranych na miejscu.",
                    Category = "Sport",
                    City = "Poznań",
                    Venue = "Chwiałka, Ojca Mariana Żelazka, Łęgi Dębińskie, Wilda, Poznań, województwo wielkopolskie, 61-553, Polska",
                    Latitude = 52.39225270,
                    Longitude = 16.92883646
                },
                new Activity
                {
                    Title = "Klub książki: reportaż",
                    Date = DateTime.Now.AddMonths(-1).Date.AddHours(18),
                    Description = "Minione spotkanie z rozmową o reportażu i wymianą czytelniczych poleceń.",
                    Category = "Kultura",
                    City = "Poznań",
                    Venue = "Biblioteka Raczyńskich, 19, Plac Wolności, Święty Marcin, Stare Miasto, Poznań, województwo wielkopolskie, 61-739, Polska",
                    Latitude = 52.40843865,
                    Longitude = 16.92864653
                },
                new Activity
                {
                    Title = "Piknik i frisbee w Skaryszewskim",
                    Date = DateTime.Now.AddDays(-14).Date.AddHours(13),
                    Description = "Minione popołudnie z rekreacyjnym frisbee, przekąskami i poznawaniem ludzi.",
                    Category = "Sport",
                    City = "Park Skaryszewski",
                    Venue = "Park Skaryszewski, Polska",
                    Latitude = 52.24226560,
                    Longitude = 21.05556799
                },
                new Activity
                {
                    Title = "Degustacja kaw z lokalnej palarni",
                    Date = DateTime.Now.AddMonths(-2).Date.AddHours(16),
                    Description = "Zakończone spotkanie dla miłośników kawy z rozmowami przy wspólnym stole.",
                    Category = "Kulinarne",
                    City = "Warszawa",
                    Venue = "Pasaż Konesera, Praga, Praga-Północ, Warszawa, województwo mazowieckie, 03-736, Polska",
                    Latitude = 52.25589020,
                    Longitude = 21.04406500
                },
                new Activity
                {
                    Title = "Wiosenny rajd pieszy nad Maltą",
                    Date = DateTime.Now.AddMonths(2).Date.AddHours(9),
                    Description = "Kilka godzin spokojnego marszu wokół Malty, z przerwą na wspólny posiłek.",
                    Category = "Sport",
                    City = "Jezioro Maltańskie",
                    Venue = "Jezioro Maltańskie, Polska",
                    Latitude = 52.40386605,
                    Longitude = 16.96202833
                },
                new Activity
                {
                    Title = "Nocne zwiedzanie miasta z przewodnikiem",
                    Date = DateTime.Now.AddMonths(3).Date.AddHours(20),
                    Description = "Wieczorna trasa po mniej znanych historiach Poznania, a później wspólne wyjście na herbatę.",
                    Category = "Kultura",
                    City = "Poznań",
                    Venue = "Stary Rynek, Stare Miasto, Poznań, województwo wielkopolskie, 61-772, Polska",
                    Latitude = 52.40828915,
                    Longitude = 16.93359803
                },
                new Activity
                {
                    Title = "Letni turniej koszykówki 3x3",
                    Date = DateTime.Now.AddMonths(2).Date.AddHours(12),
                    Description = "Otwarte rozgrywki 3x3 dla amatorów, z miejscem dla pojedynczych zgłoszeń.",
                    Category = "Sport",
                    City = "Warszawa",
                    Venue = "Wola, Warszawa, województwo mazowieckie, Polska",
                    Latitude = 52.23623790,
                    Longitude = 20.95478150
                },
                new Activity
                {
                    Title = "Warsztaty fotografii miejskiej",
                    Date = DateTime.Now.AddMonths(3).Date.AddHours(15),
                    Description = "Spacer fotograficzny dla początkujących i zaawansowanych, z omówieniem zdjęć po trasie.",
                    Category = "Kultura",
                    City = "Warszawa",
                    Venue = "Plac Defilad, Śródmieście, Warszawa, województwo mazowieckie, 00-901, Polska",
                    Latitude = 52.23176235,
                    Longitude = 21.00578160
                },
                new Activity
                {
                    Title = "Jesienny wieczór gier i quizów",
                    Date = DateTime.Now.AddMonths(4).Date.AddHours(18),
                    Description = "Drużynowy quiz i gry towarzyskie dla osób, które chcą spotkać się w większej grupie.",
                    Category = "Towarzyskie",
                    City = "Warszawa",
                    Venue = "Dom Kultury Śródmieście, 9, Smolna, Powiśle-Skarpa, Śródmieście, Warszawa, województwo mazowieckie, 00-375, Polska",
                    Latitude = 52.23302470,
                    Longitude = 21.02497020
                }
            };
            
            context.Activities.AddRange(activities);
            await context.SaveChangesAsync();
        }
    }
}

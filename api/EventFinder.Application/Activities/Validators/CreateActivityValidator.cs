namespace EventFinder.Application.Activities.Validators;

public class CreateActivityValidator : AbstractValidator<CreateActivity.Command>
{
    public CreateActivityValidator()
    {
        RuleFor(x => x.ActivityDto.Title).NotEmpty().WithMessage("Tytuł jest wymagany");
        RuleFor(x => x.ActivityDto.Description).NotEmpty().WithMessage("Opis jest wymagany");
        RuleFor(x => x.ActivityDto.Date).NotEmpty().WithMessage("Data jest wymagana");
        RuleFor(x => x.ActivityDto.Category).NotEmpty().WithMessage("Kategoria jest wymagana");
        RuleFor(x => x.ActivityDto.City).NotEmpty().WithMessage("Miasto jest wymagane");
        RuleFor(x => x.ActivityDto.Venue).NotEmpty().WithMessage("Miejsce jest wymagane");
        RuleFor(x => x.ActivityDto.Latitude)
            .InclusiveBetween(-90d, 90d)
            .WithMessage("Szerokość geograficzna musi mieścić się w zakresie od -90 do 90");
        RuleFor(x => x.ActivityDto.Longitude)
            .InclusiveBetween(-180d, 180d)
            .WithMessage("Długość geograficzna musi mieścić się w zakresie od -180 do 180");
    }
}

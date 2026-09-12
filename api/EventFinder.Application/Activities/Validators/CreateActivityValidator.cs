namespace EventFinder.Application.Activities.Validators;

public class CreateActivityValidator : AbstractValidator<CreateActivity.Command>
{
    public CreateActivityValidator()
    {
        RuleFor(x => x.ActivityDto.Title)
            .NotEmpty().WithMessage("Tytuł jest wymagany")
            .MaximumLength(100).WithMessage("Tytuł nie może być dłuższy niż 100 znaków");
        RuleFor(x => x.ActivityDto.Description)
            .NotEmpty().WithMessage("Opis jest wymagany")
            .MaximumLength(2000).WithMessage("Tytuł nie może być dłuższy niż 2000 znaków");
        RuleFor(x => x.ActivityDto.Date)
            .NotEmpty().WithMessage("Data jest wymagana")
            .GreaterThan(DateTime.UtcNow).WithMessage("Data wydarzenia musi być w przyszłości");
        RuleFor(x => x.ActivityDto.Category)
            .NotEmpty().WithMessage("Kategoria jest wymagana");
        RuleFor(x => x.ActivityDto.City)
            .NotEmpty().WithMessage("Miasto jest wymagane")
            .MaximumLength(100).WithMessage("Tytuł nie może być dłuższy niż 100 znaków");
        RuleFor(x => x.ActivityDto.Venue)
            .NotEmpty().WithMessage("Miejsce jest wymagane")
            .MaximumLength(100).WithMessage("Tytuł nie może być dłuższy niż 100 znaków");
        RuleFor(x => x.ActivityDto.Latitude)
            .NotEmpty().WithMessage("Szerokość geograficzna jest wymagana")
            .InclusiveBetween(-90d, 90d).WithMessage("Szerokość geograficzna musi mieścić się w zakresie od -90 do 90");
        RuleFor(x => x.ActivityDto.Longitude)
            .NotEmpty().WithMessage("Długość geograficzna jest wymagana")
            .InclusiveBetween(-180d, 180d).WithMessage("Długość geograficzna musi mieścić się w zakresie od -180 do 180");
    }
}

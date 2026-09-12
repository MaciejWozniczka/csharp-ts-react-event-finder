namespace EventFinder.Application.Activities.Validators;

public class CreateActivityValidator : AbstractValidator<CreateActivityDto>
{
    public CreateActivityValidator()
    {
        RuleFor(x => x.Title).NotEmpty().WithMessage("Tytuł jest wymagany");
        RuleFor(x => x.Description).NotEmpty().WithMessage("Opis jest wymagany");
    }
}

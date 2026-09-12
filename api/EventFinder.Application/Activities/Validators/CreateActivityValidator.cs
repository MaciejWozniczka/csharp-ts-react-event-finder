namespace EventFinder.Application.Activities.Validators;

public class CreateActivityValidator() : BaseActivityValidator<CreateActivity.Command, CreateActivityDto>(x => x.ActivityDto);

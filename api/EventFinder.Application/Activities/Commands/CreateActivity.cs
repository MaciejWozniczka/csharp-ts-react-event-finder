using EventFinder.Application.Core;

namespace EventFinder.Application.Activities.Commands;

public class CreateActivity
{
    public class Command : IRequest<Result<Guid>>
    {
        public required CreateActivityDto ActivityDto { get; set; }
    }
    public class Handler(DataContext context, IMapper mapper) : IRequestHandler<Command, Result<Guid>>
    {
        public async Task<Result<Guid>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = mapper.Map<Activity>(request.ActivityDto);

            context.Activities
                .Add(activity);

            var result = await context
                .SaveChangesAsync(cancellationToken) > 0;

            if (!result)
            {
                return Result<Guid>.Failure("Nie udało się zaktualizować aktywności", 400);
            }

            return Result<Guid>.Success(activity.Id);
        }
    }
}
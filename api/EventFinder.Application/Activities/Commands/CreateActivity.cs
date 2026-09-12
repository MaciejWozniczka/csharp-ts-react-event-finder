namespace EventFinder.Application.Activities.Commands;

public class CreateActivity
{
    public class Command : IRequest<Guid>
    {
        public required CreateActivityDto ActivityDto { get; set; }
    }
    public class Handler(DataContext context, IMapper mapper) : IRequestHandler<Command, Guid>
    {
        public async Task<Guid> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = mapper.Map<Activity>(request.ActivityDto);

            context.Activities
                .Add(activity);

            await context
                .SaveChangesAsync(cancellationToken);

            return activity.Id;
        }
    }
}
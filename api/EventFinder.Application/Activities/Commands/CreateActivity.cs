namespace EventFinder.Application.Activities.Commands;

public class CreateActivity
{
    public class Command : IRequest<Guid>
    {
        public required Activity Activity { get; set; }
    }
    public class Handler(DataContext context) : IRequestHandler<Command, Guid>
    {
        public async Task<Guid> Handle(Command request, CancellationToken cancellationToken)
        {
            context.Activities
                .Add(request.Activity);

            await context
                .SaveChangesAsync(cancellationToken);

            return request.Activity.Id;
        }
    }
}
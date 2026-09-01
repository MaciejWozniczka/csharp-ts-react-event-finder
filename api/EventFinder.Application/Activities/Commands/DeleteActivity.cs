namespace EventFinder.Application.Activities.Commands;

public class DeleteActivity
{
    public class Command : IRequest
    {
        public required Guid Id { get; set; }
    }

    public class Handler (DataContext context) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context
                .Activities
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            if (activity == null)
            {
                throw new Exception("Activity not found");
            }

            context.Remove(activity);

            await context.SaveChangesAsync(cancellationToken);
        }
    }
}
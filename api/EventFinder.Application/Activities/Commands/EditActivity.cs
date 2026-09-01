namespace EventFinder.Application.Activities.Commands;

public class EditActivity
{
    public class Command : IRequest
    {
        public required Activity Activity { get; set; }
    }

    public class Handler(DataContext context, IMapper mapper) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context
                .Activities
                .FirstOrDefaultAsync(x => x.Id == request.Activity.Id, cancellationToken);
            
            if (activity == null)
            {
                throw new Exception("Activity not found");
            }

            mapper.Map(request.Activity, activity);

            await context.SaveChangesAsync(cancellationToken);
        }
    }
}
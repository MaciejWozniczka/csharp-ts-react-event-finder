using EventFinder.Application.Core;

namespace EventFinder.Application.Activities.Commands;

public class DeleteActivity
{
    public class Command : IRequest<Result<Unit>>
    {
        public required Guid Id { get; set; }
    }

    public class Handler (DataContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context
                .Activities
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            if (activity == null)
            {
                return Result<Unit>.Failure("Nie znaleziono aktywności", 404);
            }

            context.Remove(activity);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result)
            {
                return Result<Unit>.Failure("Nie udało się usunąć aktywności", 400);
            }

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
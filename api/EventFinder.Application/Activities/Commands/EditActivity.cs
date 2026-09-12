using EventFinder.Application.Core;

namespace EventFinder.Application.Activities.Commands;

public class EditActivity
{
    public class Command : IRequest<Result<Unit>>
    {
        public required Activity Activity { get; set; }
    }

    public class Handler(DataContext context, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context
                .Activities
                .FirstOrDefaultAsync(x => x.Id == request.Activity.Id, cancellationToken);
            
            if (activity == null)
            {
                return Result<Unit>.Failure("Nie znaleziono aktywności", 404);
            }

            mapper.Map(request.Activity, activity);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result)
            {
                return Result<Unit>.Failure("Nie udało się zaktualizować aktywności", 400);
            }

            return Result<Unit>.Success(Unit.Value);
        }
    }
}
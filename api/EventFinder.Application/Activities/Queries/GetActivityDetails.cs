using EventFinder.Application.Core;

namespace EventFinder.Application.Activities.Queries;

public class GetActivityDetails
{
    public class Query : IRequest<Result<Activity>>
    {
        public Guid Id { get; set; }
    }

    public class Handler(DataContext context) : IRequestHandler<Query, Result<Activity>>
    {
        public async Task<Result<Activity>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await context
                .Activities
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

            if (activity == null)
            {
                return Result<Activity>.Failure("Aktywność nie została znaleziona", 404);
            }

            return Result<Activity>.Success(activity);
        }
    }
}
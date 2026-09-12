using EventFinder.Application.Core;

namespace EventFinder.Application.Activities.Queries;

public class GetActivityList
{
    public class Query : IRequest<Result<List<Activity>>> {}

    public class Handler(DataContext context) : IRequestHandler<Query, Result<List<Activity>>>
    {
        public async Task<Result<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
        {
            return Result<List<Activity>>.Success(await context
                .Activities
                .OrderBy(a => a.Date)
                .ToListAsync(cancellationToken));
        }
    }
}
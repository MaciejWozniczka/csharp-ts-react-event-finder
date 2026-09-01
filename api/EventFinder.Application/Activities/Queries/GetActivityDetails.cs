using EventFinder.Domain.Activities;
using EventFinder.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EventFinder.Application.Activities.Queries;

public class GetActivityDetails
{
    public class Query : IRequest<Activity?>
    {
        public Guid Id { get; set; }
    }

    public class Handler(DataContext context) : IRequestHandler<Query, Activity?>
    {
        public async Task<Activity?> Handle(Query request, CancellationToken cancellationToken)
        {
            return await context
                .Activities
                .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        }
    }
}
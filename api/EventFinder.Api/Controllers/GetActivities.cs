using EventFinder.Domain.Activities;
using EventFinder.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EventFinder.Api.Controllers;

[Route("api/activities")]
[ApiController]
public class GetActivities (DataContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivitiesAsync(CancellationToken cancellationToken)
    {
        return await db.Activities
            .ToListAsync(cancellationToken);
    }
}
using EventFinder.Domain.Activities;
using EventFinder.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EventFinder.Api.Controllers;

[Route("api/activities")]
[ApiController]
public class GetActivity(DataContext db) : ControllerBase
{
    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivityAsync(Guid id, CancellationToken cancellationToken)
    {
        var activity = await db.Activities
            .Where(a => a.Id == id)
            .FirstOrDefaultAsync(cancellationToken);

        if (activity == null)
        {
            return NotFound();
        }

        return activity;
    }
}
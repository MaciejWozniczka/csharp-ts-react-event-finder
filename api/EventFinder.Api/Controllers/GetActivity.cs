namespace EventFinder.Api.Controllers;

[ApiController]
public class GetActivity(IMediator mediator) : ControllerBase
{
    [HttpGet("api/activities/{id}")]
    public async Task<ActionResult<Activity>> GetActivityAsync(Guid id, CancellationToken cancellationToken)
    {
        var activity = await mediator.Send(new GetActivityDetails.Query { Id = id }, cancellationToken);

        if (activity == null)
        {
            return NotFound();
        }

        return activity;
    }
}
namespace EventFinder.Api.Controllers;

[ApiController]
public class GetActivities (IMediator mediator) : ControllerBase
{
    [HttpGet("api/activities")]
    public async Task<ActionResult<List<Activity>>> GetActivitiesAsync(CancellationToken cancellationToken)
    {
        return await mediator.Send(new GetActivityList.Query(), cancellationToken);
    }
}
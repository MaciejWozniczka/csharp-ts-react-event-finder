namespace EventFinder.Api.Controllers;


public class ActivitiesController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivitiesAsync()
    {
        return await Mediator.Send(new GetActivityList.Query(), CancellationToken);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivityAsync(Guid id)
    {
        var activity = await Mediator.Send(new GetActivityDetails.Query { Id = id }, CancellationToken);

        if (activity == null)
        {
            return NotFound();
        }

        return activity;
    }
}

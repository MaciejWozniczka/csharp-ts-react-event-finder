namespace EventFinder.Api.Controllers;


public class ActivitiesController : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Activity>>> GetActivitiesAsync()
    {
        return HandleResult(await Mediator.Send(new GetActivityList.Query(), CancellationToken));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Activity>> GetActivityAsync(Guid id)
    {
        return HandleResult(await Mediator.Send(new GetActivityDetails.Query { Id = id }, CancellationToken));
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> CreateActivityAsync(CreateActivityDto activityDto)
    {
        return HandleResult(await Mediator.Send(new CreateActivity.Command { ActivityDto = activityDto }, CancellationToken));
    }

    [HttpPut]
    public async Task<ActionResult> EditActivityAsync(Guid id, Activity activity)
    {
        return HandleResult(await Mediator.Send(new EditActivity.Command { Activity = activity }, CancellationToken));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteActivity(Guid id)
    {
        return HandleResult(await Mediator.Send(new DeleteActivity.Command { Id = id }, CancellationToken));
    }
}

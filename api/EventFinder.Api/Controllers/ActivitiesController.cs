using EventFinder.Application.Activities.Commands;

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

    [HttpPost]
    public async Task<ActionResult<Guid>> CreateActivityAsync(Activity activity)
    {
        return await Mediator.Send(new CreateActivity.Command { Activity = activity }, CancellationToken);
    }

    [HttpPut]
    public async Task<ActionResult> EditActivityAsync(Guid id, Activity activity)
    {
        await Mediator.Send(new EditActivity.Command { Activity = activity }, CancellationToken);

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteActivity(Guid id)
    {
        await Mediator.Send(new DeleteActivity.Command { Id = id }, CancellationToken);

        return Ok();
    }
}

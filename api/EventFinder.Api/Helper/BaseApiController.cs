namespace EventFinder.Api.Helper;

[Route("api/[controller]")]
[ApiController]
public class BaseApiController : ControllerBase
{
    private IMediator? _mediator;
    protected CancellationToken CancellationToken => HttpContext.RequestAborted;

    protected IMediator Mediator => 
        _mediator ??= HttpContext.RequestServices.GetRequiredService<IMediator>() 
                      ?? throw new InvalidOperationException("IMediator not available");

    protected ActionResult HandleResult<T>(Result<T> result)
    {
        if (!result.IsSuccess && result.Code == 404) return NotFound();

        if (result.IsSuccess && result.Value != null) return Ok(result.Value);

        return BadRequest(result.Error);
    }
}

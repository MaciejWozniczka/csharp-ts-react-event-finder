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
}

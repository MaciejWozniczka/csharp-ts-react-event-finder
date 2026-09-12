namespace EventFinder.Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<Activity, Activity>();
        CreateMap<Activity, CreateActivityDto>();
        CreateMap<CreateActivityDto, Activity>();
        CreateMap<Activity, EditActivityDto>();
        CreateMap<EditActivityDto, Activity>();
    }
}

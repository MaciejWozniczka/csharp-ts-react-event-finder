using EventFinder.Domain.Activities;
using Microsoft.EntityFrameworkCore;

namespace EventFinder.Infrastructure.Data;

public class DataContext(DbContextOptions<DataContext> options) : DbContext(options)
{
    public required DbSet<Activity> Activities { get; set; }
}
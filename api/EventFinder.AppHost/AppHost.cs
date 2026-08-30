var builder = DistributedApplication.CreateBuilder(args);

builder.AddProject<Projects.EventFinder_Api>("eventfinder-api");

builder.Build().Run();

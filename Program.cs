using AutoMapper;
using Microsoft.EntityFrameworkCore;
using vega.Core;
using vega.Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddScoped<IVehicleRepository, VehicleRepository>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddAutoMapper(typeof(Program).Assembly);
builder.Services.AddDbContext<VegaDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UsePathBase(new PathString("/api/makes"));
app.UsePathBase(new PathString("/api/features"));
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();

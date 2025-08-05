Server web api folder - TodoApi (<web_api_folder>)
Client folder - MyAngularApp
---------------------------------------

Server:-
=====
installed visual studio code, .net sdk, NuGet package manager.

dotnet new angular
dotnet new --install Microsoft.AspNetCore.SpaTemplates::*
dotnet dev-certs https --trust
dotnet new --install Microsoft.AspNetCore.SpaTemplates::*
dotnet new install Microsoft.DotNet.Web.Spa.ProjectTemplates
dotnet new angular -o MyAngularApp
dotnet run

downloaded aspnet runtime:-
https://aka.ms/dotnet-core-applaunch?framework=Microsoft.AspNetCore.App&framework_version=2.2.0&arch=x64&rid=win-x64&os=win81

downloaded .NET runtime:-
https://aka.ms/dotnet-core-applaunch?framework=Microsoft.NETCore.App&framework_version=2.2.8&arch=x64&rid=win-x64&os=win81

downgraded to node v16 from 20.

Then ran dotnet run, was successful.

Used minimal asp.net core api for angular for web api

cd <web_api_folder>
dotnet build
dotnet run


For error, "Access to XMLHttpRequest at 'http://localhost:5021/' from origin 'http://localhost:<angular_client_port>' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.",
modify the port in the cors origin settings in server's program.cs file as below - 

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy  =>
                      {
                          policy.WithOrigins("http://localhost:<angular_client_port>")
                               .AllowAnyMethod()
                               .AllowAnyHeader();
                      });
});

------------------------------------
server url:-
http://localhost:5021/todoitems
------------------------------------


Client:-
=====

Run npm install at below location:-
MyAngularApp\ClientApp

Proof of working condition - please see below video link, (few seconds video):-
https://www.loom.com/share/537ec65ffc824a20930d4d292076a62b

Client url used in my video - http://localhost:55937/
----------------------------------------------


using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DICs_API.Documentation;
using DICs_API.Errors;
using DICs_API.Helpers;
using DICs_API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Swagger;

namespace DICs_API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //Configuração de padronização de erros
            services.AddMvc( options =>
            {
                options.Filters.Add(typeof(ErrorResponseFilter));
            }).SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            //add politica de cors que permite que a api seja acessada de qualquer origem
            services.AddCors();

            services.Configure<ApiBehaviorOptions>(options =>
            {
                options.SuppressModelStateInvalidFilter = true;
            });

            // Configuração de Injeção de Dependência em UserService
            services.AddScoped<IUserService, UserService>();

            //Configuração de versionamento da api
            services.AddApiVersioning();

            //Configuração Swagger
            services.AddSwaggerGen(c =>
           {
               c.SwaggerDoc("v1", new Info { Title = "Documentação API DICs", Version = "1.0" });
               c.EnableAnnotations();
               c.DocumentFilter<TagDescriptionDocumentFilter>();
               c.AddSecurityDefinition("Bearer", new ApiKeyScheme
               {
                   Name = "Authorization",
                   In = "header",
                   Type = "apiKey",
                   Description = "Autenticação Bearer via JWT"
               });
               c.IncludeXmlComments($@"{AppDomain.CurrentDomain.BaseDirectory}\SwaggerConfig.xml");
           });
            // configure strongly typed settings objects
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);

            // configure jwt authentication
            var appSettings = appSettingsSection.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes("856FECBA3B06519C8DDDBC80BB080553");
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = "JwtBearer";
                options.DefaultChallengeScheme = "JwtBearer";
            })
            .AddJwtBearer("JwtBearer", x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            services.AddAuthorization(auth =>
            {
                auth.AddPolicy("JwtBearer", new AuthorizationPolicyBuilder()
                    .AddAuthenticationSchemes("JwtBearer")
                    .RequireAuthenticatedUser().Build());
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
             //add politica de cors que permite que a api seja acessada de qualquer origem
            app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            app.UseHttpsRedirection();
            app.UseMvc();
            // global cors policy

            app.UseAuthentication();
            app.UseSwagger();
            app.UseSwaggerUI(opt =>
            {
                opt.SwaggerEndpoint("/swagger/v1/swagger.json", "API Planner v1");
                opt.RoutePrefix = string.Empty;
            });
        }
    }
}

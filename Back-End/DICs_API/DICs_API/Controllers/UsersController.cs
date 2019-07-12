using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DICs_API.Errors;
using DICs_API.Helpers;
using DICs_API.Models;
using DICs_API.Repositories;
using DICs_API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Annotations;

namespace DICs_API.Controllers
{
    [Authorize("JwtBearer")]
    [Produces("application/json")]
    [ApiController]
    [ApiVersion("1.0")]
    [ApiExplorerSettings(GroupName = "v1")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UsersRepository _repoUsers;
        private readonly DICRepository _repoDIC;
        private readonly IUserService _service;
        private readonly AppSettings _appSettings;
        public UsersController(IConfiguration configuration, IOptions<AppSettings> appSettings, IUserService userService)
        {
            _repoUsers = new UsersRepository(configuration);
            _repoDIC = new DICRepository(configuration);
            _service = userService;
            _appSettings = appSettings.Value;
        }

        [HttpGet("{id}")]
        [SwaggerOperation(Summary = "Recupera Usuário identificado por seu {id}.",
                          Tags = new[] { "Users" },
                          Produces = new[] { "application/json" })]
        [ProducesResponseType(statusCode: 200, Type = typeof(Users))]
        [ProducesResponseType(statusCode: 500, Type = typeof(ErrorResponse))]
        [ProducesResponseType(statusCode: 404)]
        public IActionResult Get([FromRoute][SwaggerParameter("Id do usuário que será obtido.")]int id)
        {
            var model = _repoUsers.Get(id);
            if (model == null)
            {
                return NotFound();
            }

            return Ok(model);
        }

        [HttpGet("dics/{id}")]
        [SwaggerOperation(Summary = "Recupera Usuário e seus DICs identificado pelo id do usuário {id}.",
                          Tags = new[] { "Users" },
                          Produces = new[] { "application/json" })]
        [ProducesResponseType(statusCode: 200, Type = typeof(UserDics))]
        [ProducesResponseType(statusCode: 500, Type = typeof(ErrorResponse))]
        [ProducesResponseType(statusCode: 404)]
        public IActionResult GetDics(int id)
        {
            var model = _repoDIC.GetAllForUser(id).Select(l => l).ToUserDics(_repoUsers.Get(id));
            if (model == null)
                return NotFound();
            return Ok(model);
        }

        [HttpGet]
        [SwaggerOperation(Summary = "Recupera TODOS os Usuários.",
                          Tags = new[] { "Users" },
                          Produces = new[] { "application/json" })]
        [ProducesResponseType(statusCode: 200, Type = typeof(List<Users>))]
        [ProducesResponseType(statusCode: 500, Type = typeof(ErrorResponse))]
        [ProducesResponseType(statusCode: 404)]
        public IActionResult GetAll()
        {
            var list = _repoUsers.GetAll();
            return Ok(list);
        }


        [AllowAnonymous]
        [HttpPost]
        [SwaggerOperation(Summary = "Insere um novo usuário..",
                          Tags = new[] { "Users" },
                          Produces = new[] { "application/json" })]
        [ProducesResponseType(statusCode: 201, Type = typeof(Users))]
        [ProducesResponseType(statusCode: 500, Type = typeof(ErrorResponse))]
        [ProducesResponseType(statusCode: 400)]
        public IActionResult Insert([FromBody] UsersUpload user)
        {
            if (ModelState.IsValid)
            {
                var result = _service.Create(user);
                if (!result)
                {
                    return BadRequest();
                }
                var lastResult = _repoUsers.GetLastInserted();
                var uri = Url.Action("Get", new { Id = lastResult.Id, Version = "1.0" });
                return Created(uri, lastResult);
            }
            return BadRequest();
            
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        [SwaggerOperation(Summary = "Faz autenticação do usuário e retorna um Bearer Token.",
                          Tags = new[] { "Users" },
                          Produces = new[] { "application/json" })]
        [ProducesResponseType(statusCode: 201)]
        [ProducesResponseType(statusCode: 500, Type = typeof(ErrorResponse))]
        [ProducesResponseType(statusCode: 400)]
        public IActionResult Authenticate([FromBody] Login login)
        {
            var service = _service.Authenticate(login.Email, login.Password);
            if (service == null)
                return BadRequest(new { message = "Email ou senha incorretos" });
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, service.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            // return basic user info (without password) and token to store client side
            return Ok(new
            {
                Token = tokenString,
                User = service
            });
        }

        [HttpDelete("{id}")]
        [SwaggerOperation(Summary = "Exclui um usuário.",
                          Tags = new[] { "Users" })]
        [ProducesResponseType(statusCode: 204)]
        [ProducesResponseType(statusCode: 500, Type = typeof(ErrorResponse))]
        [ProducesResponseType(statusCode: 404)]
        public IActionResult Delete([FromRoute] int id)
        {
            var department = _repoUsers.Get(id);
            if (department == null)
            {
                return NotFound();
            }
            _repoUsers.Delete(id);
            return NoContent();
        }

        [HttpPut]
        [SwaggerOperation(Summary = "Altera um usuário.",
                          Tags = new[] { "Users" })]
        [ProducesResponseType(statusCode: 200)]
        [ProducesResponseType(statusCode: 500, Type = typeof(ErrorResponse))]
        [ProducesResponseType(statusCode: 400)]
        public IActionResult Update([Bind("Id, Name, Avatar, Email, Department, Process, Password, IsLeaderDepartment, IsLeaderProcess")]UsersUpload user)
        {
            if (ModelState.IsValid)
            {
                var result = _service.Update(user);

                if (!result)
                    return BadRequest();

                return Ok();
            }

            return BadRequest();
        }
    }

}
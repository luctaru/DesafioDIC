using DICs_API.Errors;
using DICs_API.Models;
using DICs_API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Swashbuckle.AspNetCore.Annotations;

namespace DICs_API.Controllers
{
    [Authorize("JwtBearer")]
    [Produces("application/json")]
    [ApiController]
    [ApiVersion("1.0")]
    [ApiExplorerSettings(GroupName = "v1")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class ConfigurationsController : ControllerBase
    {
        private readonly ConfigurationRepository _repoConfiguration;
        public ConfigurationsController(IConfiguration configuration){
            _repoConfiguration = new ConfigurationRepository(configuration);
        }

        [HttpGet("{id}")]
        [SwaggerOperation(Summary = "Recupera configuração identificada pelo seu {id}.",
                          Tags = new[] { "Configuration" },
                          Produces = new[] { "application/json" })]
        [ProducesResponseType(statusCode: 200, Type = typeof(Configuration))]
        [ProducesResponseType(statusCode: 500, Type = typeof(ErrorResponseFilter))]
        [ProducesResponseType(statusCode: 404)]
        public IActionResult Get([FromRoute]int id)
        {
            var model = _repoConfiguration.Get(id);
            if(model == null)
            {
                return NotFound();
            }
            return Ok(model);
        }

        [HttpGet]
        [SwaggerOperation(Summary = "Recupera todas as configurações.",
                          Tags = new[] { "Configuration" },
                          Produces = new[] { "application/json" })]
        [ProducesResponseType(statusCode: 200, Type = typeof(Configuration))]
        [ProducesResponseType(statusCode: 500, Type = typeof(ErrorResponseFilter))]
        [ProducesResponseType(statusCode: 404)]
        public IActionResult GetAll()
        {
            var list = _repoConfiguration.GetAll();
            return Ok(list);
        }

        [HttpPost]
        [SwaggerOperation(Summary = "Insere uma configuração.",
                          Tags = new[] { "Configuration" })]
        [ProducesResponseType(statusCode: 201, Type = typeof(Configuration))]
        [ProducesResponseType(statusCode: 500, Type = typeof(ErrorResponseFilter))]
        [ProducesResponseType(statusCode: 400)]
        public IActionResult Insert([FromBody]ConfigurationUpload configuration)
        {
            if (ModelState.IsValid)
            {
                var result = _repoConfiguration.Insert(configuration);
                var lastResult =  _repoConfiguration.GetLastInserted();
                var uri = Url.Action("Get", new { Id = lastResult.Id, Version = "1.0" });
                return Created(uri, lastResult);
            }
            return BadRequest();
        }

        [HttpPut]
        [SwaggerOperation(Summary = "Altera uma configuração.",
                          Tags = new[] { "Configuration" })]
        [ProducesResponseType(statusCode: 200)]
        [ProducesResponseType(statusCode: 500, Type = typeof(ErrorResponseFilter))]
        [ProducesResponseType(statusCode: 400)]
        public IActionResult Update ([Bind("Id, Period")]ConfigurationUpload configuration)
        {
            if (ModelState.IsValid)
            {
                _repoConfiguration.Update(configuration);
                return Ok();
            }
            return BadRequest();
        }
   
    }
}

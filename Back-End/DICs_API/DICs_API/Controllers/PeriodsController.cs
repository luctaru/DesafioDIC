using DICs_API.Errors;
using DICs_API.Models;
using DICs_API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Swashbuckle.AspNetCore.Annotations;
using System.Collections.Generic;

namespace DICs_API.Controllers
{
    [Authorize("JwtBearer")]
    [Produces("application/json")]
    [ApiController]
    [ApiVersion("1.0")]
    [ApiExplorerSettings(GroupName = "v1")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class PeriodsController : ControllerBase
    {
        private readonly PeriodRepository _repoPeriod;

        public PeriodsController(IConfiguration configuration) {
            _repoPeriod = new PeriodRepository(configuration);
        }

        [HttpGet("{id}")]
        [SwaggerOperation(Summary = "Recupera período identificado pelo seu {id}.",
                          Tags = new[] { "Period" },
                          Produces = new[] { "application/json" })]
        [ProducesResponseType(statusCode: 200, Type = typeof(Period))]
        [ProducesResponseType(statusCode: 500, Type = typeof(ErrorResponseFilter))]
        [ProducesResponseType(statusCode: 404)]
        public IActionResult Get([FromRoute][SwaggerParameter("Id do periodo.")]int id)
        {
            var model = _repoPeriod.Get(id);
            if(model == null)
            {
                return NotFound();
            }
            return Ok(model);
        }

        [HttpGet]
        [SwaggerOperation(Summary = "Recupera todos os períodos.",
                          Tags = new[] { "Period" },
                          Produces = new[] { "application/json" })]
        [ProducesResponseType(statusCode: 200, Type = typeof(List<Period>))]
        [ProducesResponseType(statusCode: 500, Type = typeof(ErrorResponseFilter))]
        [ProducesResponseType(statusCode: 404)]
        public IActionResult GetAll()
        {
            var list = _repoPeriod.GetAll();
            return Ok(list);
        }

        [HttpPost]
        [SwaggerOperation(Summary = "Insere um período.",
                          Tags = new[] { "Period" })]
        [ProducesResponseType(statusCode: 201, Type = typeof(Period))]
        [ProducesResponseType(statusCode: 500, Type = typeof(ErrorResponseFilter))]
        [ProducesResponseType(statusCode: 400)]
        public IActionResult Insert([FromBody]Period period)
        {
            if (ModelState.IsValid)
            {
                var result = _repoPeriod.Insert(period);
                var lastResult = _repoPeriod.GetLastInserted();
                var uri = Url.Action("Get", new { Id = lastResult.Id, Version = "1.0" });
                return Created(uri, lastResult);
            }
            return BadRequest();
        }

        [HttpDelete]
        [SwaggerOperation(Summary = "Exclui um período.",
                          Tags = new[] { "Period" })]
        [ProducesResponseType(statusCode: 204)]
        [ProducesResponseType(statusCode: 500, Type = typeof(ErrorResponseFilter))]
        [ProducesResponseType(statusCode: 404)]
        public IActionResult Delete([FromRoute]int id)
        {
            var period = _repoPeriod.Get(id);
            if(period == null)
            {
                return NotFound();
            }
            _repoPeriod.Delete(id);

            return NoContent();
        }

        [HttpPut]
        [SwaggerOperation(Summary = "Altera um período.",
                          Tags = new[] { "Period" })]
        [ProducesResponseType(statusCode: 200)]
        [ProducesResponseType(statusCode: 500, Type = typeof(ErrorResponseFilter))]
        [ProducesResponseType(statusCode: 400)]
        public IActionResult Update([Bind("Id, Months, Name")]Period period)
        {
            if (ModelState.IsValid)
            {
                _repoPeriod.Update(period);
                return Ok();
            }
            return BadRequest();
        }
    }
}

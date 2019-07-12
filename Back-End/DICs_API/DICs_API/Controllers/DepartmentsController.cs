using DICs_API.Errors;
using DICs_API.Models;
using DICs_API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Swashbuckle.AspNetCore.Annotations;
using System.Collections.Generic;
using System.Linq;

namespace DICs_API.Controllers
{
    [Authorize("JwtBearer")]
    [Produces("application/json")]
    [ApiController]
    [ApiVersion("1.0")]
    [ApiExplorerSettings(GroupName = "v1")]
    [Route("api/v{version:apiVersion}/[controller]")]
    public class DepartmentsController : ControllerBase
    {
        private readonly DepartmentRepository _repoDepartment;
        private readonly DICRepository _repoDIC;

        public DepartmentsController(IConfiguration configuration)
        {
            _repoDepartment = new DepartmentRepository(configuration);
            _repoDIC = new DICRepository(configuration);
        }

        [HttpGet("{id}")]
        [SwaggerOperation(Summary = "Recupera empreendimento identificado pelo seu {id}.",
                          Tags = new[] { "Department" },
                          Produces = new[] { "application/json" })]
        [ProducesResponseType(statusCode: 200, Type = typeof(Department))]
        [ProducesResponseType(statusCode: 500, Type = typeof(ErrorResponseFilter))]
        [ProducesResponseType(statusCode: 404)]
        public IActionResult Get([FromRoute]int id)
        {
            var model = _repoDepartment.Get(id);
            if(model == null)
            {
                return NotFound();
            }
            return Ok(model);
        }
        [HttpGet("dics/{id}")]
        [SwaggerOperation(Summary = "Recupera Empreendimento e os DICs de seus colaboradores identificado pelo id do empreendimento {id}.",
                         Tags = new[] { "Users" },
                         Produces = new[] { "application/json" })]
        [ProducesResponseType(statusCode: 200, Type = typeof(DepartmentDics))]
        [ProducesResponseType(statusCode: 500, Type = typeof(ErrorResponse))]
        [ProducesResponseType(statusCode: 404)]
        public IActionResult GetDics(int id)
        {
            var model = _repoDIC.GetAllForDepartment(id).Select(l => l).ToDepartmentDics(_repoDepartment.Get(id));
            if (model == null)
                return NotFound();
            return Ok(model);
        }
        [HttpGet]
        [SwaggerOperation(Summary = "Recupera todos os empreendimentos.",
                          Tags = new[] { "Department" },
                          Produces = new[] { "application/json" })]
        [ProducesResponseType(statusCode: 200, Type = typeof(List<Department>))]
        [ProducesResponseType(statusCode: 500, Type = typeof(ErrorResponseFilter))]
        [ProducesResponseType(statusCode: 404)]
        public IActionResult GetAll()
        {
            var list = _repoDepartment.GetAll();
            return Ok(list);
        }

        [HttpPost]
        [SwaggerOperation(Summary = "Recupera todos os empreendimentos.",
                          Tags = new[] { "Department" })]
        [ProducesResponseType(statusCode: 201, Type = typeof(Department))]
        [ProducesResponseType(statusCode: 500, Type = typeof(ErrorResponseFilter))]
        [ProducesResponseType(statusCode: 400)]
        public IActionResult Insert([FromBody]Department department)
        {
            if (ModelState.IsValid)
            {
                var result = _repoDepartment.Insert(department);
                var lastResult =  _repoDepartment.GetLastInserted();
                var uri = Url.Action("Get", new { Id = lastResult.Id, Version = "1.0" });
                return Created(uri, lastResult);
            }
            return BadRequest();
        }

        [HttpDelete("{id}")]
        [SwaggerOperation(Summary = "Exclui um empreendimento.",
                          Tags = new[] { "Department" })]
        [ProducesResponseType(statusCode: 204)]
        [ProducesResponseType(statusCode: 500, Type = typeof(ErrorResponseFilter))]
        [ProducesResponseType(statusCode: 404)]
        public IActionResult Delete([FromRoute] int id)
        {
            var department = _repoDepartment.Get(id);
            if(department == null)
            {
                return NotFound();
            }
            _repoDepartment.Delete(id);
            return NoContent();
        }

        [HttpPut]
        [SwaggerOperation(Summary = "Altera um empreendimento.",
                          Tags = new[] { "Department" })]
        [ProducesResponseType(statusCode: 200)]
        [ProducesResponseType(statusCode: 500, Type = typeof(ErrorResponseFilter))]
        [ProducesResponseType(statusCode: 400)]
        public IActionResult Update([Bind("Id, Name")]Department department)
        {
            if (ModelState.IsValid)
            {
                _repoDepartment.Update(department);
                return Ok();
            }

            return BadRequest();
        }
    }
}

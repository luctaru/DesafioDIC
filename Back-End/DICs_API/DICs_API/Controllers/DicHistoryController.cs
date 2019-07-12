using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DICs_API.Errors;
using DICs_API.Models;
using DICs_API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
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

    public class DicHistoryController : ControllerBase
    {
        private readonly DicHistoryRepository _repoHistory;
        private readonly DICRepository _repoDic;
        public DicHistoryController(IConfiguration configuration)
        {
            _repoHistory = new DicHistoryRepository(configuration);
            _repoDic = new DICRepository(configuration);
        }

        [HttpGet("{id}")]
        [SwaggerOperation(Summary = "Pega todos históricos de um DIC identificado pelo id do dic {id}.",
                          Tags = new[] { "DicHistory" },
                          Produces = new[] { "application/json" })]
        [ProducesResponseType(statusCode: 200, Type = typeof(DicHistoryConfig))]
        [ProducesResponseType(statusCode: 500, Type = typeof(ErrorResponse))]
        [ProducesResponseType(statusCode: 400)]
        public IActionResult Get([FromRoute] int id)
        {
            var model = _repoHistory.GetAll(id).Select(l => l).ToDicHistoryConfig(_repoDic.Get(id));
            if (model == null)
                return NotFound();
            return Ok(model);
        }

        [HttpPost]
        [SwaggerOperation(Summary = "Insere um novo histórico para o DIC..",
                          Tags = new[] { "DicHistory" },
                          Produces = new[] { "application/json" })]
        [ProducesResponseType(statusCode: 201, Type = typeof(DicHistory))]
        [ProducesResponseType(statusCode: 500, Type = typeof(ErrorResponse))]
        [ProducesResponseType(statusCode: 400)]
        public IActionResult Insert([Bind("IdDic,IdStatus,Note,Type")]DicHistoryUpload dic)
        {
            if (ModelState.IsValid)
            {
                var result = _repoHistory.Insert(dic);
                
                var lastDic = _repoHistory.GetLastInserted();
                var uri = Url.Action("Get", new { Id = lastDic.Id, Version = "1.0" });
                return Created(uri, lastDic);
            }
            return BadRequest();
        }
    }
}
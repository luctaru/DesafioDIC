using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DICs_API.Documentation
{
    public class TagDescriptionDocumentFilter : IDocumentFilter
    {
        public void Apply(SwaggerDocument swaggerDoc, DocumentFilterContext context)
        {
            swaggerDoc.Tags = new[]
            {
                new Tag{Name = "DICs", Description = "Consulta e mantém os DICs."},
                new Tag { Name = "Configuration", Description = "Consulta e mantém as Configurações do Sistema." },
                new Tag { Name = "DicHistory", Description = "Consulta e mantém o histórico dos DICs." },
                new Tag { Name = "Department", Description = "Consulta e mantém os Empreendimentos." },
                new Tag { Name = "Process", Description = "Consulta e mantém os Processos." },
                new Tag { Name = "Period", Description = "Consulta e mantém o Período." },
                new Tag { Name = "Status", Description = "Consulta e mantém os Status." },
                new Tag { Name = "Users", Description = "Consulta e mantém os Usuários." }
            };
        }
    }
}

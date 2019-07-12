using Dapper;
using DICs_API.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace DICs_API.Repositories
{
    public class StatusRepository : AbstractRepository<Status>
    {
        public StatusRepository(IConfiguration configuration) : base(configuration)
        {
        }

        public override bool Delete(int id)
        {
            throw new Exception("Não é possível excluir um Status.");
        }

        public override Status Get(int id)
        {
            throw new Exception("Não é possível consultar um Status.");
        }

        public override Status GetLastInserted()
        {
            throw new Exception("Não é possível consultar o último Status.");
        }

        public override bool Insert(Status item)
        {
            throw new Exception("Não é possível inserir um Status.");
        }

        public override bool Update(Status item)
        {
            throw new Exception("Não é possível atualizar um Status.");
        }

        public override IEnumerable<Status> GetAll()
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                var query = db.Query<Status>(@"SELECT * FROM STATUS WHERE REMOVED = 0").AsList();
                return (List<Status>)query;
            }
        }
    }
}

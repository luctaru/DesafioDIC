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
    public class ConfigurationRepository : AbstractRepository<Configuration>
    {
        public ConfigurationRepository(IConfiguration configuration) : base(configuration) { }
        public override bool Delete(int id)
        {
            throw new Exception("Não é permitida a exclusão.");
        }

        public override Configuration Get(int id)
        {
            using(IDbConnection db = new SqlConnection(ConnectionString))
            {
                Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;
                if(db.State == ConnectionState.Closed)
                {
                    db.Open();
                }

                string query = "SELECT * FROM CONFIGURATION WHERE ID = @Id";
                var configuration = db.QueryFirst<Configuration>(query, new { Id = id });
                db.Close();
                return configuration;
            }
        }

        public override IEnumerable<Configuration> GetAll()
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                var query = db.Query<Configuration, Period, Configuration>
                    (@"SELECT c.*, p.* 
                       FROM CONFIGURATION c INNER JOIN PERIOD p
                       ON c.ID_PERIOD = p.ID
                       WHERE REMOVED = 0"
                    , (c, p) => {
                        c.Period = p;
                        return c;
                    }, null, splitOn: "id, id").AsList();
                db.Close();
                return (List<Configuration>)query;
            }
        }

        public override Configuration GetLastInserted()
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                var query = db.Query<Configuration, Period, Configuration>
                    (@"SELECT c.*, p.* 
                       FROM CONFIGURATION c INNER JOIN PERIOD p
                       ON c.ID_PERIOD = p.ID
                       WHERE ID = IDENT_CURRENT('CONFIGURATION')"
                    , (c,p) => {
                        c.Period = p;
                        return c;
                    }, null, splitOn: "id, id").AsList();
                db.Close();
                return query[0];
            }
        }
        public override bool Insert(Configuration item)
        {
            throw new Exception("Utilize o método que recebe como param um ConfigurationUpload.");
        }
        public bool Insert(ConfigurationUpload item)
        {
            using(IDbConnection db = new SqlConnection(ConnectionString))
            {
                Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;
                if(db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                string query = "INSERT INTO CONFIGURATION(ID_PERIOD) VALUES (@Period)";
                var result = db.Execute(query, new { Period = item.IdPeriod });
                db.Close();
                return result > 0;
            }
        }
        public override bool Update(Configuration item)
        {
            throw new Exception("Utilize o método que recebe como param um ConfigurationUpload.");
        }
        public bool Update(ConfigurationUpload item)
        {
            using(IDbConnection db = new SqlConnection(ConnectionString))
            {
                Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                string query = "UPDATE CONFIGURATION SET ID_PERIOD = @Period WHERE ID = @Id";
                var result = db.Execute(query, new { Period = item.IdPeriod, Id = item.Id });
                db.Close();
                return result > 0;
            }
        }
    }
}

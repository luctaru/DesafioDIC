using Dapper;
using DICs_API.Models;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;


namespace DICs_API.Repositories
{
    public class PeriodRepository : AbstractRepository<Period>
    {
        public PeriodRepository(IConfiguration configuration) : base(configuration) { }

        public override bool Delete(int id)
        {
            using(IDbConnection db = new SqlConnection(ConnectionString))
            {
                Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;
                if(db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                string query = "UPDATE PERIOD SET REMOVED = 1 WHERE ID = @Id";
                var result = db.Execute(query, new { Id = id });
                db.Close();
                return (result > 0);
            }
        }

        public override Period Get(int id)
        {
            using(IDbConnection db = new SqlConnection(ConnectionString))
            {
                Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;
                if(db.State == ConnectionState.Closed)
                {
                    db.Open();
                }

                string query = "SELECT * FROM PERIOD WHERE ID = @Id";
                var period = db.QueryFirst<Period>(query, new { Id = id });
                db.Close();
                return period;
            }
        }

        public override IEnumerable<Period> GetAll()
        {
            using(IDbConnection db = new SqlConnection(ConnectionString))
            {
                Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;
                if(db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                IEnumerable<Period> periods = db.Query<Period>("SELECT * FROM PERIOD WHERE REMOVED = 0");
                return ((List<Period>)periods);
            }
        }

        public override Period GetLastInserted()
        {
            using(IDbConnection db = new SqlConnection(ConnectionString))
            {
                Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;
                if(db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                var period = db.QueryFirst<Period>("SELECT * FROM PERIOD WHERE ID = IDENT_CURRENT('PERIOD')");
                return period;
            }
        }

        public override bool Insert(Period item)
        {
            using(IDbConnection db = new SqlConnection(ConnectionString))
            {
                Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;
                if(db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                string query = "INSERT INTO PERIOD (MONTHS, NAME) VALUES (@Months, @Name)";
                var result = db.Execute(query, item);
                db.Close();
                return result > 0;
            }
        }

        public override bool Update(Period item)
        {
            using(IDbConnection db = new SqlConnection(ConnectionString))
            {
                Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;
                if(db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                string query = "UPDATE PERIOD SET MONTHS = @Months, NAME = @Name WHERE ID = @Id";
                var result = db.Execute(query, item);
                db.Close();
                return result > 0;
            }
        }
    }
}

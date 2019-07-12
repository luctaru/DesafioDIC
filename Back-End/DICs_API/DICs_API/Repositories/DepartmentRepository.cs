using Dapper;
using DICs_API.Models;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;


namespace DICs_API.Repositories
{
    public class DepartmentRepository : AbstractRepository<Department>
    {
        public DepartmentRepository(IConfiguration configuration) : base(configuration)
        {
        }

        public override bool Delete(int id)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString)) {
                Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;
                if(db.State == ConnectionState.Closed)
                {
                    db.Open();
                }

                string query = "UPDATE DEPARTMENT SET REMOVED = 1 WHERE ID = @Id";
                var result = db.Execute(query, new { Id = id });
                db.Close();
                return (result > 0);
            } 
        }

        public override Department Get(int id)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;
                if(db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                string query = "SELECT * FROM DEPARTMENT WHERE ID = @Id";
                var department = db.QueryFirst<Department>(query, new { Id = id });
                db.Close();
                return department;
            }
        }

        public override IEnumerable<Department> GetAll()
        {
            using(IDbConnection db = new SqlConnection(ConnectionString))
            {
                Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;
                if(db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                IEnumerable<Department> departments = db.Query<Department>("SELECT * FROM DEPARTMENT WHERE REMOVED = 0");
                return (List<Department>)departments;
            }
        }

        public override Department GetLastInserted()
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                var department = db.QueryFirst<Department>("SELECT * FROM DEPARTMENT WHERE ID = IDENT_CURRENT('DEPARTMENT')");
                return department;
            }
        }

        public override bool Insert(Department item)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                string query = "INSERT INTO DEPARTMENT(NAME) VALUES (@Name)";
                var result = db.Execute(query, item);
                db.Close();
                return result > 0;
            }
        }

        public override bool Update(Department item)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                string query = "UPDATE DEPARTMENT SET NAME = @Name WHERE ID = @Id";
                var result = db.Execute(query, item);
                db.Close();
                return result > 0;
            }
        }
    }
}

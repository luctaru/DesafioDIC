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
    public class ProcessRepository : AbstractRepository<Process>
    {
        public ProcessRepository(IConfiguration configuration) : base(configuration) { }
        public override bool Delete(int id)
        {
            using(IDbConnection db = new SqlConnection(ConnectionString))
            {
                Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;
                if(db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                string query = "UPDATE PROCESS SET REMOVED = 1 WHERE ID = @Id";
                var result = db.Execute(query, new { Id = id });
                db.Close();
                return (result > 0);
            }
        }

        public override Process Get(int id)
        {
            using(IDbConnection db = new SqlConnection(ConnectionString))
            {
                Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;
                if(db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                var query = db.Query<Process, Department, Process>
                    (@"SELECT p.*, d.* 
                        FROM PROCESS p INNER JOIN DEPARTMENT d 
                        ON p.ID_DEPARTMENT = d.id 
                        WHERE p.ID = @Id AND p.REMOVED = 0"
                , (p, d) => 
                {
                    p.Department = d;
                    return p;
                }, new { Id = id} , splitOn: "id, id").AsList();
                return query[0];
            }
        }

        public override IEnumerable<Process> GetAll()
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                var query = db.Query<Process, Department, Process>
                    (@"SELECT p.*, d.* 
                        FROM PROCESS p INNER JOIN DEPARTMENT d 
                        ON p.ID_DEPARTMENT = d.id 
                        WHERE p.REMOVED = 0"
                , (p, d) =>
                {
                    p.Department = d;
                    return p;
                }, null, splitOn: "id, id").AsList();
                return (List<Process>)query;
            }
        }

        public override Process GetLastInserted()
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                var query = db.Query<Process, Department, Process>
                    (@"SELECT p.*, d.* 
                        FROM PROCESS p INNER JOIN DEPARTMENT d 
                        ON p.ID_DEPARTMENT = d.id 
                        WHERE p.ID = IDENT_CURRENT('PROCESS')"
                , (p, d) =>
                {
                    p.Department = d;
                    return p;
                }, null, splitOn: "id, id").AsList();
                return query[0];
            }
        }

        public override bool Insert(Process item)
        {
            throw new Exception("Utilize o método que recebe como param um ProcessUpload.");
        }

        public bool Insert(ProcessUpload item){
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                int result = db.Execute("INSERT INTO PROCESS(NAME, ID_DEPARTMENT) VALUES (@Name, @IdDepartment)", item);
                return (result > 0);
            }
        }

        public override bool Update(Process item)
        {
            throw new Exception("Utilize o método que recebe como param um ProcessUpload.");
        }

        public bool Update(ProcessUpload item)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                int result = db.Execute("UPDATE PROCESS SET NAME = @Name, ID_DEPARTMENT = @IdDepartment WHERE ID = @Id", item);
                return (result > 0);
            }

        }
    }
}

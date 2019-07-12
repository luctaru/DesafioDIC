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
    public class DICRepository : AbstractRepository<DIC>
    {
        public DICRepository(IConfiguration configuration) : base(configuration)
        {
        }

        public override bool Delete(int id)
        {
            throw new Exception("Não é possível excluir um DIC.");
        }

        public override DIC Get(int id)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;
                if(db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                var query = db.Query<DIC, Users, Status, Period, Department, Process, DIC>(@"
                          SELECT d.*,IS_LATE = dbo.IS_LATE(d.FINISHED_DATE, d.START_DATE, p.MONTHS) , u.*, s.*, p.*, dep.*, pro.* 
                          FROM DIC d INNER JOIN USERS u ON d.ID_USER = U.ID 
			                        INNER JOIN STATUS s ON d.ID_STATUS = s.ID 
                                    INNER JOIN PERIOD p ON d.ID_PERIOD = p.ID
			                        INNER JOIN DEPARTMENT dep ON u.ID_DEPARTMENT = dep.ID
			                        INNER JOIN PROCESS pro ON u.ID_PROCESS = pro.ID
                         WHERE d.ID = @IdDic"
                , (d, u, s, p, dep, pro) =>
                {
                    d.User = u;
                    d.User.Department = dep;
                    d.User.Process = pro;
                    d.Status = s;
                    d.Period = p;
                    return d;
                }, new { IdDic = id }, splitOn: "id, id, id, id").AsList();
                return query[0];
            }
        }

        public IEnumerable<DIC> GetAllForUser(int idUser)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                var query = db.Query<DIC, Users, Status, Period, Department, Process, DIC>(@"
                          SELECT d.*,IS_LATE = dbo.IS_LATE(d.FINISHED_DATE, d.START_DATE, p.MONTHS) , u.*, s.*, p.*, dep.*, pro.* 
                          FROM DIC d INNER JOIN USERS u ON d.ID_USER = U.ID 
			                        INNER JOIN STATUS s ON d.ID_STATUS = s.ID 
                                    INNER JOIN PERIOD p ON d.ID_PERIOD = p.ID
			                        INNER JOIN DEPARTMENT dep ON u.ID_DEPARTMENT = dep.ID
			                        INNER JOIN PROCESS pro ON u.ID_PROCESS = pro.ID
                         WHERE u.ID = @IdUser"
                , (d, u, s, p, dep, pro) =>
                {
                    d.User = u;
                    d.User.Department = dep;
                    d.User.Process = pro;
                    d.Status = s;
                    d.Period = p;
                    return d;
                }, new { IdUser = idUser }, splitOn: "id, id, id, id").AsList();
                return query;
            }
        }

        public IEnumerable<DIC> GetAllForProcess(int idProcess)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                var query = db.Query<DIC, Users, Status, Period, Department, Process, DIC>(@"
                          SELECT d.*,IS_LATE = dbo.IS_LATE(d.FINISHED_DATE, d.START_DATE, p.MONTHS) , u.*, s.*, p.*, dep.*, pro.* 
                          FROM DIC d INNER JOIN USERS u ON d.ID_USER = U.ID 
			                        INNER JOIN STATUS s ON d.ID_STATUS = s.ID 
                                    INNER JOIN PERIOD p ON d.ID_PERIOD = p.ID
			                        INNER JOIN DEPARTMENT dep ON u.ID_DEPARTMENT = dep.ID
			                        INNER JOIN PROCESS pro ON u.ID_PROCESS = pro.ID
                         WHERE u.ID_PROCESS = @IdProcess"
                , (d, u, s, p, dep, pro) =>
                {
                    d.User = u;
                    d.User.Department = dep;
                    d.User.Process = pro;
                    d.Status = s;
                    d.Period = p;
                    return d;
                }, new { IdProcess = idProcess }, splitOn: "id, id, id, id").AsList();
                return query;
            }
        }
        public IEnumerable<DIC> GetAllForDepartment(int idDepartment)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                var query = db.Query<DIC, Users, Status, Period, Department, Process, DIC>(@"
                          SELECT d.*,IS_LATE = dbo.IS_LATE(d.FINISHED_DATE, d.START_DATE, p.MONTHS) , u.*, s.*, p.*, dep.*, pro.* 
                          FROM DIC d INNER JOIN USERS u ON d.ID_USER = U.ID 
			                        INNER JOIN STATUS s ON d.ID_STATUS = s.ID 
                                    INNER JOIN PERIOD p ON d.ID_PERIOD = p.ID
			                        INNER JOIN DEPARTMENT dep ON u.ID_DEPARTMENT = dep.ID
			                        INNER JOIN PROCESS pro ON u.ID_PROCESS = pro.ID
                         WHERE u.ID_DEPARTMENT = @IdDepartment"
                , (d, u, s, p, dep, pro) =>
                {
                    d.User = u;
                    d.User.Department = dep;
                    d.User.Process = pro;
                    d.Status = s;
                    d.Period = p;
                    return d;
                }, new { IdDepartment = idDepartment }, splitOn: "id, id, id, id").AsList();
                return query;
            }
        }
        public override IEnumerable<DIC> GetAll()
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                var query = db.Query<DIC, Users, Status, Period, Department, Process, DIC>(@"
                          SELECT d.*,IS_LATE = dbo.IS_LATE(d.FINISHED_DATE, d.START_DATE, p.MONTHS) , u.*, s.*, p.*, dep.*, pro.* 
                          FROM DIC d INNER JOIN USERS u ON d.ID_USER = U.ID 
			                        INNER JOIN STATUS s ON d.ID_STATUS = s.ID 
                                    INNER JOIN PERIOD p ON d.ID_PERIOD = p.ID
			                        INNER JOIN DEPARTMENT dep ON u.ID_DEPARTMENT = dep.ID
			                        INNER JOIN PROCESS pro ON u.ID_PROCESS = pro.ID"
                , (d, u, s, p, dep, pro) =>
                {
                    d.User = u;
                    d.User.Department = dep;
                    d.User.Process = pro;
                    d.Status = s;
                    d.Period = p;
                    return d;
                }, null, splitOn: "id, id, id, id").AsList();
                return (List<DIC>)query;
            }
        }

        public override DIC GetLastInserted()
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                var query = db.Query<DIC, Users, Status, Period, Department, Process, DIC>(@"
                            SELECT d.*,IS_LATE = dbo.IS_LATE(d.FINISHED_DATE, d.START_DATE, p.MONTHS) , u.*, s.*, p.*, dep.*, pro.*
                            FROM DIC d INNER JOIN USERS u ON d.ID_USER = U.ID 
			                     INNER JOIN STATUS s ON d.ID_STATUS = s.ID 
                                 INNER JOIN PERIOD p ON d.ID_PERIOD = p.ID
			                     INNER JOIN DEPARTMENT dep ON u.ID_DEPARTMENT = dep.ID
			                     INNER JOIN PROCESS pro ON u.ID_PROCESS = pro.ID
                            WHERE d.ID = IDENT_CURRENT('DIC')"
                , (d, u, s, p, dep, pro) =>
                {
                    d.User = u;
                    d.User.Department = dep;
                    d.User.Process = pro;
                    d.Status = s;
                    d.Period = p;
                    return d;
                }, null, splitOn: "id, id, id, id").AsList();
                return query[0];
            }
        }

        public override bool Insert(DIC item)
        {
            throw new Exception("Utilize o método que recebe como param um DICUpload.");
        }

        public bool Insert(DICUpload item)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                int result = db.Execute(@"INSERT INTO DIC(ID_USER, DESCRIPTION, START_DATE, ID_STATUS, ID_PERIOD)
                                            VALUES(@IdUser, @Description, GETDATE(), @IdStatus, @IdPeriod)",
                                            item );
                return (result > 0);
            }
        }

        public override bool Update(DIC item)
        {
            throw new Exception("Utize o método que recebe como param um DICUpload.");
        }
        
        public bool Update(DICUpload item)
        {
            Console.WriteLine(item.FinishedDate);
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                int result = 0;
                if (DateTime.Compare(item.FinishedDate, DateTime.MinValue) > 0 &&
                   DateTime.Compare(item.FinishedDate, DateTime.MaxValue) < 0)
                {
                    result = db.Execute(@"UPDATE DIC SET 	
                                        DESCRIPTION = @Description,
				                        FINISHED_DATE = @FinishedDate,
				                        ID_STATUS = @IdStatus 
                                        WHERE ID = @Id ", item);
                } else
                {
                    result = db.Execute(@"UPDATE DIC SET 	
                                        DESCRIPTION = @Description,
				                        ID_STATUS = @IdStatus 
                                        WHERE ID = @Id ", item);
                }
                    
                return (result > 0);
            }
        }
    }
}

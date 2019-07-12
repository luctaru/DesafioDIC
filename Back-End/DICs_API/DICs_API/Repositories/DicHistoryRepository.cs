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
    public class DicHistoryRepository : AbstractRepository<DicHistory>
    {
        public DicHistoryRepository(IConfiguration configuration) : base(configuration)
        {
        }

        public override bool Delete(int id)
        {
            throw new Exception("Não é permitida a exclusão de nenhum histórico");
        }

        public override DicHistory Get(int id)
        {
            throw new Exception("Utilize o método GetAll pra obter os históricos passando como parametro o id");
        }

        public override IEnumerable<DicHistory> GetAll()
        {
            throw new Exception("Utilize o método GetAll pra obter os históricos passando como parametro o id");
        }
        //Get all com id user
        public IEnumerable<DicHistory>GetAll(int id)
        {
            using( IDbConnection db = new SqlConnection(ConnectionString))
            {
                Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;
                if(db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                var query = db.Query<DicHistory, Status, DicHistory>(@"SELECT h.*, s.*
                                FROM DIC_HISTORY h INNER JOIN DIC d ON h.ID_DIC = d.ID
                                INNER JOIN STATUS s ON h.ID_STATUS_DIC = s.ID
                                WHERE d.ID = @Id"
                            , (h, s) =>
                             {
                                 h.StatusDic = s;
                                 return h;
                             }, new { Id = id }, splitOn:"id,id").AsList();
                return query;
            }

        }

        public override DicHistory GetLastInserted()
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                var query = db.Query<DicHistory, Status, DicHistory>(@"SELECT h.*, s.*
                                FROM DIC_HISTORY h INNER JOIN DIC d ON h.ID_DIC = d.ID
                                INNER JOIN STATUS s ON h.ID_STATUS_DIC = s.ID
                                WHERE h.ID = IDENT_CURRENT('DIC_HISTORY')"
                            , (h, s) =>
                            {
                                h.StatusDic = s;
                                return h;
                            }, null, splitOn: "id,id").AsList() ;
                return query[0];
            }
        }

        public override bool Insert(DicHistory item)
        {
            throw new Exception("Utilize o método que recebe como param um DicHistoryUpload.");
        }

        public bool Insert(DicHistoryUpload item)
        {
            using (IDbConnection db = new SqlConnection(ConnectionString))
            {
                Dapper.DefaultTypeMap.MatchNamesWithUnderscores = true;
                if (db.State == ConnectionState.Closed)
                {
                    db.Open();
                }
                int result = db.Execute(@"INSERT INTO DIC_HISTORY(ID_DIC, NOTE, DATE, ID_STATUS_DIC, TYPE)
                                          VALUES(@IdDic, @Note, GETDATE(), @IdStatus, @Type)", item);
                return (result > 0);
            }
        }

        //não implementar
        public override bool Update(DicHistory item)
        {
            throw new NotImplementedException();
        }
    }
}

using Pet_Pillbox.Models;
using Dapper;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace Pet_Pillbox.Data
{
    public class DoseTypesRepository
    {
        readonly string _connectionString;

        public DoseTypesRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("Pet_Pillbox");
        }

        public List<DoseType> GetAllDoseTypes()
        {
            using var db = new SqlConnection(_connectionString);

            var doseTypes = db.Query<DoseType>("select * from DoseTypes");

            return doseTypes.ToList();
        }

        public DoseType GetSingleDoseType(int doseTypeId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"select * from DoseTypes
                            where Id = @dtid";

            var parameters = new { dtid = doseTypeId };


            var singleDoseType = db.QueryFirstOrDefault<DoseType>(query, parameters);

            return singleDoseType;
        }
    }
}
using Pet_Pillbox.Models;
using Dapper;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pet_Pillbox.Data
{
    public class DoseTypesRepository
    {
        static List<DoseType> _doseTypes = new List<DoseType>();

        const string _connectionString = "Server=localhost;Database=Pet_Pillbox;Trusted_Connection=True;";

        public List<DoseType> GetAllDoseTypes()
        {
            using var db = new SqlConnection(_connectionString);

            var doseTypes = db.Query<DoseType>("select * from DoseTypes");

            return doseTypes.ToList();
        }
    }
}
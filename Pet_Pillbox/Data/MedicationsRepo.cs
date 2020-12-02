using Pet_Pillbox.Models;
using Dapper;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pet_Pillbox.Data
{
    public class MedicationsRepository
    {
        static List<Medication> _medications = new List<Medication>();

        const string _connectionString = "Server=localhost;Database=Pet_Pillbox;Trusted_Connection=True;";

        public List<Medication> GetAllMedications()
        {
            using var db = new SqlConnection(_connectionString);

            var medications = db.Query<Medication>("select * from Medications");

            return medications.ToList();
        }
    }
}
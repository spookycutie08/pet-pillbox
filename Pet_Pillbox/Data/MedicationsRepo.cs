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
    public class MedicationsRepository
    {
        readonly string _connectionString;

        public MedicationsRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("Pet_Pillbox");
        }

        public List<Medication> GetAllMedications()
        {
            using var db = new SqlConnection(_connectionString);

            var medications = db.Query<Medication>("select * from Medications");

            return medications.ToList();
        }

        public List<Medication> GetMedsByPetId(int petId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"select * from Medications
                            where PetId = @pid";

            var parameters = new { pid = petId };


            var petMeds = db.Query<Medication>(query, parameters);

            return (List<Medication>)petMeds;
        }
    }
}
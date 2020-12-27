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

        public List<Medication> GetCurrentMedsByPetId(int petId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"select * from Medications
                            where PetId = @pid
                            and EndDate >= GETDATE()";

            var parameters = new { pid = petId };

            var petMeds = db.Query<Medication>(query, parameters);

            return (List<Medication>)petMeds;
        }

        public void AddMed(Medication medToAdd)
        {
            var sql = @"INSERT INTO [dbo].[Medications]
                               ([Name]
                                ,[HoursBetweenDoses]
                                ,[StartDate]
                                ,[EndDate]
                                ,[DoseAmount]
                                ,[DoseTypeId]
                               ,[PetId])
                        Output inserted.Id
                        VALUES
                               (@name,@hoursBetweenDoses,@startDate,@endDate,@doseAmount,@doseTypeId,@petId)";

            using var db = new SqlConnection(_connectionString);

            var newId = db.ExecuteScalar<int>(sql, medToAdd);

            medToAdd.Id = newId;

        }
    }
}
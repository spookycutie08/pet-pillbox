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
    public class MedLogsRepository
    {
        readonly string _connectionString;

        public MedLogsRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("Pet_Pillbox");
        }

        public List<MedLog> GetAllMedLogs()
        {
            using var db = new SqlConnection(_connectionString);

            var medLogs = db.Query<MedLog>("select * from MedLogs");

            return medLogs.ToList();
        }

        public List<MedLog> GetMedLogsByMedId(int medId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"select * from MedLogs
                            where MedicationId = @mid
                            order by AdminDateTime Desc";

            var parameters = new { mid = medId };

            var petLogs = db.Query<MedLog>(query, parameters);

            return (List<MedLog>)petLogs;
        }

        public List<MedicationDue> GetMedsDueByPetId(int petId)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"SELECT Medications.Id, Medications.Name, (SELECT MAX(AdminDateTime) from MedLogs where MedicationId = Medications.Id) as LastDoseDateTime
                        from Medications
                        where Medications.PetId = @pid
                        and 
	                        (
	                        GETDATE() < Medications.EndDate
	                        )
                        and
	                        (
		                        Not Exists (
		                        SELECT 1 from MedLogs
		                        where MedicationId = Medications.Id
		                        )
		                    or 
		                        (
			                        DATEADD(HOUR, Medications.HoursBetweenDoses * -1, getdate()) > 
			                        (
			                        SELECT MAX(AdminDateTime) from MedLogs
			                        where MedicationId = Medications.Id
			                        )
		                        )
	                        )";

            var parameters = new { pid = petId };

            var medsDue = db.Query<MedicationDue>(query, parameters);

            return (List<MedicationDue>)medsDue;
        }

        public void AddNewLog(MedLog logToAdd)
        {
            var sql = @"INSERT INTO [dbo].[MedLogs]
                               ([MedicationId]
                                ,[AdminDateTime]
                                ,[DoseAmount]
                                ,[DoseTypeId])
                        Output inserted.Id
                        VALUES
                               (@medicationId,@adminDateTime,@doseAmount,@doseTypeId)";

            using var db = new SqlConnection(_connectionString);

            var newId = db.ExecuteScalar<int>(sql, logToAdd);

            logToAdd.Id = newId;

        }
    }
}
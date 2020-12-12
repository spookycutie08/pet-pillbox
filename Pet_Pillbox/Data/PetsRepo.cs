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
    public class PetsRepository
    {
        readonly string _connectionString;

        public PetsRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("Pet_Pillbox");
        }

        public List<Pet> GetAllPets()
        {
            using var db = new SqlConnection(_connectionString);

            var pets = db.Query<Pet>("select * from Pets");

            return pets.ToList();
        }

        public List<Pet> GetPetsByUser(string uid)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"select Pets.Id, Pets.Name, Pets.UserId, Users.FirebaseUid
                            from Pets
                            join Users
                            on Pets.UserId = Users.Id
                            where FirebaseUid = @Fbuid";

            var parameters = new { Fbuid = uid };


            var pets = db.Query<Pet>(query, parameters);

            return (List<Pet>) pets;
        }

        public void AddPet(Pet petToAdd)
        {
            var sql = @"INSERT INTO [dbo].[Pets]
                               ([Name]
                               ,[UserId])
                        Output inserted.Id
                        VALUES
                               (@name,@userId)";

            using var db = new SqlConnection(_connectionString);

            var newId = db.ExecuteScalar<int>(sql, petToAdd);

            petToAdd.Id = newId;

        }

    }
}
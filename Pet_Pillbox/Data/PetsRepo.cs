using Pet_Pillbox.Models;
using Dapper;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pet_Pillbox.Data
{
    public class PetsRepository
    {
        static List<Pet> _pets = new List<Pet>();

        const string _connectionString = "Server=localhost;Database=Pet_Pillbox;Trusted_Connection=True;";

        public List<Pet> GetAllPets()
        {
            using var db = new SqlConnection(_connectionString);

            var pets = db.Query<Pet>("select * from Pets");

            return pets.ToList();
        }
    }
}
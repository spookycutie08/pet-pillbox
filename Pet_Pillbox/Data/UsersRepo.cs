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
    public class UsersRepository
    {
        readonly string _connectionString;

        public UsersRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("Pet_Pillbox");
        }

        public List<User> GetAllUsers()
        {
            using var db = new SqlConnection(_connectionString);

            var users = db.Query<User>("select * from Users");

            return users.ToList();
        }

        public User GetUserByUid(string uid)
        {
            using var db = new SqlConnection(_connectionString);

            var query = @"select * from Users
                            where FirebaseUid = @Fbuid";

            var parameters = new { Fbuid = uid };


            var user = db.QueryFirstOrDefault<User>(query, parameters);

            return user;
        }

        public void AddUser(User userToAdd)
        {
            var sql = @"INSERT INTO [dbo].[Users]
                               ([FirebaseUid])
                        Output inserted.Id
                        VALUES
                               (@firebaseUid)";

            using var db = new SqlConnection(_connectionString);

            var newId = db.ExecuteScalar<int>(sql, userToAdd);

            userToAdd.Id = newId;

        }

    }
}
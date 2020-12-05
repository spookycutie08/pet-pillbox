﻿using Pet_Pillbox.Models;
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
﻿using Pet_Pillbox.Models;
using Dapper;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pet_Pillbox.Data
{
    public class UsersRepository
    {
        static List<User> _users = new List<User>();

        const string _connectionString = "Server=localhost;Database=Pet_Pillbox;Trusted_Connection=True;";

        public List<User> GetAllUsers()
        {
            using var db = new SqlConnection(_connectionString);

            var users = db.Query<User>("select * from Users");

            return users.ToList();
        }
    }
}
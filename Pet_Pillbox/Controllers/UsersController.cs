using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Pet_Pillbox.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pet_Pillbox.Models;

namespace Pet_Pillbox.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        UsersRepository _repo;

        public UsersController(UsersRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var allUsers = _repo.GetAllUsers();

            return Ok(allUsers);
        }

        [HttpGet("{uid}")]
        public IActionResult GetUserByUid(string uid)
        {
            var user = _repo.GetUserByUid(uid);

            if (user == null) return NotFound("No user found with that Firebase uid");

            return Ok(user);
        }

        [HttpPost]
        public IActionResult AddUser(User user)
        {
            _repo.AddUser(user);

            return Ok(user);
        }
    }
}

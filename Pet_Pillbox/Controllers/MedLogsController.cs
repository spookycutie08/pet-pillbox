using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Pet_Pillbox.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Pet_Pillbox.Controllers
{
    [Route("api/dosetypes")]
    [ApiController]
    public class MedLogsController : ControllerBase
    {
        MedLogsRepository _repo;

        public MedLogsController()
        {
            _repo = new MedLogsRepository();
        }

        [HttpGet]
        public IActionResult GetAllMedLogs()
        {
            var allMedLogs = _repo.GetAllMedLogs();

            return Ok(allMedLogs);
        }
    }
}

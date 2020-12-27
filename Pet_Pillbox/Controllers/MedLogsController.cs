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
    [Route("api/medlogs")]
    [ApiController]
    public class MedLogsController : ControllerBase
    {
        MedLogsRepository _repo;

        public MedLogsController(MedLogsRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetAllMedLogs()
        {
            var allMedLogs = _repo.GetAllMedLogs();

            return Ok(allMedLogs);
        }

        [HttpGet("{medId}")]
        public IActionResult GetMedLogsByMedId(int medId)
        {
            var logs = _repo.GetMedLogsByMedId(medId);

            if (logs == null) return NotFound("No logs found for this medication.");

            return Ok(logs);
        }

        [HttpGet("lastDoses/{petId}")]
        public IActionResult GetMedsDueByPetId(int petId)
        {
            var medsDue = _repo.GetMedsDueByPetId(petId);

            if (medsDue == null) return NotFound("No medications due for this pet.");

            return Ok(medsDue);
        }

        [HttpPost]
        public IActionResult AddNewLog(MedLog newLog)
        {
            _repo.AddNewLog(newLog);

            return Created($"/api/medlogs", newLog);
        }
    }
}

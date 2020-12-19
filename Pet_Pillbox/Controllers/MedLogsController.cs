using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Pet_Pillbox.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
        public IActionResult GetLastDosesByPetId(int petId)
        {
            var logs = _repo.GetLastDosesByPetId(petId);

            if (logs == null) return NotFound("No dosing history for this pet.");

            return Ok(logs);
        }
    }
}

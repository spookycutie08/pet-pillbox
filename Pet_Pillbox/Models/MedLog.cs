using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pet_Pillbox.Models
{
    public class MedLog
    {
        public int Id { get; set; }
        public int MedicationId { get; set; }
        public DateTime AdminDateTime { get; set; }
        public decimal DoseAmount { get; set; }
        public int DoseTypeId { get; set; }
    }
}

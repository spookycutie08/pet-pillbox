using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pet_Pillbox.Models
{
    public class Medication
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int HoursBetweenDoses { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Double DoseAmount { get; set; }
        public int DoseTypeId { get; set; }
        public int PetId { get; set; }

    }
}

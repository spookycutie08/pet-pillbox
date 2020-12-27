using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pet_Pillbox.Models
{
    public class MedicationDue
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime LastDoseDateTime { get; set; }
    }
}

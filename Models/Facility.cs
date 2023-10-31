
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eHospitalManager_LIN.Models
{
    public class Facility
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; } 
        public string facility_code { get; set; }
        public string facility_name { get; set; }
        public int district_id { get; set; }
        public int owner_id { get; set; }
    }
}

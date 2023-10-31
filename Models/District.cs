using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace eHospitalManager_LIN.Models
{
    public class District
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DistrictId { get; set; }
        public string DistrictName { get; set; }
        public int ZoneId { get; set; }
        public string DistrictCode { get; set; }
        public DateTime DateCreated { get; set; }
       
    }
}

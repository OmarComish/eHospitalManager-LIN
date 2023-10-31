
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
        public string FacilityCode { get; set; }
        public string FacilityName { get; set; }
        public string DistrictId { get; set; }
        public string OwnerId { get; set; }
        public DateTime DateCreated { get; set; }
        public string CommonName { get; set; }
        public string RegistrationNumber { get; set; }
    }
}

using System.Collections.Generic;
using System;
namespace eHospitalManager_LIN.Models
{
    public class VModels
    {
        public List<VMDistrict> VMDistricts { get; set; }
        public List<VMOwner> VMOwnerList { get; set;}
    }
    public class VMDistrict
    {
        public string DistricCode { get; set; }
        public string DistrictName { get; set; }
    }
    public class VMOwner
    {
        public int Id { get; set; }
        public string Facility { get; set; }    
    }
}

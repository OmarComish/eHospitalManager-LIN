using System;
using eHospitalManager_LIN.DAL;
using System.Linq;
using eHospitalManager_LIN.Models;

namespace eHospitalManager_LIN.BLL
{
    public class FacilityRepository : iFacilityManager
    {
        public string[] AddFacility(Facility facility)
        {
            string[] response = { "error", "Facility already exist. Failed to add facility" };
            using(var context = new DataContext())
            {
                var record = context.Facility.Where(f =>f.FacilityCode == facility.FacilityCode).FirstOrDefault();
                if(record == null)
                {
                    facility.DateCreated = DateTime.Now;
                    context.Add(facility);
                    context.SaveChanges();
                    response[0] = "success";
                    response[1] = "Facility " + facility.FacilityName + "  added successfully";
                }
                return response;
            }
            
        }
    }
}

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
        public string[] AddOwner(Owner owner)
        {
            string[] response = { "error", "Owner already exist. Failed to add Owner" };
            using (var context = new DataContext())
            {
                var record = context.Owner.Where(o => o.FacilityOwner == owner.FacilityOwner).FirstOrDefault();
                if (record == null)
                {
                    owner.DateCreated = DateTime.Now;
                    context.(owner);
                    context.SaveChanges();
                    response[0] = "success";
                    response[1] = "Owner " + owner.FacilityOwner + "  added successfully";
                }
                return response;
            }
        }
        public string[] AddDistrict(District district)
        {
            string[] response = { "error", "Owner already exist. Failed to add Owner" };
            using (var context = new DataContext())
            {
                var record = context.District.Where(d => d.DistrictCode == district.DistrictCode).FirstOrDefault();
                if (record == null)
                {
                    district.DateCreated = DateTime.Now;
                    context.(district);
                    context.SaveChanges();
                    response[0] = "success";
                    response[1] = "District " + district.DistrictName + "  added successfully";
                }
                return response;
            }
        }
    }
}

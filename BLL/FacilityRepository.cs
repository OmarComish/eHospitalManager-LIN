using System;
using eHospitalManager_LIN.Models;

namespace eHospitalManager_LIN.BLL
{
    public class FacilityRepository : iFacilityManager
    {
        public string[] AddFacility(Facility facility)
        {
            string[] response = { "error", "Failed to add facility" };
            return response;
        }
    }
}

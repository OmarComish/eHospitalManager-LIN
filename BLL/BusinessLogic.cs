using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net;
using eHospitalManager_LIN.Models;
using System.Threading.Tasks;

namespace eHospitalManager_LIN.BLL
{
   
        public interface iFacilityManager
        {
            string[] AddFacility(Facility facility);
            string[] AddDistrict(District district);
            string[] AddOwner(Owner owner);
            VModels GetInitialisation();
        }
    
}

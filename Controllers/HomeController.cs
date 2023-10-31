using eHospitalManager_LIN.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using eHospitalManager_LIN.BLL;
using System.Threading.Tasks;

namespace eHospitalManager_LIN.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly iFacilityManager _facilitymanager;

        public HomeController(ILogger<HomeController> logger, iFacilityManager facilitymanager)
        {
            _logger = logger;
            _facilitymanager = facilitymanager;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
        [HttpPost]
        public async Task<IActionResult> AddFacility([FromBody] Facility facility)
        {
            var response = await Task.Run(() => _facilitymanager.AddFacility(facility));
            return Ok(response);
        }
    }
}

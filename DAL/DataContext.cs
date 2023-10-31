
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;
using eHospitalManager_LIN.Models;
using Microsoft.Extensions.Configuration;

namespace eHospitalManager_LIN.DAL
{
    public class DataContext : DbContext
    {
        public DbSet<Facility> Facility  { get; set; }
        public DbSet<Owner> Owner { get; set; }
        public DbSet<District> District { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                 .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                 .AddJsonFile("appsettings.json")
                 .Build();
            optionsBuilder.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
    }
}

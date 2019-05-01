using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vega.Models;

namespace Vega.Data
{
    public class VehicleRepository : IVehicleRepository
    {
        private readonly AppDbContext context;

        public VehicleRepository(AppDbContext context)
        {
            this.context = context;
        }
        public async Task<Vehicle> GetVehicle(int id, bool includeRelated = true)
        {
            if (!includeRelated)
            {
                return await context.Vehicles.FindAsync(id);
            }

            return await context.Vehicles
               .Include(v => v.Features)
               .ThenInclude(vf => vf.Feature).
               Include(v => v.Model)
               .ThenInclude(m => m.Make)
               .SingleOrDefaultAsync(x => x.Id == id);
        }

        public async void RemoveVehicle(int id)
        {
            var vehicle = await context.Vehicles.FindAsync(id);
            context.Vehicles.Remove(vehicle);
        }

        public void AddVehicle(Vehicle vehicle)
        {
            context.Vehicles.Add(vehicle);
        }
    }
}

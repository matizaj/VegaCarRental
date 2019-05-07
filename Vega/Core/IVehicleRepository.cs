using System.Collections.Generic;
using System.Threading.Tasks;
using Vega.Core.Models;

namespace Vega.Core
{
    public interface IVehicleRepository
    {
        Task<Vehicle> GetVehicle(int id, bool includeRelated = true);
        void RemoveVehicle(int id);
        void AddVehicle(Vehicle vehicle);
        Task<IEnumerable<Vehicle>> GetAllVehicles(VehicleQuery filter);
    }
}
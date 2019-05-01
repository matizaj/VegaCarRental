using System.Threading.Tasks;
using Vega.Models;

namespace Vega.Data
{
    public interface IVehicleRepository
    {
        Task<Vehicle> GetVehicle(int id, bool includeRelated = true);
        void RemoveVehicle(int id);
        void AddVehicle(Vehicle vehicle);
    }
}
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vega.Data;
using Vega.Models;
using Vega.Resources;

namespace Vega.Controllers
{
    [Route("/api/[controller]")]
    public class VehiclesController:ControllerBase
    {
        private readonly IMapper mapper;
        private readonly IVehicleRepository repository;
        private readonly IUnitOfWork unitOfWork;

        public VehiclesController(IMapper mapper, IVehicleRepository repository, IUnitOfWork unitOfWork)
        {
            this.mapper = mapper;
            this.repository = repository;
            this.unitOfWork = unitOfWork;
        }

        [HttpPost]
        public async Task<IActionResult> CreateVehicle([FromBody] SaveVehicleResources vehicleRes)
        {
            var vehicle = mapper.Map<SaveVehicleResources, Vehicle>(vehicleRes);
            //vehicle.LastUpdate = DateTime.Now;
            repository.AddVehicle(vehicle);
            await unitOfWork.CompleteAsync();

            vehicle = await repository.GetVehicle(vehicle.Id);

            var result = mapper.Map<Vehicle, VehicleResources>(vehicle);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVehicle([FromBody] SaveVehicleResources vehicleRes, int id)
        {
            // var vehicle = await context.Vehicles.Include(v=>v.Features).SingleOrDefaultAsync(x=>x.Id == id);

            var vehicle = await repository.GetVehicle(id);

            if (vehicle == null)
            {
                return NotFound();
            }

            // vehicle.LastUpdate = DateTime.Now;
            await unitOfWork.CompleteAsync();
            var result = mapper.Map<Vehicle, VehicleResources>(vehicle);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            var vehicle = await repository.GetVehicle(id, includeRelated: false);
            if(vehicle == null)
            {
                return NotFound();
            }
            repository.RemoveVehicle(id);
            await unitOfWork.CompleteAsync();
            
            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicle(int id)
        {
            var vehicle = await repository.GetVehicle(id);
            if (vehicle == null)
            {
                return NotFound();
            }

            var result = mapper.Map<Vehicle, VehicleResources>(vehicle);
            return Ok(result);
        }
    }
}

﻿using AutoMapper;
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
        private readonly AppDbContext context;

        public VehiclesController(IMapper mapper, AppDbContext context)
        {
            this.mapper = mapper;
            this.context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateVehicle([FromBody] SaveVehicleResources vehicleRes)
        {
            var vehicle = mapper.Map<SaveVehicleResources, Vehicle>(vehicleRes);
            //vehicle.LastUpdate = DateTime.Now;
            context.Vehicles.Add(vehicle);
            await context.SaveChangesAsync();

            vehicle = await context.Vehicles
               .Include(v => v.Features)
               .ThenInclude(vf => vf.Feature).
               Include(v => v.Model)
               .ThenInclude(m => m.Make)
               .SingleOrDefaultAsync(x => x.Id == vehicle.Id);

            var result = mapper.Map<Vehicle, VehicleResources>(vehicle);
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVehicle([FromBody] SaveVehicleResources vehicleRes, int id)
        {
           // var vehicle = await context.Vehicles.Include(v=>v.Features).SingleOrDefaultAsync(x=>x.Id == id);
            
            var vehicle = await context.Vehicles
               .Include(v => v.Features)
               .ThenInclude(vf => vf.Feature).
               Include(v => v.Model)
               .ThenInclude(m => m.Make)
               .SingleOrDefaultAsync(x => x.Id == id);

            if (vehicle == null)
            {
                return NotFound();
            }
            
            // vehicle.LastUpdate = DateTime.Now;
            await context.SaveChangesAsync();
            var result = mapper.Map<Vehicle, VehicleResources>(vehicle);
            return Ok(result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            var vehicle = await context.Vehicles.FindAsync(id);
            if(vehicle == null)
            {
                return NotFound();
            }
            context.Remove(vehicle);
            await context.SaveChangesAsync();
            
            return Ok();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicle(int id)
        {
            var vehicle = await context.Vehicles
                .Include(v=>v.Features)
                .ThenInclude(vf=>vf.Feature).
                Include(v=>v.Model)
                .ThenInclude(m=>m.Make)
                .SingleOrDefaultAsync(x=>x.Id == id);
            if (vehicle == null)
            {
                return NotFound();
            }

            var result = mapper.Map<Vehicle, VehicleResources>(vehicle);
            return Ok(result);
        }
    }
}

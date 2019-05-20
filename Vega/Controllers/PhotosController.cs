using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Vega.Core;
using Vega.Core.Models;
using Vega.Resources;

namespace Vega.Controllers
{
    //api/vehicles/1/photos
    [Route("/api/vehicles/{vehicleId}/[controller]")]
    public class PhotosController:ControllerBase
    {
        private readonly IHostingEnvironment host;
        private readonly IVehicleRepository repository;
        private readonly IUnitOfWork uow;
        private readonly IMapper mapper;

        public PhotosController(IHostingEnvironment host, IVehicleRepository repository, IUnitOfWork uow, IMapper mapper)
        {
            this.host = host;
            this.repository = repository;
            this.uow = uow;
            this.mapper = mapper;
        }
        [HttpPost]
        public async Task<IActionResult> Upload(int vehicleId, IFormFile file)
        {
            var vehicle = await repository.GetVehicle(vehicleId, includeRelated: false);
            var test = host.WebRootPath;
            if(vehicle == null)
            {
                return NotFound();
            }
            try
            {
                var uploadsFolderPath = Path.Combine(test, "uploads");
                if (!Directory.Exists(uploadsFolderPath))
                {
                    Directory.CreateDirectory(uploadsFolderPath);
                }

                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                var filePath = Path.Combine(uploadsFolderPath, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                var photo = new Photo { FileName = fileName };
                vehicle.Photos.Add(photo);
                await uow.CompleteAsync();
                return Ok(mapper.Map<Photo, PhotoResource>(photo));
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
            
        }
    }
}

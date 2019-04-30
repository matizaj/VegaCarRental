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
    public class FeaturesController:ControllerBase
    {
        private readonly AppDbContext context;
        private readonly IMapper mapper;

        public FeaturesController(AppDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }
        [HttpGet]
        public async Task<IEnumerable<KeyValuePairResource>> GetFeatures()
        {
            var features = await context.Features.ToListAsync();
            return mapper.Map<IList<Feature>, IList<KeyValuePairResource>>(features);
        }
    }
}

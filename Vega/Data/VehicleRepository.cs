using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Vega.Core;
using Vega.Core.Models;
using Vega.Extensions;

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

        public async Task<QueryResults<Vehicle>> GetAllVehicles(VehicleQuery queryObj)
        {

            var queryResult = new QueryResults<Vehicle>();

            var query = context.Vehicles
               .Include(v => v.Features)
               .ThenInclude(vf => vf.Feature).
               Include(v => v.Model)
               .ThenInclude(m => m.Make).AsQueryable();

            Expression<Func<Vehicle, object>> exp;
            string str;

            var columnsMap = new Dictionary<string, Expression<Func<Vehicle, object>>>()
            {
                ["make"] = v => v.Model.Make.Name,
                ["model"] = v => v.Model.Name,
                ["contactName"]= v => v.ContactName,
                ["id"]= v => v.Id
            };

             query = query.ApplyOrdering(queryObj, columnsMap);
            ///before dictionary
            if (queryObj.MakeId.HasValue)
            {
                query = query.Where(v => v.Model.MakeId == queryObj.MakeId.Value);
            }

            //if (queryObj.SortBy == "make")
            //{
            //    query = (queryObj.IsSortAsc) ? query.OrderBy(v => v.Model.Make.Name) : query.OrderByDescending(v => v.Model.Make.Name);
            //}

            //if (queryObj.SortBy == "model")
            //{
            //    query = (queryObj.IsSortAsc) ? query.OrderBy(v => v.Model.Name) : query.OrderByDescending(v => v.Model.Name);
            //}

            //if (queryObj.SortBy == "contactName")
            //{
            //    query = (queryObj.IsSortAsc) ? query.OrderBy(v => v.ContactName) : query.OrderByDescending(v => v.ContactName);
            //}

            //if (queryObj.SortBy == "id")
            //{
            //    query = (queryObj.IsSortAsc) ? query.OrderBy(v => v.Id) : query.OrderByDescending(v => v.Id);
            //}

            queryResult.TotalItems = await query.CountAsync();

            query = query.ApplyPaging(queryObj);

            queryResult.Items = await query.ToListAsync();

            return queryResult;
        }

        
    }
}

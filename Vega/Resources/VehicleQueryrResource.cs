using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Vega.Resources
{
    public class VehicleQueryResource
    {
        public int? MakeId { get; set; }
        public string SortBy { get; set; }
        public bool IsSortAsc { get; set; }
    }
}

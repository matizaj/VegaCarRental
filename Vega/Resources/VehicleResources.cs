using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;

namespace Vega.Resources
{
    public class VehicleResources
    {
        public int Id { get; set; }
        public int ModelId { get; set; }
        public bool IsRegistered { get; set; }
        public ContactResource Contact { get; set; }
        public ICollection<int> Features { get; set; }
        public VehicleResources()
        {
            Features = new Collection<int>();
        }
    }
}

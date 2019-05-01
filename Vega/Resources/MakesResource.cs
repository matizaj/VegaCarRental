using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using Vega.Core.Models;

namespace Vega.Resources
{
    public class MakesResource: KeyValuePairResource
    {       
        public ICollection<KeyValuePairResource> Models { get; set; }
        public MakesResource()
        {
            Models = new Collection<KeyValuePairResource>();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Threading.Tasks;
using Vega.Models;

namespace Vega.Resources
{
    public class MakesResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<ModelsResource> Models { get; set; }
        public MakesResource()
        {
            Models = new Collection<ModelsResource>();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using vega.Models;

namespace vega.Controllers.Resources
{
    public class MakeResource
    {
        public int ID { get; set; }
        
        public string Name { get; set; }

        public ICollection<ModelResource> Models{ get; set; }

        public MakeResource()
        {
            Models = new Collection<ModelResource>();
        }
    }
}
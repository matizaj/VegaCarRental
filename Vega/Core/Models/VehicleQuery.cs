﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vega.Extensions;

namespace Vega.Core.Models
{
    public class VehicleQuery: IQueryObject
    {
        public int? MakeId { get; set; }
        public string SortBy { get; set; }
        public bool IsSortAsc { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
    }
}

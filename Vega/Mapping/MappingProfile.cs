﻿using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vega.Models;
using Vega.Resources;

namespace Vega.Mapping
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<Make, MakesResource>();
            CreateMap<Model, ModelsResource>();
            CreateMap<Feature, FeatureResource>();
        }
    }
}

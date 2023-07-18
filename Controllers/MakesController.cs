using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vega.Controllers.Resources;
using vega.Core.Models;
using vega.Persistence;

namespace vega.Controllers
{
    public class MakesController :Controller
    {
        public VegaDbContext Context { get; }
        private readonly IMapper mapper;
        public MakesController(VegaDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.Context = context;
        }
            [HttpGet("/api/makess")]
           public async Task<IEnumerable<MakeResource>> GetMakes(){
                var makes = await Context.Makes.Include(m=>m.Models).ToListAsync();
                return mapper.Map<List<Make>, List<MakeResource>>(makes);
           }
    }
}
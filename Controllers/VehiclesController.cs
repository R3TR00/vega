using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vega.Controllers.Resources;
using vega.Models;
using vega.Persistence;
//CRUD operations: Create Read Update Delete
namespace vega.Controllers
{
    [Route("/api/vehicles")]
    public class VehiclesController : Controller
    {
        private readonly IMapper mapper;
        public IVehicleRepository Repository { get; }
        private readonly IUnitOfWork unitOfWork;
        public VehiclesController(IMapper mapper, IVehicleRepository repository, IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.Repository = repository;
            this.mapper = mapper;
            
        }
        [HttpPost]
        public async Task<IActionResult> CreateVehicle( [FromBody] SaveVehicleResource vehicleResource){
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var model = await Repository.GetVehicle(vehicleResource.ModelId,false);
            if(model == null){
                ModelState.AddModelError("ModelId","Invalid ModelId");
                return BadRequest(ModelState);
            }

            var vehicle = mapper.Map<SaveVehicleResource,Vehicle>(vehicleResource);
            vehicle.Lastupdate = DateTime.Now;

            Repository.Add(vehicle);
            await unitOfWork.CompleteAsync();
            
            vehicle = await Repository.GetVehicle(vehicle.Id);

            var result = mapper.Map<Vehicle, VehicleResource>(vehicle);
            return Ok(result);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVehicle(int id, [FromBody] SaveVehicleResource vehicleResource){
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var vehicle = await Repository.GetVehicle(id);           
            
            if(vehicle == null)
                return NotFound();

            mapper.Map<SaveVehicleResource,Vehicle>(vehicleResource,vehicle);
            vehicle.Lastupdate = DateTime.Now;

            await unitOfWork.CompleteAsync();

            vehicle = await Repository.GetVehicle(id);
            var result = mapper.Map<Vehicle,VehicleResource>(vehicle);
            return Ok(result);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            var vehicle = await Repository.GetVehicle(id, includeRelated: false);
            
            if(vehicle == null)
                return NotFound();

            Repository.Remove(vehicle);
            await unitOfWork.CompleteAsync();

            return Ok(id);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetVehicle(int id)
        {
            var vehicle = await Repository.GetVehicle(id);
            
            if(vehicle == null)
                return NotFound();

            var vehicleResource = mapper.Map<Vehicle, VehicleResource>(vehicle);
            return Ok(vehicleResource);
        }
    }
}
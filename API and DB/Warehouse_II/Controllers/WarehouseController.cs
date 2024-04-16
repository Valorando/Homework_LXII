using Microsoft.AspNetCore.Mvc;
using Warehouse_II.Interfaces;
using Warehouse_II.Models;

namespace Warehouse_II.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WarehouseController : ControllerBase
    {
        private readonly IWarehouseService _warehouseService;

        public WarehouseController(IWarehouseService warehouseService)
        {
            _warehouseService = warehouseService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var values = await _warehouseService.GetValuesAsync();
            return Ok(values);
        }

        [HttpGet("{bookid}")]
        public async Task<IActionResult> Get(int bookid)
        {
            try
            {
                var book = await _warehouseService.GetBookAsync(bookid);
                return Ok(book);
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] WarehouseModel warehouseModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _warehouseService.AddBookAsync(warehouseModel);
            return CreatedAtAction(nameof(Get), new { id = warehouseModel.BookId }, warehouseModel);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] WarehouseModel warehouseModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await _warehouseService.UpdateBookAsync(id, warehouseModel);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _warehouseService.DeleteBookAsync(id);
                return NoContent();
            }
            catch (KeyNotFoundException)
            {
                return NotFound();
            }
        }
    }
}

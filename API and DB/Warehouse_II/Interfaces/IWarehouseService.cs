using Warehouse_II.Models;

namespace Warehouse_II.Interfaces
{
    public interface IWarehouseService
    {
        public Task<List<WarehouseModel>> GetValuesAsync();
        public Task AddBookAsync(WarehouseModel warehouseModel);
        public Task<WarehouseModel> GetBookAsync(int bookid);
        public Task UpdateBookAsync(int id, WarehouseModel warehouseModel);
        public Task DeleteBookAsync(int id);

    }
}

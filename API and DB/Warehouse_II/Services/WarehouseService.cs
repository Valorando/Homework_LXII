using MySql.Data.MySqlClient;
using System.Data;
using Warehouse_II.Models;
using Warehouse_II.Interfaces;

namespace Warehouse_II.Services
{
    public class WarehouseService : IWarehouseService
    {
        private readonly string _connectionString;
        private readonly Dictionary<string, string> _sqlQueries;

        public WarehouseService(string connectionString, Dictionary<string, string> sqlQueries)
        {
            _connectionString = connectionString;
            _sqlQueries = sqlQueries;
        }

        public async Task<List<WarehouseModel>> GetValuesAsync()
        {
            var books = new List<WarehouseModel>();

            using (var connection = new MySqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                var query = _sqlQueries["GetValuesAsyncQuery"];

                using (var command = new MySqlCommand(query, connection))
                using (var reader = await command.ExecuteReaderAsync())
                {
                    while (await reader.ReadAsync())
                    {
                        var book = new WarehouseModel
                        {
                            Id = reader.GetInt32("Id"),
                            BookId = reader.GetInt32("BookId"),
                            CountAvailable = reader.GetInt32("CountAvailable")
                        };
                        books.Add(book);
                    }
                }
            }

            return books;
        }



        public async Task AddBookAsync(WarehouseModel warehouseModel)
        {
            using (var connection = new MySqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                var query = _sqlQueries["AddBookAsyncQuery"];

                using (var command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@bookid", warehouseModel.BookId);
                    command.Parameters.AddWithValue("@countavailable", warehouseModel.CountAvailable);
                    await command.ExecuteNonQueryAsync();
                }
            }
        }

        public async Task<WarehouseModel> GetBookAsync(int bookid)
        {
            using (var connection = new MySqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                var query = _sqlQueries["GetBookAsyncQuery"];

                using (var command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@bookid", bookid);
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            int id = reader.GetInt32("Id");
                            int countavailable = reader.GetInt32("CountAvailable");
                            return new WarehouseModel { Id = id, BookId = bookid, CountAvailable = countavailable };
                        }
                        else
                        {
                            throw new KeyNotFoundException("Book not found.");
                        }
                    }
                }
            }
        }

        public async Task UpdateBookAsync(int id, WarehouseModel warehouseModel)
        {
            using (var connection = new MySqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                var query = _sqlQueries["UpdateBookAsyncQuery"];

                using (var command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@id", id);
                    command.Parameters.AddWithValue("@bookid", warehouseModel.BookId);
                    command.Parameters.AddWithValue("@countavailable", warehouseModel.CountAvailable);
                    await command.ExecuteNonQueryAsync();
                }
            }
        }

        public async Task DeleteBookAsync(int id)
        {
            using (var connection = new MySqlConnection(_connectionString))
            {
                await connection.OpenAsync();
                var query = _sqlQueries["DeleteBookAsyncQuery"];

                using (var command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@id", id);
                    await command.ExecuteNonQueryAsync();
                }
            }
        }
    }
}

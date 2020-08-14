using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PhonebookBackend.Model;
using MySql.Data;
using MySql.Data.MySqlClient;
using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Utilities;

namespace PhonebookBackend.Data
{
    public class PhonebookContext : DbContext
    {
        public MySqlConnection connection { get; set; }

        public PhonebookContext (DbContextOptions<PhonebookContext> options)
            : base(options)
        {
            connection = new MySqlConnection("server=192.168.0.7;user=admin;password=********;database=Phonebook");
            connection.Open();

        }

        public DbSet<PhonebookBackend.Model.Entry> Entry { get; set; }

        public async Task<ActionResult<IEnumerable<Entry>>> GetEntries()
        {
            var sql = "SELECT * FROM Entries;";
            using var command = new MySqlCommand(sql, connection);
            using var reader = await command.ExecuteReaderAsync();
            Entry recipe;
            var list = new List<Entry>();
            while (await reader.ReadAsync())
            {
                recipe = new Entry();
                recipe.id = Int32.Parse(reader.GetValue(0).ToString());
                recipe.firstName = reader.GetValue(1).ToString();
                recipe.lastName = reader.GetValue(2).ToString();
                recipe.number = reader.GetValue(3).ToString();
                list.Add(recipe);
            }
            return list;
        }

        public async Task<ActionResult<PostEntry>> PostEntry( PostEntry entry)
        {
            var sql = "INSERT INTO Entries (`FirstName`, `LastName`, `Number`) VALUES(@firstName, @lastName, @number);";
            using var command = new MySqlCommand(sql, connection);

            command.Parameters.AddWithValue("@firstName", entry.firstName);
            command.Parameters.AddWithValue("@lastName", entry.lastName);
            command.Parameters.AddWithValue("@number", entry.number);
            command.Prepare();
            using var reader = await command.ExecuteReaderAsync();
            reader.Close();

            var result = new PostEntry();
            result.firstName = entry.firstName;
            result.lastName = entry.lastName;
            result.number = entry.number;
            return result;
        }

        public async Task<ActionResult<Entry>> PutEntry(Entry entry)
        {
            var sql = "UPDATE `Entries` SET `id` = @entryID, `firstName` = @firstName, `lastName` = @lastName ,`number` = @number WHERE `id` = @entryID; ";
            using var command = new MySqlCommand(sql, connection);

            command.Parameters.AddWithValue("@firstName", entry.firstName);
            command.Parameters.AddWithValue("@lastName", entry.lastName);
            command.Parameters.AddWithValue("@number", entry.number);
            command.Parameters.AddWithValue("@entryID", entry.id);
            command.Prepare();
            using var reader = await command.ExecuteReaderAsync();
            reader.Close();
            var result = new Entry();
            result.firstName = entry.firstName;
            result.lastName = entry.lastName;
            result.number = entry.number;
            return result;
        }
    }
}

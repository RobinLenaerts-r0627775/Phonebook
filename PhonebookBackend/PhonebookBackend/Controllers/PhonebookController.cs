using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PhonebookBackend.Data;
using PhonebookBackend.Model;

namespace PhonebookBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhonebookController : ControllerBase
    {
        private readonly PhonebookContext _context;

        public PhonebookController(PhonebookContext context)
        {
            _context = context;
        }

        // GET: api/Phonebook
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Entry>>> GetEntry()
        {
            return await _context.GetEntries();
        }

        // PUT: api/Phonebook
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut]
        public async Task<IActionResult> PutEntry([FromForm]Entry entry)
        {
            await _context.PutEntry(entry);

            return NoContent();
        }

        // POST: api/Phonebook
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<PostEntry>> PostEntry([FromForm]PostEntry entry)
        {
            return await _context.PostEntry(entry);
        }
    }
}

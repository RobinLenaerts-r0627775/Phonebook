using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PhonebookBackend.Model
{
    public class Entry
    {
        
        public int id { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string number { get; set; }
    }

    public class PostEntry
    {
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string number { get; set; }
    }
}

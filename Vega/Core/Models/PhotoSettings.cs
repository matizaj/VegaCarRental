using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Vega.Core.Models
{
    public class PhotoSettings
    {
        public int MaxBytes { get; set; }
        public string[] AcceptedFiles { get; set; }    
        public bool isSuppored(string fileName)
        {
            // AcceptedFiles.Any(s => s.Path.GetExtension(fileName).ToLowerCase());
            return true;
        }
    }
}

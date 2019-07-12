using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DICs_API.Models
{
    public class Process
    {
        public int Id { get; set; }
        [Required]
        public Department Department { get; set; }
        [Required]
        public string Name { get; set; }
        public byte Removed { get; set; }
    }

    public class ProcessUpload
    {
        public int Id { get; set; }
        [Required]
        public int IdDepartment { get; set; }
        [Required]
        public string Name { get; set; }
        public byte Removed { get; set; }
    }
    public class ProcessDics
    {
        public Process Process { get; set; }
        public List<DIC> Dics { get; set; }
    }

    public static class ProcessDicsExtensions
    {
        public static ProcessDics ToProccessDic(this IEnumerable<DIC> dics, Process process)
        {
            return new ProcessDics
            {
                Process = process,
                Dics = dics.ToList()
            };
        }
    }
}

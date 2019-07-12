using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DICs_API.Models
{
    public class Department
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public byte Removed { get; set; }
    }

    public class DepartmentDics
    {
        public Department Department { get; set; }
        public List<DIC> Dics { get; set; }
    }

    public static class DepartmentDicsExtensions
    {
        public static DepartmentDics ToDepartmentDics(this IEnumerable<DIC> dics, Department dep)
        {
            return new DepartmentDics
            {
                Department = dep,
                Dics = dics.ToList()
            };
        }
    }

}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DICs_API.Models
{
    public class DIC
    {
        public int Id { get; set; }
        [Required]
        public Users User { get; set; }
        [Required]
        public Status Status { get; set; }
        [Required]
        public Period Period { get; set; }
        [Required]
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime FinishedDate { get; set; }
        public byte IsLate { get; set; }
    }

    public class DICUpload
    {
        public int Id { get; set; }
        [Required]
        public int IdUser { get; set; }
        [Required]
        public int IdStatus { get; set; }
        [Required]
        public int IdPeriod { get; set; }
        [Required]
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime FinishedDate { get; set; }
        public byte IsLate { get; set; }
    }
}

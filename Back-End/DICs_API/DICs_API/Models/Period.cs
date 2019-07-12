using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DICs_API.Models
{
    public class Period
    {
        /// <summary>
        /// Id do período
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// Quantidade de meses
        /// </summary>
        [Required]
        public int Months { get; set; }
        /// <summary>
        /// Nome do período
        /// </summary>
        [Required]
        public string Name { get; set; }
        /// <summary>
        /// Se está inativo
        /// </summary>
        public byte Removed { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DICs_API.Models
{
    public class Configuration
    {
        /// <summary>
        /// Id da configuração
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// Id do período
        /// </summary>
        public Period Period { get; set; }
    }

    public class ConfigurationUpload
    {
        public int Id { get; set; }
        [Required]
        public int IdPeriod { get; set; }
    }
}

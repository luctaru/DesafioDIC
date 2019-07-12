using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DICs_API.Models
{
    public class DicHistory
    {   /// <summary>
        /// Id do Histórico do  Dic
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// Id do Dic referente
        /// </summary>
        public int IdDic { get; set; }
        /// <summary>
        /// Status do Dic
        /// </summary>
        public Status StatusDic { get; set; }
        /// <summary>
        /// observação sobre alteração
        /// </summary>
        public string Note { get; set; }
        /// <summary>
        /// Data da alteração
        /// </summary>
        public DateTime Date { get; set; }
        /// <summary>
        /// tipo de alteração
        /// </summary>
        public string Type { get; set; }
    }
    public class DicHistoryUpload
    {
        public int Id { get; set; }
        [Required]
        public int  IdDic { get; set; }
        [Required]
        public int IdStatus { get; set; }
        public string Note { get; set; }
        public DateTime Date { get; set; }
        [Required]
        public string Type { get; set; }
    }
    public class DicHistoryConfig
    {
        public DIC Dic { get; set; }
        public List<DicHistory> History { get; set; }
    }
    public static class DicHistoryConfigExtensions
    {
        public static DicHistoryConfig ToDicHistoryConfig( this IEnumerable<DicHistory> history, DIC dic)
        {
            return new DicHistoryConfig
            {
                Dic = dic,
                History = history.ToList()
            };
        }
    }
}

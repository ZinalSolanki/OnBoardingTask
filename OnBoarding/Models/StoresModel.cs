using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;

using System.Web;

namespace OnBoarding.Models
{
    public class StoresModel
    {
        public int StoreId { get; set; }
        [Required(ErrorMessage = "Store name is required")]
        [StringLength(50, MinimumLength = 3)]
        public string Name { get; set; }
        [StringLength(200)]
        public string Address { get; set; }
    }
}
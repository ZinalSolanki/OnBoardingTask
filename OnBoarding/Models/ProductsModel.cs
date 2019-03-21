using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.Web;

namespace OnBoarding.Models
{
    public class ProductsModel
    {
        public int ProductId { get; set; }
        [Required(ErrorMessage = "Product name is required")]
        [StringLength(50, MinimumLength = 3)]
        public string Name { get; set; }
        public int Price { get; set; }
    }
}
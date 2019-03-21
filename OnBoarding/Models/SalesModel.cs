using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.Web;

namespace OnBoarding.Models
{
    public class SalesModel
    {
        [Key]
        public int SalesId { get; set; }

        [Required(ErrorMessage ="Product id is required")]
        public int ProductId { get; set; }

        [Required(ErrorMessage ="Customer id is required")]
        public int CustomerId { get; set; }

        [Required(ErrorMessage ="Store id is reqquired")]
        public int StoreId { get; set; }

        [Required(ErrorMessage = "Sale date is required")]
        [DataType(DataType.Date), DisplayFormat(DataFormatString = "{0:MM/dd/yyyy}", ApplyFormatInEditMode = true)]
        public DateTime DateSold { get; set; }

        public Customer Customer { get; set; }
        public Product product { get; set; }
        public Store store { get; set; }

    }
}
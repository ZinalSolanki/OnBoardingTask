using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OnBoarding.Controllers
{
    public class SalesController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult GetSalesDetails()
        {
            StoreDatabaseEntities db = new StoreDatabaseEntities();
            var salesList = db.Sales.Select(s => new
            {
                Id = s.SalesId,
                CustomerName = s.Customer.Name,
                ProductName = s.Product.Name,
                StoreName = s.Store.Name,
                DateSold = s.DateSold
            }).ToList();
            return new JsonResult { Data = salesList, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public JsonResult GetCustomers()
        {
            StoreDatabaseEntities db = new StoreDatabaseEntities();
            var customerData = db.Customers.Select(c => new { Id = c.CustomerId, CustomerName = c.Name }).ToList();
            return new JsonResult { Data = customerData, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public JsonResult GetProducts()
        {
            StoreDatabaseEntities db = new StoreDatabaseEntities();
            var productData = db.Products.Select(p => new { Id = p.ProductId, ProductName = p.Name }).ToList();
            return new JsonResult { Data = productData, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public JsonResult GetStores()
        {
            StoreDatabaseEntities db = new StoreDatabaseEntities();
            var storeData = db.Stores.Select(s => new { Id = s.StoreId, StoreName = s.Name }).ToList();
            return new JsonResult { Data = storeData, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public JsonResult DeleteSale(int id)
        {
            StoreDatabaseEntities db = new StoreDatabaseEntities();
            var sale = db.Sales.Where(s => s.SalesId == id).SingleOrDefault();
            if (sale != null)
            {
                db.Sales.Remove(sale);
                db.SaveChanges();
            }
            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public JsonResult CreateSale(Sale sale)
        {
            StoreDatabaseEntities db = new StoreDatabaseEntities();
            db.Sales.Add(sale);
            db.SaveChanges();
            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public JsonResult GetEdit(int id)
        {
            StoreDatabaseEntities db = new StoreDatabaseEntities();
            Sale sale = db.Sales.Where(x => x.SalesId == id).SingleOrDefault();
            string val = JsonConvert.SerializeObject(sale, Formatting.Indented, new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            });
            return new JsonResult { Data = val, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public JsonResult Edit(Sale s)
        {
            try
            {
                StoreDatabaseEntities db = new StoreDatabaseEntities();
                Sale sale = db.Sales.Where(x => x.SalesId == s.SalesId).SingleOrDefault();

                sale.CustomerId = s.CustomerId;
                sale.ProductId = s.ProductId;
                sale.StoreId = s.StoreId;
                sale.DateSold = s.DateSold;

                db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception");
                return new JsonResult { Data = "Sale update failed", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
            }
            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
    }
}
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OnBoarding.Controllers
{
    public class ProductsController : Controller
    {

        // GET: Products
        public ActionResult Index()
        {
            return View();
        }

        //Display Product
        [HttpGet]
        public JsonResult GetProductsDetails()
        {
            StoreDatabaseEntities db = new StoreDatabaseEntities();
            db.Configuration.ProxyCreationEnabled = false;
            var productList = db.Products.ToList();
            return new JsonResult { Data = productList, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        //Create Product
        public JsonResult CreateProduct(Product product)
        {

            StoreDatabaseEntities db = new StoreDatabaseEntities();
            db.Products.Add(product);
            db.SaveChanges();
            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        //delete
        public JsonResult DeleteProduct(int id)
        {

            StoreDatabaseEntities db = new StoreDatabaseEntities();
            var product = db.Products.Where(x => x.ProductId == id).SingleOrDefault();
            if (product != null)
            {
                db.Products.Remove(product);
                db.SaveChanges();
            }
            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }

        public JsonResult GetEdit(int id)
        {
            StoreDatabaseEntities db = new StoreDatabaseEntities();
            Product product = db.Products.Where(x => x.ProductId == id).SingleOrDefault();
            string val = JsonConvert.SerializeObject(product, Formatting.Indented, new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            });
            return new JsonResult { Data = val, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public JsonResult Edit(Product p)
        {
            StoreDatabaseEntities db = new StoreDatabaseEntities();
            var product = db.Products.Where(x => x.ProductId == p.ProductId).SingleOrDefault();
            product.Name = p.Name;
            product.Price = p.Price;
            db.SaveChanges();
            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
    }
}
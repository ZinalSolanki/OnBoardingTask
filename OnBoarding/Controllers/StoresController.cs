using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OnBoarding.Controllers
{
    public class StoresController : Controller
    {
        StoreDatabaseEntities db = new StoreDatabaseEntities();
        // GET: Stores
        public ActionResult Index()
        {
            return View();
        }

        //Display Store
        [HttpGet]
        public JsonResult GetStoresDetails()
        {
            db.Configuration.ProxyCreationEnabled = false;
            var storeList = db.Stores.ToList();
            return new JsonResult { Data = storeList, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        //Create Store
        public JsonResult CreateStore(Store store)
        {
            db.Configuration.ProxyCreationEnabled = false;
            db.Stores.Add(store);
            db.SaveChanges();
            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        //Delete Store
        public JsonResult DeleteStore(int id)
        {
            StoreDatabaseEntities db = new StoreDatabaseEntities();
            var store = db.Stores.Where(x => x.StoreId == id).SingleOrDefault();
            if (store != null)
            {
                db.Stores.Remove(store);
                db.SaveChanges();
            }
            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public JsonResult GetEdit(int id)
        {
            StoreDatabaseEntities db = new StoreDatabaseEntities();
            var store = db.Stores.Where(x => x.StoreId == id).SingleOrDefault();
            string value = JsonConvert.SerializeObject(store, Formatting.Indented, new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            });
            return new JsonResult { Data = value, JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        public JsonResult Edit(Store s)
        {
            StoreDatabaseEntities db = new StoreDatabaseEntities();
            var store = db.Stores.Where(x => x.StoreId == s.StoreId).SingleOrDefault();
            store.Name = s.Name;
            store.Address = s.Address;
            db.SaveChanges();
            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
    }
}
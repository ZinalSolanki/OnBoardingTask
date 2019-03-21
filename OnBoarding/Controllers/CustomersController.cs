using Newtonsoft.Json;
using System.Linq;
using System.Web.Mvc;

namespace OnBoarding.Controllers
{
    public class CustomersController : Controller
    {
        // GET: Customers
        public ActionResult Index()
        {
            return View();
        }

        //Display Customer
        public JsonResult GetCustomersData()
        {
            StoreDatabaseEntities db = new StoreDatabaseEntities();
            db.Configuration.ProxyCreationEnabled = false;
            var customerList = db.Customers.ToList();
            return new JsonResult { Data = customerList, JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }

        //Create Customer
        public JsonResult CreateCustomer(Customer customer)
        {

            StoreDatabaseEntities db = new StoreDatabaseEntities();
            db.Customers.Add(customer);
            db.SaveChanges();
            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }

        //delete
        public JsonResult DeleteCustomer(int id)
        {

            StoreDatabaseEntities db = new StoreDatabaseEntities();
            var customer = db.Customers.Where(x => x.CustomerId == id).SingleOrDefault();
            if (customer != null)
            {
                db.Customers.Remove(customer);
                db.SaveChanges();
            }
            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };

        }

        public JsonResult GetEdit(int id)
        {
            StoreDatabaseEntities db = new StoreDatabaseEntities();
            Customer customer = db.Customers.Where(x => x.CustomerId == id).SingleOrDefault();
            string val = JsonConvert.SerializeObject(customer, Formatting.Indented, new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore
            });
            return Json(val, JsonRequestBehavior.AllowGet);
        }


        public JsonResult Edit(Customer c)
        {
            StoreDatabaseEntities db = new StoreDatabaseEntities();
            Customer cust = db.Customers.Where(x => x.CustomerId == c.CustomerId).SingleOrDefault();

            cust.Name = c.Name;
            cust.Address = c.Address;
            db.SaveChanges();
            return new JsonResult { Data = "Success", JsonRequestBehavior = JsonRequestBehavior.AllowGet };
        }
    }
}
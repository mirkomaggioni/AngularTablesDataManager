using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.ModelBinding;
using System.Web.Http.OData;
using System.Web.Http.OData.Routing;
using AngularTablesDataManager.DataLayer;

namespace AngularTablesDataManager.Controller
{
    public class ZipsController : ODataController
    {
        private Context db = new Context();

        // GET: odata/Zips
        [EnableQuery]
        public IQueryable<Zip> GetZips()
        {
            return db.Zips;
        }

        // GET: odata/Zips(5)
        [EnableQuery]
        public SingleResult<Zip> GetZip([FromODataUri] Guid key)
        {
            return SingleResult.Create(db.Zips.Where(zip => zip.Id == key));
        }

        // PUT: odata/Zips(5)
        public async Task<IHttpActionResult> Put([FromODataUri] Guid key, Delta<Zip> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Zip zip = await db.Zips.FindAsync(key);
            if (zip == null)
            {
                return NotFound();
            }

            patch.Put(zip);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ZipExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(zip);
        }

        // POST: odata/Zips
        public async Task<IHttpActionResult> Post(Zip zip)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            zip.Id = Guid.NewGuid();
            db.Zips.Add(zip);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (ZipExists(zip.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Created(zip);
        }

        // PATCH: odata/Zips(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public async Task<IHttpActionResult> Patch([FromODataUri] Guid key, Delta<Zip> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Zip zip = await db.Zips.FindAsync(key);
            if (zip == null)
            {
                return NotFound();
            }

            patch.Patch(zip);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ZipExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(zip);
        }

        // DELETE: odata/Zips(5)
        public async Task<IHttpActionResult> Delete([FromODataUri] Guid key)
        {
            Zip zip = await db.Zips.FindAsync(key);
            if (zip == null)
            {
                return NotFound();
            }

            db.Zips.Remove(zip);
            await db.SaveChangesAsync();

            return StatusCode(HttpStatusCode.NoContent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ZipExists(Guid key)
        {
            return db.Zips.Count(e => e.Id == key) > 0;
        }
    }
}

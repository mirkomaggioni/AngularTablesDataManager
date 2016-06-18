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
    public class FieldConfigurationsController : ODataController
    {
        private Context db = new Context();

        // GET: odata/FieldConfigurations
        [EnableQuery]
        public IQueryable<FieldConfiguration> GetFieldConfigurations()
        {
            return db.FieldConfigurations;
        }

        // GET: odata/FieldConfigurations(5)
        [EnableQuery]
        public SingleResult<FieldConfiguration> GetFieldConfiguration([FromODataUri] Guid key)
        {
            return SingleResult.Create(db.FieldConfigurations.Where(fieldConfiguration => fieldConfiguration.Id == key));
        }

        // PUT: odata/FieldConfigurations(5)
        public async Task<IHttpActionResult> Put([FromODataUri] Guid key, Delta<FieldConfiguration> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            FieldConfiguration fieldConfiguration = await db.FieldConfigurations.FindAsync(key);
            if (fieldConfiguration == null)
            {
                return NotFound();
            }

            patch.Put(fieldConfiguration);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FieldConfigurationExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(fieldConfiguration);
        }

        // POST: odata/FieldConfigurations
        public async Task<IHttpActionResult> Post(FieldConfiguration fieldConfiguration)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            fieldConfiguration.Id = Guid.NewGuid();
            db.FieldConfigurations.Add(fieldConfiguration);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (FieldConfigurationExists(fieldConfiguration.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return Created(fieldConfiguration);
        }

        // PATCH: odata/FieldConfigurations(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public async Task<IHttpActionResult> Patch([FromODataUri] Guid key, Delta<FieldConfiguration> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            FieldConfiguration fieldConfiguration = await db.FieldConfigurations.FindAsync(key);
            if (fieldConfiguration == null)
            {
                return NotFound();
            }

            patch.Patch(fieldConfiguration);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FieldConfigurationExists(key))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Updated(fieldConfiguration);
        }

        // DELETE: odata/FieldConfigurations(5)
        public async Task<IHttpActionResult> Delete([FromODataUri] Guid key)
        {
            FieldConfiguration fieldConfiguration = await db.FieldConfigurations.FindAsync(key);
            if (fieldConfiguration == null)
            {
                return NotFound();
            }

            db.FieldConfigurations.Remove(fieldConfiguration);
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

        private bool FieldConfigurationExists(Guid key)
        {
            return db.FieldConfigurations.Count(e => e.Id == key) > 0;
        }
    }
}

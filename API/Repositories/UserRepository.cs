using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Models;

namespace API.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly IDataContext _context;
        public UserRepository(IDataContext context)
        {
            _context = context;
        }
        public async Task Add(AppUser user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(long id)
        {
            var itemToRemove = await _context.Users.FindAsync(id);
            if (itemToRemove == null)
                throw new NullReferenceException();

            _context.Users.Remove(itemToRemove);
            await _context.SaveChangesAsync();
        }

        public async Task<AppUser> Get(long id)
        {
            return await _context.Users.FindAsync(id);
        }
        public async Task<IEnumerable<AppUser>> GetAll()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task Update(AppUser user)
        {
            var itemToUpdate = await _context.Users.FindAsync(user.Id);
            if (itemToUpdate == null)
                throw new NullReferenceException();
            if (user.UserName != null) itemToUpdate.UserName = user.UserName;
            if (user.PasswordHash != null) itemToUpdate.PasswordHash = user.PasswordHash;
            if (user.PasswordSalt != null) itemToUpdate.PasswordSalt = user.PasswordSalt;
            await _context.SaveChangesAsync();
        }
    }
}

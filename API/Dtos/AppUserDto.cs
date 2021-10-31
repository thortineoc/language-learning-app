using System.Collections.Generic;

namespace API.Dtos
{
    public class AppUserDto
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public string Token { get; set; }

        public IList<string> Role { get; set; }
    }
}
using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class UpdateUserDto
    {
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; } 
        public byte[] PasswordSalt { get; set; } 
        public string Email { get; set; }
        public string Role { get; set; }
    }
}
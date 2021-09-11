using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class CreateUserDto
    {
        [Required]
        public long UserId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Surname { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string PasswordHash { get; set; } 
        public string PasswordSalt { get; set; } 

        public string Role { get; set; } = "user"; 
    }
}
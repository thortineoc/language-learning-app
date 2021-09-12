namespace API.Models
{
    public class AppUser
    {
        public long Id { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public byte[] PasswordHash { get; set; }

        public byte[] PasswordSalt { get; set; }
        
        public string Role { get; set; }
    }
}
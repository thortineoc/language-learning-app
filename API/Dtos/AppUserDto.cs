namespace API.Dtos
{
    public class AppUserDto
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public string Email { get; set; }

        public string Token { get; set; }

        public string Role { get; set; } = "user";
    }
}
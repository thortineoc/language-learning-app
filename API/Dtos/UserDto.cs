namespace API.Dtos
{
    public class UserDto
    {
        public long Id { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public string Role { get; set; } = "user";
    }
}